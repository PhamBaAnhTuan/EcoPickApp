import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BaseToastProps } from 'react-native-toast-message';
import { Fonts } from '../constants';

// ============================================================
// Custom Toast Config – EcoPick Theme
// Tối giản, đẹp, phù hợp với design system
// ============================================================

const TOAST_COLORS = {
  success: {
    bg: '#ECFDF5',
    border: '#A7F3D0',
    icon: '#059669',
    title: '#065F46',
    text: '#047857',
  },
  error: {
    bg: '#FEF2F2',
    border: '#FECACA',
    icon: '#DC2626',
    title: '#991B1B',
    text: '#B91C1C',
  },
  info: {
    bg: '#EFF6FF',
    border: '#BFDBFE',
    icon: '#2563EB',
    title: '#1E40AF',
    text: '#1D4ED8',
  },
} as const;

type ToastType = keyof typeof TOAST_COLORS;

interface ToastIconMap {
  [key: string]: React.ComponentProps<typeof Ionicons>['name'];
}

const TOAST_ICONS: ToastIconMap = {
  success: 'checkmark-circle',
  error: 'close-circle',
  info: 'information-circle',
};

// Custom toast component factory
function createToast(type: ToastType) {
  const colors = TOAST_COLORS[type];
  const iconName = TOAST_ICONS[type];

  const ToastComponent = ({ text1, text2 }: BaseToastProps) => (
    <View style={[styles.container, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={22} color={colors.icon} />
      </View>
      <View style={styles.textContainer}>
        {text1 ? (
          <Text style={[styles.title, { color: colors.title }]} numberOfLines={1}>
            {text1}
          </Text>
        ) : null}
        {text2 ? (
          <Text style={[styles.message, { color: colors.text }]} numberOfLines={2}>
            {text2}
          </Text>
        ) : null}
      </View>
    </View>
  );

  ToastComponent.displayName = `Toast_${type}`;
  return ToastComponent;
}

// ─── Export Config ───────────────────────────────────────────────────────────

export const toastConfig = {
  success: createToast('success'),
  error: createToast('error'),
  info: createToast('info'),
};

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
  },
  message: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
  },
});
