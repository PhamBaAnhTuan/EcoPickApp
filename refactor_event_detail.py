import os
import shutil

# Move the current file to index.tsx inside the new [id] folder temporarily if not already.
# We will just read it directly.
source_file = 'src/app/events/[id].tsx'
with open(source_file, 'r') as f:
    original_code = f.read()

# We'll just define the components' code manually since it's cleaner to rewrite to ensure proper layout and typing.

constants_ts = """
export const PARTICIPANT_AVATARS = [
  'https://i.pravatar.cc/100?u=p1',
  'https://i.pravatar.cc/100?u=p2',
  'https://i.pravatar.cc/100?u=p3',
  'https://i.pravatar.cc/100?u=p4',
];

export const CHAT_AVATAR = 'https://i.pravatar.cc/100?u=sarah';

export const formatDate = (iso: string): string => {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};

export const formatTime = (iso: string): string => {
  try {
    return new Date(iso).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return '';
  }
};

export const formatEventType = (type: string | null | undefined): string => {
  if (!type) return '';
  return type
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

export const parseEquipment = (
  equip: string | null | undefined,
): { name: string; status: 'BRING OWN' | 'PROVIDED' }[] => {
  if (!equip) return [];
  return equip
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name, i) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      status: i % 2 === 0 ? ('BRING OWN' as const) : ('PROVIDED' as const),
    }));
};
"""

hero_tsx = """
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts } from '../../../../constants';
import { useTranslation } from 'react-i18next';

interface EventHeroProps {
  event: any; // We use any for now or infer
  onOpenMaps: () => void;
}

export function EventHero({ event, onOpenMaps }: EventHeroProps) {
  const { t } = useTranslation();

  return (
    <View style={s.mapPreviewContainer}>
      <Image
        source={{
          uri:
            event.cover_image_url ||
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop',
        }}
        style={s.mapPreviewImage}
        resizeMode="cover"
      />
      {event.status && (
        <View
          style={[
            s.routeBadge,
            event.status === 'ongoing' && { backgroundColor: '#F59E0B' },
            event.status === 'completed' && { backgroundColor: '#6B7280' },
            event.status === 'cancelled' && { backgroundColor: '#EF4444' },
          ]}
        >
          <Ionicons name="git-network-outline" size={10.5} color={Colors.white} />
          <Text style={s.routeText}>{event.status.toUpperCase()}</Text>
        </View>
      )}
      <TouchableOpacity style={s.openMapsBtn} activeOpacity={0.8} onPress={onOpenMaps}>
        <Ionicons name="open-outline" size={10.5} color={Colors.primary} />
        <Text style={s.openMapsText}>{t('eventDetail.openMaps')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  mapPreviewContainer: {
    marginHorizontal: 16,
    aspectRatio: 16 / 9,
    backgroundColor: 'rgba(32,105,58,0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(32,105,58,0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  mapPreviewImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  routeBadge: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    transform: [{ translateY: -14 }],
    backgroundColor: '#20693A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  routeText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.white,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  openMapsBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  openMapsText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    lineHeight: 16,
    color: '#20693A',
    textAlign: 'center',
  },
});
"""

info_tsx = """
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts } from '../../../../constants';
import { useTranslation } from 'react-i18next';
import { formatEventType, formatDate, formatTime } from '../constants';

interface EventInfoProps {
  event: any;
}

export function EventInfo({ event }: EventInfoProps) {
  const { t } = useTranslation();

  return (
    <View style={s.container}>
      {/* Type & Title */}
      <View style={s.titleBlock}>
        <View style={s.typeRow}>
          <Ionicons name="home-outline" size={11.667} color={Colors.primary} />
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
            <Ionicons name="location-outline" size={14} color="#64748B" />
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
            <Text style={s.dateTimeValue}>{formatDate(event.start_date)}</Text>
          </View>
        </View>
        <View style={s.dateTimeBox}>
          <Ionicons name="time-outline" size={20} color={Colors.primary} />
          <View>
            <Text style={s.dateTimeLabel}>{t('eventDetail.time')}</Text>
            <Text style={s.dateTimeValue}>{formatTime(event.start_date)}</Text>
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
"""

participants_tsx = """
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
"""

equipment_tsx = """
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts } from '../../../../constants';
import { useTranslation } from 'react-i18next';

interface EventEquipmentProps {
  equipmentList: { name: string; status: 'BRING OWN' | 'PROVIDED' }[];
}

export function EventEquipment({ equipmentList }: EventEquipmentProps) {
  const { t } = useTranslation();

  if (equipmentList.length === 0) return null;

  return (
    <View style={s.equipmentCard}>
      <View style={s.equipmentHeader}>
        <Ionicons name="cube-outline" size={20} color="#0F172A" />
        <Text style={s.sectionTitleText}>{t('eventDetail.equipmentNeeded')}</Text>
      </View>
      <View style={s.equipmentList}>
        {equipmentList.map((item, index) => (
          <View key={index} style={s.equipmentRow}>
            <View style={s.equipmentLeft}>
              <Ionicons
                name={
                  item.name.toLowerCase().includes('water')
                    ? 'water-outline'
                    : item.name.toLowerCase().includes('bag')
                    ? 'bag-outline'
                    : 'hand-left-outline'
                }
                size={20}
                color="#64748B"
              />
              <Text style={s.equipmentName}>{item.name}</Text>
            </View>
            <View
              style={[
                s.equipmentStatus,
                item.status === 'PROVIDED' ? s.statusProvided : s.statusBring,
              ]}
            >
              <Text
                style={[
                  s.equipmentStatusText,
                  item.status === 'PROVIDED' ? s.statusProvidedText : s.statusBringText,
                ]}
              >
                {item.status === 'PROVIDED' ? t('eventDetail.provided') : t('eventDetail.bringOwn')}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  equipmentCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 17,
    gap: 12,
  },
  equipmentHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitleText: { fontFamily: Fonts.bold, fontSize: 16, lineHeight: 24, color: '#0F172A' },
  equipmentList: { gap: 8 },
  equipmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F8F7',
    padding: 8,
    borderRadius: 16,
  },
  equipmentLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  equipmentName: { fontFamily: Fonts.regular, fontSize: 14, lineHeight: 20, color: '#0F172A' },
  equipmentStatus: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  equipmentStatusText: { fontFamily: Fonts.bold, fontSize: 10, lineHeight: 15 },
  statusProvided: { backgroundColor: '#DCFCE7' },
  statusProvidedText: { color: '#15803D' },
  statusBring: { backgroundColor: '#FEF9C3' },
  statusBringText: { color: '#A16207' },
});
"""

chat_tsx = """
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts } from '../../../../constants';
import { useTranslation } from 'react-i18next';
import { CHAT_AVATAR } from '../constants';

export function EventChat() {
  const { t } = useTranslation();

  return (
    <View style={s.chatSection}>
      <View style={s.sectionHeader}>
        <View style={s.sectionTitleRow}>
          <Ionicons name="chatbubbles-outline" size={20} color="#0F172A" />
          <Text style={s.sectionTitleText}>{t('eventDetail.coordination')}</Text>
        </View>
        <Text style={s.newMessagesText}>{t('eventDetail.newMessages', { count: 3 })}</Text>
      </View>

      <View style={s.chatMessages}>
        {/* Message from other user — left aligned */}
        <View style={s.chatRowLeft}>
          <Image source={{ uri: CHAT_AVATAR }} style={s.chatAvatar} />
          <View style={s.chatBubbleLeft}>
            <View style={s.chatBubbleHeader}>
              <Text style={s.chatAuthor}>Mark T.</Text>
              <Text style={s.chatTime}>10:24 AM</Text>
            </View>
            <Text style={s.chatText}>
              {"I'll bring an extra pair of grabbers if anyone needs them!"}
            </Text>
          </View>
        </View>

        {/* Message from you — right aligned */}
        <View style={s.chatRowRight}>
          <View style={s.chatBubbleRight}>
            <View style={s.chatBubbleHeaderRight}>
              <Text style={s.chatTimeRight}>10:30 AM</Text>
              <Text style={s.chatOrganizer}>{t('common.organizer')}</Text>
            </View>
            <Text style={s.chatTextRight}>That would be great, Mark! Thanks.</Text>
          </View>
          <View style={s.youBadge}>
            <Text style={s.youBadgeText}>{t('common.you')}</Text>
          </View>
        </View>
      </View>

      {/* Send Input */}
      <View style={s.sendInputContainer}>
        <View style={s.sendInputBox}>
          <TextInput
            style={s.sendInput}
            placeholder={t('eventDetail.postUpdate')}
            placeholderTextColor="#6B7280"
          />
        </View>
        <TouchableOpacity style={s.sendIconBox}>
          <Ionicons name="paper-plane" size={14} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  chatSection: { gap: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitleText: { fontFamily: Fonts.bold, fontSize: 16, lineHeight: 24, color: '#0F172A' },
  newMessagesText: { fontFamily: Fonts.regular, fontSize: 12, lineHeight: 16, color: '#64748B' },
  chatMessages: { gap: 12 },
  chatRowLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  chatAvatar: { width: 32, height: 32, borderRadius: 9999 },
  chatBubbleLeft: {
    flex: 1,
    backgroundColor: 'rgba(32,105,58,0.05)',
    padding: 12,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderTopLeftRadius: 0,
    gap: 4,
  },
  chatBubbleHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chatAuthor: { fontFamily: Fonts.bold, fontSize: 12, lineHeight: 16, color: '#0F172A' },
  chatTime: { fontFamily: Fonts.regular, fontSize: 10, lineHeight: 15, color: '#94A3B8' },
  chatText: { fontFamily: Fonts.regular, fontSize: 14, lineHeight: 20, color: '#0F172A' },
  chatRowRight: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  chatBubbleRight: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderTopLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderTopRightRadius: 0,
    gap: 4,
  },
  chatBubbleHeaderRight: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chatTimeRight: { fontFamily: Fonts.regular, fontSize: 10, lineHeight: 15, color: '#94A3B8' },
  chatOrganizer: { fontFamily: Fonts.bold, fontSize: 12, lineHeight: 16, color: '#20693A', textAlign: 'right' },
  chatTextRight: { fontFamily: Fonts.regular, fontSize: 14, lineHeight: 20, color: '#0F172A', textAlign: 'right' },
  youBadge: { width: 32, height: 32, borderRadius: 9999, backgroundColor: '#20693A', alignItems: 'center', justifyContent: 'center' },
  youBadgeText: { fontFamily: Fonts.bold, fontSize: 10, lineHeight: 15, color: Colors.white, textAlign: 'center' },
  sendInputContainer: { position: 'relative' },
  sendInputBox: { backgroundColor: '#F1F5F9', borderRadius: 9999, paddingLeft: 20, paddingRight: 48, overflow: 'hidden' },
  sendInput: { fontFamily: Fonts.regular, fontSize: 14, color: '#0F172A', height: 46 },
  sendIconBox: { position: 'absolute', right: 8, top: 6, backgroundColor: '#20693A', width: 36, height: 36, borderRadius: 9999, alignItems: 'center', justifyContent: 'center' },
});
"""

index_tsx = """
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Colors, Fonts } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { useEvent, useJoinEvent, useEventParticipants } from '@/hooks/useEventQueries';
import { useAuthStore } from '@/stores/authStore';
import { parseEquipment } from './constants';
import { EventHero } from './components/EventHero';
import { EventInfo } from './components/EventInfo';
import { EventParticipants } from './components/EventParticipants';
import { EventEquipment } from './components/EventEquipment';
import { EventChat } from './components/EventChat';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

  // API
  const { data: event, isLoading, isError } = useEvent(id!);
  const { data: participants = [] } = useEventParticipants(
    id ? { event_id: id } : undefined,
  );
  const joinMutation = useJoinEvent();

  const userParticipant = participants.find((p) => p.user_id === user?.id);
  const [joined, setJoined] = useState(false);

  React.useEffect(() => {
    if (userParticipant) {
      setJoined(true);
    }
  }, [userParticipant]);

  const handleJoinEvent = useCallback(async () => {
    if (!event || !user?.id) return;
    if (joined) {
      setJoined(false);
      return;
    }

    try {
      await joinMutation.mutateAsync({
        event_id: event.id,
        user_id: user.id,
        status: 'joined',
      });
      setJoined(true);
    } catch (error: any) {
      Alert.alert(
        t('common.error', { defaultValue: 'Error' }),
        error?.response?.data?.detail ||
          t('eventDetail.joinError', { defaultValue: 'Could not join event. Please try again.' }),
      );
    }
  }, [event, user?.id, joined, joinMutation, t]);

  const handleOpenMaps = useCallback(() => {
    if (!event) return;
    const destLat = event.latitude || 37.7749;
    const destLng = event.longitude || -122.4194;
    const destTitle = event.title;

    router.push({
      pathname: '/(tabs)/map',
      params: { destLat: destLat.toString(), destLng: destLng.toString(), destTitle },
    });
  }, [event, router]);

  if (isLoading) {
    return (
      <SafeAreaView style={s.safeArea}>
        <StatusBar style="dark" />
        <View style={s.header}>
          <TouchableOpacity style={s.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={16} color="#0F172A" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>{t('common.loading', { defaultValue: 'Loading...' })}</Text>
          <View style={s.headerBtn} />
        </View>
        <View style={s.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !event) {
    return (
      <SafeAreaView style={s.safeArea}>
        <StatusBar style="dark" />
        <View style={s.header}>
          <TouchableOpacity style={s.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={16} color="#0F172A" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>{t('common.error', { defaultValue: 'Error' })}</Text>
          <View style={s.headerBtn} />
        </View>
        <View style={s.loadingContainer}>
          <Ionicons name="cloud-offline-outline" size={48} color="#EF4444" />
          <Text style={s.errorText}>
            {t('common.errorLoading', { defaultValue: 'Failed to load event details' })}
          </Text>
          <TouchableOpacity style={s.retryButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={16} color={Colors.white} />
            <Text style={s.retryButtonText}>{t('common.goBack', { defaultValue: 'Go Back' })}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const equipmentList = parseEquipment(event.equipment);
  const participantsCount = event.current_paticipants ?? participants.length;
  const maxParticipants = event.max_paticipants;
  const isEventEnded = event.status === 'completed' || event.status === 'cancelled';

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity style={s.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={16} color="#0F172A" />
        </TouchableOpacity>
        <Text style={s.headerTitle} numberOfLines={1}>
          {event.title}
        </Text>
        <TouchableOpacity style={s.headerBtn} activeOpacity={0.7}>
          <Ionicons name="share-social-outline" size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={s.scrollContainer}
          contentContainerStyle={s.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <EventHero event={event} onOpenMaps={handleOpenMaps} />

          <View style={s.detailsSection}>
            <EventInfo event={event} />
            <EventParticipants participantsCount={participantsCount} maxParticipants={maxParticipants} />
            <EventEquipment equipmentList={equipmentList} />
            <EventChat />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Join Button */}
      <View style={[s.bottomBar, { paddingBottom: Platform.OS === 'ios' ? 32 : 24 }]}>
        <TouchableOpacity
          style={[
            s.mainJoinButton,
            joined && s.joinedButton,
            isEventEnded && s.disabledButton,
          ]}
          onPress={handleJoinEvent}
          activeOpacity={0.8}
          disabled={isEventEnded || joinMutation.isPending}
        >
          {joinMutation.isPending ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <Ionicons
              name={
                isEventEnded
                  ? 'close-circle'
                  : joined
                  ? 'checkmark-circle'
                  : 'person-add-outline'
              }
              size={16.4}
              color={Colors.white}
            />
          )}
          <Text style={s.mainJoinButtonText}>
            {isEventEnded
              ? t('eventDetail.eventEnded', { defaultValue: 'Event Ended' })
              : joined
              ? t('eventDetail.joined')
              : t('eventDetail.joinEvent')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6F8F7' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(246,248,247,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(32,105,58,0.1)',
    zIndex: 10,
  },
  headerBtn: { width: 40, height: 40, borderRadius: 9999, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: Fonts.bold, fontSize: 18, lineHeight: 28, color: '#0F172A', flex: 1, textAlign: 'center' },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  errorText: { fontFamily: Fonts.medium, fontSize: 16, color: '#EF4444', textAlign: 'center', paddingHorizontal: 32 },
  retryButton: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  retryButtonText: { fontFamily: Fonts.bold, fontSize: 14, color: Colors.white },
  scrollContainer: { flex: 1 },
  contentContainer: { paddingTop: 16, paddingBottom: 120, gap: 16 },
  detailsSection: { paddingHorizontal: 16, gap: 24 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F6F8F7',
    paddingHorizontal: 16,
    paddingTop: 17,
    borderTopWidth: 1,
    borderTopColor: 'rgba(32,105,58,0.1)',
  },
  mainJoinButton: { backgroundColor: '#20693A', paddingVertical: 16, borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  joinedButton: { backgroundColor: '#0F172A' },
  disabledButton: { backgroundColor: '#94A3B8' },
  mainJoinButtonText: { fontFamily: Fonts.bold, fontSize: 16, lineHeight: 24, color: Colors.white, textAlign: 'center' },
});
"""

import os
with open('src/app/events/[id]/constants.ts', 'w') as f:
    f.write(constants_ts)

with open('src/app/events/[id]/components/EventHero.tsx', 'w') as f:
    f.write(hero_tsx)

with open('src/app/events/[id]/components/EventInfo.tsx', 'w') as f:
    f.write(info_tsx)

with open('src/app/events/[id]/components/EventParticipants.tsx', 'w') as f:
    f.write(participants_tsx)

with open('src/app/events/[id]/components/EventEquipment.tsx', 'w') as f:
    f.write(equipment_tsx)

with open('src/app/events/[id]/components/EventChat.tsx', 'w') as f:
    f.write(chat_tsx)

with open('src/app/events/[id]/index.tsx', 'w') as f:
    f.write(index_tsx)

# Now delete the original single file
os.remove(source_file)
