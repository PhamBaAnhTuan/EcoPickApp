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
  Dimensions
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, Spacing } from '../../constants';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

const WASTE_TYPES = ['Plastic', 'Paper', 'Glass', 'Organic', 'Metal'];

export default function ReportScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ imageUri?: string }>();
  
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [severityValue, setSeverityValue] = useState(0.2); // 0 to 1
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<Set<string>>(new Set(['Plastic']));

  useEffect(() => {
    if (params.imageUri) {
      setImage(params.imageUri);
    }
  }, [params.imageUri]);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Camera permissions are required');
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
    setSelectedWasteTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const getSeverityLabel = (val: number) => {
    if (val < 0.25) return 'Light';
    if (val < 0.5) return 'Medium';
    if (val < 0.75) return 'Heavy';
    return 'Extreme';
  };

  const handleSubmit = () => {
    if (!image) {
      alert('Please take a photo first!');
      return;
    }
    
    // Clear the form
    setImage(null);
    setDescription('');
    setSeverityValue(0.2);
    setSelectedWasteTypes(new Set());
    
    // Navigate to Success Screen
    router.replace('/report-success');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* 1. Full-Width Background Image (matching Design 2017:6) */}
      <View style={styles.imageBackgroundContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.backgroundImage} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderBg}>
            <TouchableOpacity style={styles.placeholderBtn} onPress={takePhoto}>
              <Ionicons name="camera" size={48} color="#94A3B8" />
              <Text style={styles.placeholderText}>Tap to open camera</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Subtle dark gradient/overlay for header readability */}
        <View style={styles.imageOverlay} />
      </View>

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header (Floating on top of image) */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Review Report</Text>
          <View style={styles.headerBtnPlaceholder} />
        </View>

        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView 
            style={styles.scrollView} 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
          >
            {/* White Sheet Container (Design 2017:6 style) */}
            <View style={styles.sheetContainer}>
              
              {/* Drag Handle */}
              <View style={styles.dragHandle} />

              {/* 2. Detected Location Section */}
              <View style={styles.section}>
                <View style={styles.locationLabelRow}>
                  <Ionicons name="location" size={16} color="#20693A" />
                  <Text style={styles.locationLabel}>DETECTED LOCATION</Text>
                </View>
                <Text style={styles.locationTitle}>123 Nguyen Hue Street</Text>
                <Text style={styles.locationSubtitle}>Ho Chi Minh City, Vietnam</Text>
              </View>

              {/* 3. Trash Severity (With Slider requested by user) */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trash Severity</Text>
                
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={severityValue}
                  onValueChange={setSeverityValue}
                  minimumTrackTintColor="#20693A"
                  maximumTrackTintColor="#E2E8F0"
                  thumbTintColor="#20693A"
                />
                
                <View style={styles.severityLabelRow}>
                  <Text style={[
                      styles.severityLabel, 
                      getSeverityLabel(severityValue) === 'Light' && styles.severityLabelActive
                  ]}>LIGHT</Text>
                  <Text style={[
                      styles.severityLabel, 
                      getSeverityLabel(severityValue) === 'Medium' && styles.severityLabelActive
                  ]}>MEDIUM</Text>
                  <Text style={[
                      styles.severityLabel, 
                      getSeverityLabel(severityValue) === 'Heavy' && styles.severityLabelActive
                  ]}>HEAVY</Text>
                  <Text style={[
                      styles.severityLabel, 
                      getSeverityLabel(severityValue) === 'Extreme' && styles.severityLabelActive
                  ]}>EXTREME</Text>
                </View>
              </View>

              {/* 4. Waste Types */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Waste Types</Text>
                <View style={styles.chipsRow}>
                  {WASTE_TYPES.map((type) => {
                    const isSelected = selectedWasteTypes.has(type);
                    return (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.wasteChip, 
                          isSelected && styles.wasteChipSelected,
                        ]}
                        onPress={() => toggleWasteType(type)}
                        activeOpacity={0.7}
                      >
                        <Text style={[
                          styles.wasteChipText, 
                          isSelected && styles.wasteChipTextSelected,
                        ]}>
                          {type}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* 5. Additional Notes */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Additional Notes (Optional)</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Provide more context here..."
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  placeholderTextColor="#94A3B8"
                />
              </View>

              {/* 6. Submit Button */}
              <TouchableOpacity 
                style={[styles.submitBtn, !image && styles.submitBtnDisabled]} 
                onPress={handleSubmit}
                activeOpacity={0.8}
                disabled={!image}
              >
                <Ionicons name="send" size={18} color="#FFFFFF" />
                <Text style={styles.submitBtnText}>SUBMIT REPORT</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      
      {/* Retake Button (Floating Pill on top of image, but separate from content) */}
      {image && (
        <TouchableOpacity style={styles.retakeBtn} onPress={takePhoto} activeOpacity={0.9}>
          <Ionicons name="refresh" size={18} color="#FFFFFF" />
          <Text style={styles.retakeBtnText}>Retake Photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageBackgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.45, // Full width, top segment
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  placeholderBg: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
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
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)', // Darker top area
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: '#FFFFFF',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
  headerBtnPlaceholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: height * 0.35, // Push sheet starting point down
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    minHeight: height * 0.65,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  locationLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  locationLabel: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: '#20693A',
    letterSpacing: 1,
  },
  locationTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: '#1E293B',
    marginBottom: 4,
  },
  locationSubtitle: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: '#64748B',
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#334155',
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  severityLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  severityLabel: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    color: '#94A3B8',
  },
  severityLabelActive: {
    color: '#20693A',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wasteChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  wasteChipSelected: {
    backgroundColor: '#E7F2EB',
    borderColor: '#20693A',
  },
  wasteChipText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: '#64748B',
  },
  wasteChipTextSelected: {
    color: '#20693A',
  },
  textArea: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: '#334155',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
  },
  submitBtn: {
    backgroundColor: '#20693A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 18,
    gap: 10,
    marginTop: 8,
  },
  submitBtnDisabled: {
    backgroundColor: '#94A3B8',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontFamily: Fonts.bold,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  retakeBtn: {
    position: 'absolute',
    top: height * 0.35 - 60, // Positioned slightly above sheet
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
    zIndex: 15,
  },
  retakeBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: '#FFFFFF',
  },
});
