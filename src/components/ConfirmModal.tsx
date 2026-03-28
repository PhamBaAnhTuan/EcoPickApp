import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Colors, Fonts } from '../constants';

// ─── Types ───────────────────────────────────────────────────
export type ConfirmModalVariant = 'danger' | 'warning' | 'info' | 'success';

export interface ConfirmModalProps {
  /** Control visibility */
  visible: boolean;
  /** Called when modal is dismissed (overlay tap or cancel) */
  onClose: () => void;
  /** Called when confirm button is pressed */
  onConfirm: () => void;
  /** Modal title */
  title: string;
  /** Modal description / message */
  message: string;
  /** Confirm button label (default: "Confirm") */
  confirmText?: string;
  /** Cancel button label (default: "Cancel") */
  cancelText?: string;
  /** Visual variant – changes icon & accent color */
  variant?: ConfirmModalVariant;
  /** Icon name (Ionicons) – auto-picked based on variant if omitted */
  icon?: keyof typeof Ionicons.glyphMap;
  /** Show loading spinner on confirm button */
  loading?: boolean;
  /** Hide cancel button (for info-only alerts) */
  hideCancelButton?: boolean;
}

// ─── Variant config ──────────────────────────────────────────
const VARIANT_CONFIG: Record<
  ConfirmModalVariant,
  {
    icon: keyof typeof Ionicons.glyphMap;
    iconColor: string;
    iconBg: string;
    iconBorder: string;
    confirmGradient: [string, string];
  }
> = {
  danger: {
    icon: 'alert-circle',
    iconColor: '#EF4444',
    iconBg: '#FEF2F2',
    iconBorder: '#FECACA',
    confirmGradient: ['#DC2626', '#B91C1C'],
  },
  warning: {
    icon: 'warning',
    iconColor: '#F59E0B',
    iconBg: '#FFFBEB',
    iconBorder: '#FDE68A',
    confirmGradient: ['#D97706', '#B45309'],
  },
  info: {
    icon: 'information-circle',
    iconColor: '#3B82F6',
    iconBg: '#EFF6FF',
    iconBorder: '#BFDBFE',
    confirmGradient: ['#2563EB', '#1D4ED8'],
  },
  success: {
    icon: 'checkmark-circle',
    iconColor: '#16A34A',
    iconBg: '#F0FDF4',
    iconBorder: '#BBF7D0',
    confirmGradient: ['#144227', '#2D5A3D'],
  },
};

// ─── Component ───────────────────────────────────────────────
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  icon,
  loading = false,
  hideCancelButton = false,
}) => {
  const config = VARIANT_CONFIG[variant];
  const resolvedIcon = icon ?? config.icon;

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent onRequestClose={onClose}>
      {/* Backdrop */}
      <Pressable style={styles.overlay} onPress={loading ? undefined : onClose}>
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)} style={StyleSheet.absoluteFill}>
          <BlurView intensity={24} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={styles.backdropTint} />
        </Animated.View>

        {/* Card */}
        <Pressable onPress={(e) => e.stopPropagation()}>
          <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)} style={styles.card}>
            {/* Decorative top accent */}
            <View style={[styles.topAccent, { backgroundColor: config.iconBg }]} />

            {/* Icon */}
            <View style={[styles.iconCircle, { backgroundColor: config.iconBg, borderColor: config.iconBorder }]}>
              <Ionicons name={resolvedIcon} size={32} color={config.iconColor} />
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Actions */}
            <View style={styles.actions}>
              {!hideCancelButton && (
                <TouchableOpacity style={styles.cancelButton} onPress={onClose} activeOpacity={0.7} disabled={loading}>
                  <Text style={styles.cancelText}>{cancelText}</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onConfirm}
                disabled={loading}
                style={[styles.confirmButtonWrapper, hideCancelButton && { flex: 1 }]}
              >
                <LinearGradient
                  colors={loading ? ['#94A3B8', '#94A3B8'] : config.confirmGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.confirmButton}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.confirmText}>{confirmText}</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

ConfirmModal.displayName = 'ConfirmModal';
export default ConfirmModal;

// ─── Styles ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  backdropTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },

  // Card
  card: {
    width: '100%',
    // maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 20,
  },
  topAccent: {
    height: 4,
    width: '100%',
  },

  // Icon
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 28,
  },

  // Content
  content: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    lineHeight: 28,
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  message: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 20,
  },

  // Actions
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cancelText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  confirmButtonWrapper: {
    flex: 1,
  },
  confirmButton: {
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
