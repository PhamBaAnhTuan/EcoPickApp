
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSizes, Spacing } from '../../../../constants';

interface LocationDescriptionProps {
  description?: string;
}

const LocationDescription = ({ description }: LocationDescriptionProps) => {
  const { t } = useTranslation();

  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{t('location.description')}</Text>
      <Text style={s.description}>
        {description ? description : t('location.noDescription')}
      </Text>
    </View>
  );
}
export default LocationDescription;
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
