
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts } from '../../../../constants';
import { useTranslation } from 'react-i18next';
import { PARTICIPANT_AVATARS } from '../constants';

interface EventParticipantsProps {
  participantsCount: number;
  maxParticipants: number | null | undefined;
}

export function EventParticipants({ participantsCount, maxParticipants }: EventParticipantsProps) {
  const { t } = useTranslation();

  return (
    <View style={s.participantsSection}>
      <View style={s.sectionHeader}>
        <View style={s.sectionTitleRow}>
          <Ionicons name="people-outline" size={24} color="#0F172A" />
          <Text style={s.sectionTitleText}>
            {t('eventDetail.participants', { count: participantsCount })}
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={s.viewAllText}>{t('common.viewAll')}</Text>
        </TouchableOpacity>
      </View>

      <View style={s.participantsRow}>
        <View style={s.avatarsContainer}>
          {PARTICIPANT_AVATARS.map((uri, idx) => (
            <View
              key={idx}
              style={[
                s.participantAvatar,
                { zIndex: 4 - idx, marginLeft: idx > 0 ? -12 : 0 },
              ]}
            >
              <Image source={{ uri }} style={s.participantAvatarImage} />
            </View>
          ))}
          {/* +N circle */}
          <View style={[s.participantCountCircle, { zIndex: 0, marginLeft: -12 }]}>
            <Text style={s.participantCountText}>
              +{participantsCount > 4 ? participantsCount - 4 : 0}
            </Text>
          </View>
        </View>

        {/* RSVP Separator */}
        <View style={s.rsvpSection}>
          <View style={s.rsvpDivider} />
          <View style={s.rsvpContent}>
            <Text style={s.rsvpLabel}>{t('eventDetail.rsvpStatus')}</Text>
            <Text style={s.rsvpValue}>
              {maxParticipants
                ? `${participantsCount}/${maxParticipants}`
                : t('eventDetail.confirmed', { count: participantsCount })}
            </Text>
          </View>
        </View>
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
