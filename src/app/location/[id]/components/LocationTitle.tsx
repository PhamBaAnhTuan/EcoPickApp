
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSizes, Spacing } from '../../../../constants';

interface LocationTitleProps {
  reportTitle: string;
  severityLabel: string;
  severityTheme: { backgroundColor: string; borderColor: string; textColor: string };
  distanceText: string;
}

const LocationTitle = ({ reportTitle, severityLabel, severityTheme, distanceText }: LocationTitleProps) => {
  const { t } = useTranslation();

  return (
    <View style={s.titleSection}>
      <View style={s.titleRow}>
        <Text style={s.title}>{reportTitle}</Text>
        <View
          style={[
            s.severityBadge,
            { backgroundColor: severityTheme.backgroundColor, borderColor: severityTheme.borderColor },
          ]}
        >
          <Ionicons name="warning-outline" size={14} color={severityTheme.textColor} />
          <Text style={[s.severityText, { color: severityTheme.textColor }]}>
            {severityLabel?.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={s.metaRow}>
        <View style={s.metaItem}>
          <Ionicons name="navigate-outline" size={16} color={Colors.textSecondary} />
          <Text style={s.metaText}>{distanceText}</Text>
        </View>
        <View style={s.metaItem}>
          <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
          <Text style={s.metaText}>{t('location.reportedAgo')}</Text>
        </View>
      </View>
    </View>
  );
}
export default LocationTitle;

const s = StyleSheet.create({
  titleSection: { paddingHorizontal: Spacing.base, marginBottom: Spacing.lg },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 },
  title: { flex: 1, fontFamily: Fonts.bold, fontSize: 24, lineHeight: 30, color: Colors.textPrimary },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  severityText: { fontFamily: Fonts.bold, fontSize: 10, letterSpacing: 0.5 },
  metaRow: { flexDirection: 'row', gap: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.textSecondary },
});
