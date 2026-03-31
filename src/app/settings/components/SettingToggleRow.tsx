import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, LineHeights, BorderRadius, Spacing } from '../../../constants';

interface SettingToggleRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBg?: string;
  label: string;
  value: boolean;
  onToggle: (val: boolean) => void;
  isLast?: boolean;
}

export default function SettingToggleRow({ icon, iconColor, iconBg, label, value, onToggle, isLast }: SettingToggleRowProps) {
  return (
    <View style={[styles.settingRow, !isLast && styles.settingRowBorder]}>
      <View style={styles.settingRowLeft}>
        <View style={[styles.settingIconBox, { backgroundColor: iconBg || Colors.primaryLight }]}>
          <Ionicons name={icon} size={16} color={iconColor || Colors.primary} />
        </View>
        <Text style={styles.settingRowLabel}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#E2E8F0', true: 'rgba(32,105,58,0.35)' }}
        thumbColor={value ? Colors.primary : '#F1F5F9'}
        ios_backgroundColor="#E2E8F0"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: 14,
    minHeight: 52,
  },
  settingRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  settingRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  settingIconBox: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingRowLabel: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
    lineHeight: LineHeights.md,
    color: Colors.textPrimary,
  },
});
