
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, FontSizes, Spacing } from '../../../../constants';
import { useTranslation } from 'react-i18next';

interface LocationDescriptionProps {
  description?: string;
}

export function LocationDescription({ description }: LocationDescriptionProps) {
  const { t } = useTranslation();

  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{t('location.description')}</Text>
      <Text style={s.description}>
        {description}. {t('location.descriptionExtra')}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  section: { paddingHorizontal: Spacing.base, marginBottom: 32 },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: 18, color: Colors.textPrimary, marginBottom: 16 },
  description: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
});
