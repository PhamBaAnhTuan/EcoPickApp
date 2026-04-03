
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts } from '../../../../constants';
import { formatEventType } from '../constants';

interface EventInfoProps {
  event: any;
}

export default function EventInfo({ event }: EventInfoProps) {
  const { t } = useTranslation();
  // console.log('EventInfo event data:', event);
  return (
    <View style={s.container}>
      {/* Type & Title */}
      <View style={s.titleBlock}>
        <View style={s.typeRow}>
          <Ionicons name="leaf-sharp" size={21} color={Colors.primary} />
          <Text style={s.typeText}>
            {formatEventType(event.type) || t('eventDetail.communityEvent')}
          </Text>
        </View>
        <Text style={s.title}>{event.title}</Text>
        <Text style={s.description}>
          {event.description || t('eventDetail.defaultDescription')}
        </Text>
        {event.address && (
          <View style={s.addressRow}>
            <Ionicons name="location-sharp" size={21} color='#ff0000' />
            <Text style={s.addressText}>{event.address}</Text>
          </View>
        )}
      </View>

      {/* Date & Time Row */}
      <View style={s.dateTimeRow}>
        <View style={s.dateTimeBox}>
          <Ionicons name="calendar-outline" size={18} color={Colors.primary} />
          <View>
            <Text style={s.dateTimeLabel}>{t('eventDetail.date')}</Text>
            <Text style={s.dateTimeValue}>{event.start_date.split(' ')[0]}</Text>
          </View>
        </View>
        <View style={s.dateTimeBox}>
          <Ionicons name="time-outline" size={20} color={Colors.primary} />
          <View>
            <Text style={s.dateTimeLabel}>{t('eventDetail.time')}</Text>
            <Text style={s.dateTimeValue}>{event.start_date.split(' ')[1]}</Text>
          </View>
        </View>
      </View>

      {/* Info Cards */}
      <View style={s.infoCardsRow}>
        {event.difficulty && (
          <View style={s.infoCard}>
            <Ionicons name="speedometer-outline" size={18} color={Colors.primary} />
            <Text style={s.infoCardLabel}>{t('eventDetail.difficulty', { defaultValue: 'Difficulty' })}</Text>
            <Text style={s.infoCardValue}>
              {event.difficulty.charAt(0).toUpperCase() + event.difficulty.slice(1)}
            </Text>
          </View>
        )}
        {event.eco_point_reward > 0 && (
          <View style={s.infoCard}>
            <Ionicons name="leaf-outline" size={18} color="#16A34A" />
            <Text style={s.infoCardLabel}>{t('eventDetail.ecoPoints', { defaultValue: 'Eco Points' })}</Text>
            <Text style={[s.infoCardValue, { color: '#16A34A' }]}>
              +{event.eco_point_reward}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    gap: 24,
  },
  titleBlock: { gap: 4 },
  typeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  typeText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: '#20693A',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: '#0F172A',
    lineHeight: 32,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  addressText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    flex: 1,
  },
  dateTimeRow: { flexDirection: 'row', gap: 12, height: 62 },
  dateTimeBox: {
    flex: 1,
    backgroundColor: 'rgba(32,105,58,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(32,105,58,0.1)',
    padding: 13,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateTimeLabel: { fontFamily: Fonts.regular, fontSize: 12, lineHeight: 16, color: '#64748B' },
  dateTimeValue: { fontFamily: Fonts.bold, fontSize: 14, lineHeight: 20, color: '#0F172A' },
  infoCardsRow: { flexDirection: 'row', gap: 12 },
  infoCard: {
    flex: 1,
    backgroundColor: 'rgba(32,105,58,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(32,105,58,0.1)',
    padding: 13,
    borderRadius: 16,
    alignItems: 'center',
    gap: 4,
  },
  infoCardLabel: { fontFamily: Fonts.regular, fontSize: 11, lineHeight: 16, color: '#64748B' },
  infoCardValue: { fontFamily: Fonts.bold, fontSize: 16, lineHeight: 20, color: '#0F172A' },
});
