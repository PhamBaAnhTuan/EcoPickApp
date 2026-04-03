
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSizes, Spacing } from '../../../../constants';

interface LocationHistoryProps {
  reporter: string | null
}

const LocationHistory = ({ reporter }: LocationHistoryProps) => {
  const { t } = useTranslation();

  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{t('location.statusHistory')}</Text>
      <View style={s.timeline}>
        <View style={s.timelineLine} />

        <View style={s.timelineItem}>
          <View style={[s.timelineIconWrapper, { backgroundColor: Colors.primary }]}>
            <Ionicons name="checkmark" size={16} color={Colors.white} />
          </View>
          <View style={s.timelineContent}>
            <Text style={s.timelineTitle}>{t('location.reported')}</Text>
            <Text style={s.timelineDesc}>{t('location.reportedDesc', { reporter })}</Text>
          </View>
        </View>

        <View style={s.timelineItem}>
          <View style={[s.timelineIconWrapper, { backgroundColor: '#E2E8F0' }]}>
            <Ionicons name="eye-outline" size={16} color={Colors.textSecondary} />
          </View>
          <View style={s.timelineContent}>
            <Text style={s.timelineTitle}>{t('location.underReview')}</Text>
            <Text style={s.timelineDesc}>{t('location.underReviewDesc')}</Text>
          </View>
        </View>

        <View style={s.timelineItem}>
          <View style={[s.timelineIconWrapper, { backgroundColor: '#E2E8F0' }]}>
            <Ionicons name="leaf-outline" size={16} color={Colors.textSecondary} />
          </View>
          <View style={s.timelineContent}>
            <Text style={s.timelineTitle}>{t('location.cleaned')}</Text>
            <Text style={s.timelineDesc}>{t('location.cleanedDesc')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default LocationHistory;
const s = StyleSheet.create({
  section: { paddingHorizontal: Spacing.base, marginBottom: 32 },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: 18, color: Colors.textPrimary, marginBottom: 16 },
  timeline: { paddingLeft: 12, position: 'relative' },
  timelineLine: { position: 'absolute', top: 20, bottom: 20, left: 27, width: 2, backgroundColor: '#E2E8F0' },
  timelineItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 24, gap: 16 },
  timelineIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  timelineContent: { flex: 1, paddingTop: 4 },
  timelineTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.md, color: Colors.textPrimary, marginBottom: 2 },
  timelineDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.textSecondary },
});
