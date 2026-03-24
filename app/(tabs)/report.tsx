import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  type ImageStyle,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, Spacing, BorderRadius } from '../../constants';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Slider from '@react-native-community/slider';
import { useTranslation } from 'react-i18next';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  clamp,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const WASTE_TYPE_KEYS = ['plastic', 'paper', 'glass', 'organic', 'metal'] as const;

const PHOTO_HEIGHT = height * 0.42;
const SHEET_TOP = height * 0.34;
const MAX_DRAG = 100;
const SPRING_CONFIG = { damping: 18, stiffness: 220, mass: 0.8 };

// Retake button sits at the bottom-right of the visible photo (just above where the sheet starts)
const RETAKE_BTN_TOP = SHEET_TOP - 44;

export default function ReportScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ imageUri?: string }>();
  const { t } = useTranslation();

  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [severityValue, setSeverityValue] = useState(0.6); // 0 to 1
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<Set<string>>(new Set(['plastic']));

  // ─── Animation shared values ───
  const sheetTranslateY = useSharedValue(0);
  const startY = useSharedValue(0);

  useEffect(() => {
    if (params.imageUri) {
      setImage(params.imageUri);
    }
  }, [params.imageUri]);

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
  };

  const getSeverityLabel = (val: number): string => {
    if (val < 0.2) return t('severity.minor');
    if (val < 0.4) return t('severity.light');
    if (val < 0.6) return t('severity.moderate');
    if (val < 0.8) return t('severity.heavy');
    return t('severity.extreme');
  };

  const handleSubmit = () => {
    if (!image) {
      alert(t('report.takePhotoFirst'));
      return;
    }

    // Clear the form
    setImage(null);
    setDescription('');
    setSeverityValue(0.6);
    setSelectedWasteTypes(new Set(['plastic']));

    // Navigate to Success Screen
    router.replace('/report-success');
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
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* ─── Location Section ─── */}
            <View style={styles.section}>
              <View style={styles.locationLabelRow}>
                <Ionicons name="location" size={15} color="#20693A" />
                <Text style={styles.locationLabel}>{t('report.detectedLocation')}</Text>
              </View>
              <Text style={styles.locationTitle}>123 Nguyen Hue Street</Text>
              <Text style={styles.locationSubtitle}>Ho Chi Minh City, Vietnam</Text>
            </View>

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
                        {t(`report.${typeKey}`)}
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
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* ─── Fixed Bottom Submit Button ─── */}
        <View style={styles.submitBarContainer}>
          <TouchableOpacity
            style={[styles.submitBtn, !image && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            activeOpacity={0.8}
            disabled={!image}
          >
            <Ionicons name="cloud-upload-outline" size={18} color="#FFFFFF" />
            <Text style={styles.submitBtnText}>{t('report.submitReport')}</Text>
          </TouchableOpacity>
        </View>
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
    ...Platform.select({
      ios: {},
      android: {},
    }),
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
    height: height - SHEET_TOP,
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
    paddingBottom: 24,
  },

  // ─── Sections ───
  section: {
    marginBottom: 24,
  },
  sectionLast: {
    marginBottom: 8,
  },

  // ─── Location ───
  locationLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  locationLabel: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: '#2D5A3D',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  locationTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    lineHeight: 28,
    color: '#1E293B',
  },
  locationSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
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
