import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, FontSizes, LineHeights } from '../constants';
import { SeverityLevel } from '../data/mockData';
import { getSeverityTheme } from '../utils/severity';

interface SeverityChipProps {
  severity: SeverityLevel;
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function SeverityChip({ severity, label, selected = false, onPress }: SeverityChipProps) {
  const theme = getSeverityTheme(severity);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: theme.backgroundColor,
          borderColor: theme.borderColor,
          opacity: selected ? 1 : 0.6,
        },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: theme.dotColor }]} />
      <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 1,
    borderRadius: 9999,
    borderWidth: 1,
    height: 32,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
  },
});
