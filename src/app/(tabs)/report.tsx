import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type ImageStyle
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../../constants';
import { useCreateReport, useUploadReportImage } from '../../hooks/useReportQueries';
import { useAuthStore } from '../../stores/authStore';
// 
import * as ImageManipulator from 'expo-image-manipulator';
import Toast from 'react-native-toast-message';
const { height } = Dimensions.get('window');

const WASTE_TYPE_KEYS = ['plastic', 'paper', 'glass', 'organic', 'metal'] as const;

const PHOTO_HEIGHT = height * 0.42;
const SHEET_TOP = height * 0.34;
const MAX_DRAG = 100;
const SPRING_CONFIG = { damping: 18, stiffness: 220, mass: 0.8 };

// Retake button sits at the bottom-right of the visible photo (just above where the sheet starts)
const RETAKE_BTN_TOP = SHEET_TOP - 44;

export default function ReportScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    imageUri?: string;
    latitude?: string;
    longitude?: string;
    address?: string;
    source?: string;
    locationSource?: string;
  }>();
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

  // ── API mutations ──
  const createReportMutation = useCreateReport();
  const uploadImageMutation = useUploadReportImage();
  const isSubmitting = createReportMutation.isPending || uploadImageMutation.isPending;

  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [severityValue, setSeverityValue] = useState(0.6); // 0 to 1
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<Set<string>>(new Set(['plastic']));

  // ── Location state ──
  const [locationAddress, setLocationAddress] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLng, setLocationLng] = useState('');
  const [locationCustom, setLocationCustom] = useState(false);

  // ─── Animation shared values ───
  const sheetTranslateY = useSharedValue(0);
  const startY = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Sync image from params
  useEffect(() => {
    if (params.imageUri) {
      setImage(params.imageUri);
    }
  }, [params.imageUri]);

  // Sync location from params
  useEffect(() => {
    if (params.address) setLocationAddress(params.address);
    if (params.latitude) setLocationLat(params.latitude);
    if (params.longitude) setLocationLng(params.longitude);
    if (params.locationSource === 'custom') setLocationCustom(true);
    // console.log('Location params:', params.latitude, params.longitude, params.address, params.locationSource);
  }, [params.address, params.latitude, params.longitude, params.locationSource]);

  // ─── Track keyboard visibility ───
  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert(t('report.cameraPermissionRequired'));
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      router.setParams({ imageUri: result.assets[0].uri });
    }
  };

  const toggleWasteType = (type: string) => {
    setSelectedWasteTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        if (next.size > 1) next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
    console.log('Selected waste types:', Array.from(selectedWasteTypes));
  };

  const getSeverityLabel = (val: number): string => {
    if (val < 0.2) return t('severity.minor');
    if (val < 0.4) return t('severity.light');
    if (val < 0.6) return t('severity.moderate');
    if (val < 0.8) return t('severity.heavy');
    return t('severity.extreme');
  };

  // Map slider value (0-1) to API severity string
  const getSeverityApiValue = (val: number): string => {
    if (val < 0.25) return 'low';
    if (val < 0.5) return 'medium';
    if (val < 0.75) return 'high';
    return 'critical';
  };

  const handleSubmit = async () => {
    if (!image) {
      alert(t('report.takePhotoFirst'));
      return;
    }

    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        image,
        [],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      if (!manipulatedImage.uri) {
        throw new Error('Image processing failed: URI is empty');
      }

      // 2. Lấy đúng extension & MIME type từ URI đã được manipulate
      //    URI từ ImageManipulator luôn kết thúc bằng .jpg khi dùng SaveFormat.JPEG
      const uriParts = manipulatedImage.uri.split('.');
      const fileExt = uriParts[uriParts.length - 1]?.toLowerCase() || 'jpg';
      const mimeType = fileExt === 'jpg' || fileExt === 'jpeg' ? 'image/jpeg'
        : fileExt === 'png' ? 'image/png'
          : 'image/jpeg'; // fallback

      // 3. Tạo FormData — build một lần duy nhất ở đây, truyền thẳng xuống service
      const formData = new FormData();

      const wasteTypesStr = Array.from(selectedWasteTypes).join(', ');
      const severityApi = getSeverityApiValue(severityValue);
      const locationName = locationAddress || `${locationLat}, ${locationLng}`;

      formData.append('reporter_id', user?.id || '');
      formData.append('title', locationName);
      if (description) formData.append('description', description);
      formData.append('location', locationName);
      if (locationAddress) formData.append('address', locationAddress);
      formData.append('latitude', String(locationLat ? parseFloat(locationLat) : 0));
      formData.append('longitude', String(locationLng ? parseFloat(locationLng) : 0));
      formData.append('severity', severityApi);
      formData.append('status', 'pending');
      formData.append('waste_type', wasteTypesStr);

      // 4. Append file ảnh — giữ nguyên object {uri, name, type}, không dùng String()
      formData.append('report_img', {
        uri: manipulatedImage.uri,
        name: `report_${Date.now()}.${fileExt}`,
        type: mimeType,
      } as any);

      if (__DEV__) {
        console.log('[handleSubmit] FormData parts:');
        for (const [key, val] of (formData as any)._parts) {
          console.log(`  ${key}:`, typeof val === 'object' ? JSON.stringify(val) : val);
        }
      }

      // 5. Gửi request
      const report = await createReportMutation.mutateAsync(formData);

      // 6. Reset form
      setImage(null);
      setDescription('');
      setSeverityValue(0.6);
      setSelectedWasteTypes(new Set(['plastic']));

      // 7. Điều hướng tới màn hình thành công
      router.replace({
        pathname: '/report-success',
        params: {
          reportId: report?.id || '',
          latitude: locationLat,
          longitude: locationLng,
        },
      } as any);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: error?.response?.data?.detail || error?.message || 'Failed to submit report. Please try again.',
      });
    }
  };

  // Navigate to pick-location to change/set location
  const handleChangeLocation = () => {
    router.push({
      pathname: '/pick-location',
      params: {
        initialLat: locationLat || '',
        initialLng: locationLng || '',
        returnTo: 'report',
        imageUri: image || '',
      },
    } as any);
  };

  // ─── Pan Gesture (attached to drag handle only) ───
  const pan = Gesture.Pan()
    .onStart(() => {
      startY.value = sheetTranslateY.value;
    })
    .onUpdate((e) => {
      // Only allow downward drag (positive translationY), clamp to max
      sheetTranslateY.value = clamp(startY.value + e.translationY, 0, MAX_DRAG);
    })
    .onEnd(() => {
      sheetTranslateY.value = withSpring(0, SPRING_CONFIG);
    });

  // ─── Animated Styles ───
  const animatedPhotoStyle = useAnimatedStyle(() => {
    const s = interpolate(sheetTranslateY.value, [0, MAX_DRAG], [1, 1.12]);
    return {
      transform: [{ scale: s }],
    };
  });

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetTranslateY.value }],
  }));

  // Parse location display
  const addressParts = locationAddress ? locationAddress.split(', ') : [];
  const addressLine1 = addressParts.length > 0 ? addressParts[0] : '';
  const addressLine2 = addressParts.length > 1 ? addressParts.slice(1).join(', ') : '';
  const hasLocation = !!(locationLat && locationLng);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* ─── Top Half: Photo Preview (animated scale) ─── */}
      <View style={styles.photoSection}>
        {image ? (
          <Animated.View style={[styles.capturedPhotoContainer, animatedPhotoStyle]}>
            <Image source={{ uri: image }} style={styles.capturedPhoto as ImageStyle} resizeMode="cover" />
          </Animated.View>
        ) : (
          <View style={styles.placeholderContainer}>
            <TouchableOpacity style={styles.placeholderBtn} onPress={takePhoto} activeOpacity={0.7}>
              <Ionicons name="camera" size={48} color="#94A3B8" />
              <Text style={styles.placeholderText}>{t('report.tapToOpenCamera')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* ─── Retake Button (fixed position, outside animated photo) ─── */}
      {image && (
        <TouchableOpacity style={styles.retakeBtn} onPress={takePhoto} activeOpacity={0.8}>
          <Ionicons name="refresh" size={12} color="#20693A" />
          <Text style={styles.retakeBtnText}>{t('report.retake')}</Text>
        </TouchableOpacity>
      )}

      {/* ─── Header (Floating on top of image) ─── */}
      <SafeAreaView style={styles.headerSafeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('report.reviewTitle')}</Text>
          <View style={styles.headerPlaceholder} />
        </View>
      </SafeAreaView>

      {/* ─── Bottom Half: Floating Details Sheet (animated translate) ─── */}
      <Animated.View style={[styles.sheetContainer, animatedSheetStyle]}>
        {/* Drag Handle — gesture target */}
        <GestureDetector gesture={pan}>
          <Animated.View style={styles.dragHandleRow}>
            <View style={styles.dragHandle} />
          </Animated.View>
        </GestureDetector>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? SHEET_TOP + 28 : SHEET_TOP}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
          >
            {/* ─── Location Section (Tappable) ─── */}
            <TouchableOpacity
              style={styles.locationCard}
              onPress={handleChangeLocation}
              activeOpacity={0.7}
            >
              <View style={styles.locationIconWrap}>
                <Ionicons name="location" size={20} color="#20693A" />
              </View>
              <View style={styles.locationContent}>
                <View style={styles.locationLabelRow}>
                  <Text style={styles.locationLabel}>{t('report.detectedLocation')}</Text>
                  {locationCustom && (
                    <View style={styles.customBadge}>
                      <Text style={styles.customBadgeText}>{t('report.customLocation')}</Text>
                    </View>
                  )}
                </View>
                {hasLocation ? (
                  <>
                    <Text style={styles.locationTitle} numberOfLines={1}>
                      {addressLine1 || `${parseFloat(locationLat).toFixed(4)}, ${parseFloat(locationLng).toFixed(4)}`}
                    </Text>
                    {addressLine2 ? (
                      <Text style={styles.locationSubtitle} numberOfLines={1}>{addressLine2}</Text>
                    ) : null}
                  </>
                ) : (
                  <Text style={styles.locationPlaceholder}>{t('report.tapToSetLocation')}</Text>
                )}
              </View>
              <View style={styles.locationChevron}>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </TouchableOpacity>

            {/* ─── Severity Slider Section ─── */}
            <View style={styles.section}>
              <View style={styles.severityHeaderRow}>
                <Text style={styles.sectionLabel}>{t('report.severityScale')}</Text>
                <View style={styles.severityBadge}>
                  <Text style={styles.severityBadgeText}>{getSeverityLabel(severityValue)}</Text>
                </View>
              </View>

              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={severityValue}
                  onValueChange={setSeverityValue}
                  minimumTrackTintColor="#20693A"
                  maximumTrackTintColor="rgba(32, 105, 58, 0.2)"
                  thumbTintColor="#20693A"
                />
              </View>

              <View style={styles.sliderLabelsRow}>
                <Text style={styles.sliderLabel}>{t('report.sliderMinor')}</Text>
                <Text style={styles.sliderLabel}>{t('report.sliderExtreme')}</Text>
              </View>
            </View>

            {/* ─── Waste Types ─── */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>{t('report.wasteTypes')}</Text>
              <View style={styles.wasteChipsRow}>
                {WASTE_TYPE_KEYS.map((typeKey) => {
                  const isSelected = selectedWasteTypes.has(typeKey);
                  return (
                    <TouchableOpacity
                      key={typeKey}
                      style={[styles.wasteChip, isSelected && styles.wasteChipSelected]}
                      onPress={() => toggleWasteType(typeKey)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.wasteChipText, isSelected && styles.wasteChipTextSelected]}>
                        {t(`report.${typeKey}` as any)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* ─── Additional Notes ─── */}
            <View style={styles.sectionLast}>
              <Text style={styles.sectionLabel}>{t('report.additionalNotes')}</Text>
              <View style={styles.textAreaWrapper}>
                <TextInput
                  style={styles.textArea}
                  placeholder={t('report.notesPlaceholder')}
                  placeholderTextColor="#6B7280"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollToEnd({ animated: true });
                    }, 300);
                  }}
                />
              </View>
            </View>
          </ScrollView>

          {/* ─── Fixed Bottom Submit Button ─── */}
          <View style={[
            styles.submitBarContainer,
            keyboardVisible && styles.submitBarCompact,
          ]}>
            <TouchableOpacity
              style={[styles.submitBtn, (!image || isSubmitting) && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              activeOpacity={0.8}
              disabled={!image || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Ionicons name="cloud-upload-outline" size={18} color="#FFFFFF" />
              )}
              <Text style={styles.submitBtnText}>
                {isSubmitting ? t('common.loading') : t('report.submitReport')}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8F7',
  },

  // ─── Photo Section ───
  photoSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: PHOTO_HEIGHT,
    backgroundColor: 'rgba(32, 105, 58, 0.1)',
    overflow: 'hidden',
  },
  capturedPhotoContainer: {
    width: '100%',
    height: '100%',
  },
  capturedPhoto: {
    width: '100%',
    height: '100%',
  },

  // ─── Retake Button (fixed position, bottom-right of photo thumbnail) ───
  retakeBtn: {
    position: 'absolute',
    top: RETAKE_BTN_TOP,
    right: 20,
    zIndex: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  retakeBtnText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    color: '#20693A',
  },

  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  placeholderBtn: {
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: Fonts.medium,
    marginTop: 8,
    fontSize: 14,
    color: '#94A3B8',
  },

  // ─── Header ───
  headerSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    lineHeight: 28,
    color: '#FFFFFF',
  },
  headerPlaceholder: {
    width: 40,
    height: 40,
  },

  // ─── Bottom Sheet ───
  sheetContainer: {
    position: 'absolute',
    top: SHEET_TOP,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 20,
    overflow: 'hidden',
  },
  dragHandleRow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  dragHandle: {
    width: 48,
    height: 5,
    borderRadius: 9999,
    backgroundColor: '#D1D5DB',
  },

  // ─── Scroll Content ───
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // ─── Sections ───
  section: {
    marginBottom: 24,
  },
  sectionLast: {
    marginBottom: 8,
  },

  // ─── Location Card (Tappable) ───
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAF9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E8F0EC',
    gap: 12,
  },
  locationIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(32, 105, 58, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationContent: {
    flex: 1,
  },
  locationLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  locationLabel: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    color: '#2D5A3D',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  customBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  customBadgeText: {
    fontFamily: Fonts.semiBold,
    fontSize: 9,
    color: '#3B82F6',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  locationTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: '#1E293B',
  },
  locationSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: '#64748B',
    marginTop: 1,
  },
  locationPlaceholder: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: '#94A3B8',
  },
  locationChevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ─── Severity ───
  severityHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
  },
  severityBadge: {
    backgroundColor: 'rgba(32, 105, 58, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityBadgeText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#20693A',
  },
  sliderContainer: {
    height: 24,
    justifyContent: 'center',
    marginBottom: 12,
  },
  slider: {
    width: '100%',
    height: 24,
  },
  sliderLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    lineHeight: 15,
    color: '#94A3B8',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // ─── Waste Types ───
  wasteChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  wasteChip: {
    backgroundColor: 'rgba(45, 90, 61, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(45, 90, 61, 0.2)',
    borderRadius: 9999,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  wasteChipSelected: {
    backgroundColor: '#2D5A3D',
    borderColor: '#2D5A3D',
  },
  wasteChipText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#2D5A3D',
  },
  wasteChipTextSelected: {
    color: '#FFFFFF',
  },

  // ─── Text Area ───
  textAreaWrapper: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 24,
    overflow: 'hidden',
  },
  textArea: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
    paddingHorizontal: 17,
    paddingTop: 13,
    paddingBottom: 53,
    minHeight: 86,
  },

  // ─── Submit Bar ───
  submitBarContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },
  submitBarCompact: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  submitBtn: {
    backgroundColor: '#2D5A3D',
    borderRadius: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  submitBtnDisabled: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
