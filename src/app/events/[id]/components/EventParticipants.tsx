
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fonts } from '../../../../constants';

interface EventParticipantsProps {
  participantsCount: number;
  eventID: string;
}

export default function EventParticipants({ participantsCount, eventID }: EventParticipantsProps) {
  const { t } = useTranslation()

  return (
    <View style={s.participantsSection}>
      <View style={s.sectionHeader}>
        <View style={s.sectionTitleRow}>
          <Ionicons name="people-outline" size={24} color="#0F172A" />
          <Text style={s.sectionTitleText}>
            {t('eventDetail.participants', { count: participantsCount })}
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push({ pathname: `/events/participants`, params: { id: eventID } })}>
          <Text style={s.viewAllText}>{t('common.viewAll')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  participantsSection: { gap: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitleText: { fontFamily: Fonts.bold, fontSize: 16, lineHeight: 24, color: '#0F172A' },
  viewAllText: { fontFamily: Fonts.bold, fontSize: 12, lineHeight: 16, color: '#20693A', textAlign: 'center' },
  participantsRow: { flexDirection: 'row', alignItems: 'center', paddingLeft: 4, paddingRight: 16 },
  avatarsContainer: { flexDirection: 'row', alignItems: 'center' },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    overflow: 'hidden',
    shadowColor: '#F6F8F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
    borderWidth: 2,
    borderColor: '#F6F8F7',
  },
  participantAvatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  participantCountCircle: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: 'rgba(32,105,58,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F6F8F7',
  },
  participantCountText: { fontFamily: Fonts.bold, fontSize: 12, lineHeight: 16, color: '#20693A', textAlign: 'center' },
  rsvpSection: { flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
  rsvpDivider: { width: 1, height: '100%', backgroundColor: '#E2E8F0', marginRight: 25 },
  rsvpContent: {},
  rsvpLabel: { fontFamily: Fonts.bold, fontSize: 10, lineHeight: 15, color: '#64748B', letterSpacing: -0.5, textTransform: 'uppercase' },
  rsvpValue: { fontFamily: Fonts.bold, fontSize: 12, lineHeight: 16, color: '#16A34A' },
});
