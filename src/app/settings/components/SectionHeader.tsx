import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, LineHeights, Spacing } from '../../../constants';

interface SectionHeaderProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
}

export default function SectionHeader({ icon, title, description }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderRow}>
        <Ionicons name={icon} size={18} color={Colors.primary} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {description ? <Text style={styles.sectionDesc}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginBottom: Spacing.md,
    paddingLeft: Spacing.xs,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    lineHeight: LineHeights.base,
    color: Colors.textPrimary,
  },
  sectionDesc: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
    color: Colors.textSecondary,
    marginTop: 2,
    paddingLeft: 26,
  },
});
