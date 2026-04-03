import { useLayout } from '@/hooks/use-layout';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Fonts } from '../constants';
interface ImageSourceSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelectCamera: () => void;
  onSelectGallery: () => void;
}

export function ImageSourceSheet({
  visible,
  onClose,
  onSelectCamera,
  onSelectGallery,
}: ImageSourceSheetProps) {
  const { insets, bottomTabHeight } = useLayout();
  const { t } = useTranslation();
  const translateY = useSharedValue(300);
  const backdropOpacity = useSharedValue(0);

  React.useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(1, { duration: 250 });
      translateY.value = withSpring(0, { damping: 22, stiffness: 260, mass: 0.8 });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(300, { duration: 200 });
    }
  }, [visible]);

  const animatedSheet = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedBackdrop = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const handleCamera = () => {
    onClose();
    setTimeout(onSelectCamera, 300);
  };

  const handleGallery = () => {
    onClose();
    setTimeout(onSelectGallery, 300);
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
      <View style={styles.container}>
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, animatedBackdrop]}>
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            onPress={onClose}
            activeOpacity={1}
          />
        </Animated.View>

        {/* Sheet */}
        <Animated.View style={[styles.sheet, animatedSheet]}>
          {/* Drag Handle */}
          <View style={styles.dragHandleRow}>
            <View style={styles.dragHandle} />
          </View>

          {/* Title */}
          <Text style={styles.title}>{t('report.chooseSource')}</Text>

          {/* Option Cards */}
          <View style={styles.optionsRow}>
            {/* Camera Option */}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={handleCamera}
              activeOpacity={0.7}
            >
              <View style={styles.optionIconContainer}>
                <View style={styles.optionIconCircle}>
                  <Ionicons name="camera" size={28} color="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.optionTitle}>{t('report.fromCamera')}</Text>
              <Text style={styles.optionDesc}>{t('report.fromCameraDesc')}</Text>
            </TouchableOpacity>

            {/* Gallery Option */}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={handleGallery}
              activeOpacity={0.7}
            >
              <View style={styles.optionIconContainer}>
                <View style={[styles.optionIconCircle, styles.optionIconCircleGallery]}>
                  <Ionicons name="images" size={28} color="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.optionTitle}>{t('report.fromGallery')}</Text>
              <Text style={styles.optionDesc}>{t('report.fromGalleryDesc')}</Text>
            </TouchableOpacity>
          </View>

          {/* Cancel */}
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.cancelText}>{t('common.cancel')}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 25,
  },
  dragHandleRow: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 24,
  },
  optionsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 14,
    marginBottom: 20,
  },
  optionCard: {
    flex: 1,
    backgroundColor: '#F8FAF9',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E8F0EC',
  },
  optionIconContainer: {
    marginBottom: 14,
  },
  optionIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#20693A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#20693A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  optionIconCircleGallery: {
    backgroundColor: '#1A8A6E',
  },
  optionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: '#1E293B',
    marginBottom: 4,
  },
  optionDesc: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  cancelBtn: {
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: '#64748B',
  },
});
