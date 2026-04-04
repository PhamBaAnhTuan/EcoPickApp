import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts, FontSizes, LineHeights } from '../../constants';
import { getWasteTypeConfig, type WasteType } from '../../data/mockData';

interface WasteTypeChipProps {
  type: WasteType;
  selected?: boolean;
  onPress?: () => void;
  compact?: boolean;
}

export function WasteTypeChip({ type, selected = false, onPress, compact = false }: WasteTypeChipProps) {
  const config = getWasteTypeConfig(type);

  const Container = onPress ? TouchableOpacity : View;
  const containerProps = onPress ? { onPress, activeOpacity: 0.7 } : {};

  return (
    <Container
      {...(containerProps as any)}
      style={[
        styles.chip,
        compact && styles.chipCompact,
        {
          backgroundColor: selected ? `${config.color}15` : `${config.color}08`,
          borderColor: selected ? `${config.color}40` : `${config.color}18`,
        },
      ]}
    >
      <Ionicons
        name={config.icon as keyof typeof Ionicons.glyphMap}
        size={compact ? 11 : 13}
        color={config.color}
      />
      {!compact && <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>}
    </Container>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chipCompact: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 3,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
  },
});
