import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts, FontSizes, LineHeights } from '../../constants';
import { getStatusConfig, type ReportStatus } from '../../data/mockData';

interface StatusBadgeProps {
  status: ReportStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = getStatusConfig(status);

  return (
    <View style={[styles.badge, { backgroundColor: config.bgColor }]}>
      <Ionicons
        name={config.icon as keyof typeof Ionicons.glyphMap}
        size={12}
        color={config.color}
      />
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.xs,
    lineHeight: LineHeights.xs,
  },
});
