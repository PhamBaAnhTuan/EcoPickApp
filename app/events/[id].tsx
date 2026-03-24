import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Colors, Fonts, FontSizes, BorderRadius, Spacing } from '../../constants';
import { MOCK_EVENTS } from '../../data/mockData';
import { useTranslation } from 'react-i18next';

const PARTICIPANT_AVATARS = [
  'https://i.pravatar.cc/100?u=p1',
  'https://i.pravatar.cc/100?u=p2',
  'https://i.pravatar.cc/100?u=p3',
  'https://i.pravatar.cc/100?u=p4',
];

const CHAT_AVATAR = 'https://i.pravatar.cc/100?u=sarah';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const event = MOCK_EVENTS.find((e) => e.id === id) || MOCK_EVENTS[0];
  const [joined, setJoined] = useState(false);
  const { t } = useTranslation();

  const handleOpenMaps = () => {
    const destLat = event.latitude || 37.7749;
    const destLng = event.longitude || -122.4194;
    const destTitle = event.title;

    router.push({
      pathname: '/(tabs)/map',
      params: {
        destLat: destLat.toString(),
        destLng: destLng.toString(),
        destTitle,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={16} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{event.title}</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Ionicons name="share-social-outline" size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

        {/* ─── Map Preview ─── */}
        <View style={styles.mapPreviewContainer}>
          <Image
            source={{ uri: event.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop' }}
            style={styles.mapPreviewImage}
            resizeMode="cover"
          />
          {/* Route Badge */}
          {event.distance && (
            <View style={styles.routeBadge}>
              <Ionicons name="git-network-outline" size={10.5} color={Colors.white} />
              <Text style={styles.routeText}>{event.distance}</Text>
            </View>
          )}
          {/* Open Maps Button */}
          <TouchableOpacity style={styles.openMapsBtn} activeOpacity={0.8} onPress={handleOpenMaps}>
            <Ionicons name="open-outline" size={10.5} color={Colors.primary} />
            <Text style={styles.openMapsText}>{t('eventDetail.openMaps')}</Text>
          </TouchableOpacity>
        </View>

        {/* ─── Event Details Section ─── */}
        <View style={styles.detailsSection}>

          {/* Type & Title */}
          <View style={styles.titleBlock}>
            <View style={styles.typeRow}>
              <Ionicons name="home-outline" size={11.667} color={Colors.primary} />
              <Text style={styles.typeText}>{event.type || t('eventDetail.communityEvent')}</Text>
            </View>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.description}>
              {event.description || t('eventDetail.defaultDescription')}
            </Text>
          </View>

          {/* ─── Date & Time Row ─── */}
          <View style={styles.dateTimeRow}>
            <View style={styles.dateTimeBox}>
              <Ionicons name="calendar-outline" size={18} color={Colors.primary} />
              <View>
                <Text style={styles.dateTimeLabel}>{t('eventDetail.date')}</Text>
                <Text style={styles.dateTimeValue}>{event.date}</Text>
              </View>
            </View>
            <View style={styles.dateTimeBox}>
              <Ionicons name="time-outline" size={20} color={Colors.primary} />
              <View>
                <Text style={styles.dateTimeLabel}>{t('eventDetail.time')}</Text>
                <Text style={styles.dateTimeValue}>{event.time}</Text>
              </View>
            </View>
          </View>

          {/* ─── Participants ─── */}
          <View style={styles.participantsSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="people-outline" size={24} color="#0F172A" />
                <Text style={styles.sectionTitleText}>{t('eventDetail.participants', { count: event.participants })}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>{t('common.viewAll')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.participantsRow}>
              <View style={styles.avatarsContainer}>
                {PARTICIPANT_AVATARS.map((uri, idx) => (
                  <View key={idx} style={[styles.participantAvatar, { zIndex: 4 - idx, marginLeft: idx > 0 ? -12 : 0 }]}>
                    <Image source={{ uri }} style={styles.participantAvatarImage} />
                  </View>
                ))}
                {/* +N circle */}
                <View style={[styles.participantCountCircle, { zIndex: 0, marginLeft: -12 }]}>
                  <Text style={styles.participantCountText}>+{event.participants > 4 ? event.participants - 4 : 0}</Text>
                </View>
              </View>

              {/* RSVP Separator */}
              <View style={styles.rsvpSection}>
                <View style={styles.rsvpDivider} />
                <View style={styles.rsvpContent}>
                  <Text style={styles.rsvpLabel}>{t('eventDetail.rsvpStatus')}</Text>
                  <Text style={styles.rsvpValue}>{t('eventDetail.confirmed', { count: event.confirmedCount || 8 })}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* ─── Equipment ─── */}
          {event.equipment && event.equipment.length > 0 && (
            <View style={styles.equipmentCard}>
              <View style={styles.equipmentHeader}>
                <Ionicons name="cube-outline" size={20} color="#0F172A" />
                <Text style={styles.sectionTitleText}>{t('eventDetail.equipmentNeeded')}</Text>
              </View>
              <View style={styles.equipmentList}>
                {event.equipment.map((item, index) => (
                  <View key={index} style={styles.equipmentRow}>
                    <View style={styles.equipmentLeft}>
                      <Ionicons
                        name={
                          item.name.toLowerCase().includes('water') ? 'water-outline' :
                          item.name.toLowerCase().includes('bag') ? 'bag-outline' :
                          'hand-left-outline'
                        }
                        size={20}
                        color="#64748B"
                      />
                      <Text style={styles.equipmentName}>{item.name}</Text>
                    </View>
                    <View style={[
                      styles.equipmentStatus,
                      item.status === 'PROVIDED' ? styles.statusProvided : styles.statusBring,
                    ]}>
                      <Text style={[
                        styles.equipmentStatusText,
                        item.status === 'PROVIDED' ? styles.statusProvidedText : styles.statusBringText,
                      ]}>
                        {item.status === 'PROVIDED' ? t('eventDetail.provided') : t('eventDetail.bringOwn')}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* ─── Coordination Chat ─── */}
          <View style={styles.chatSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="chatbubbles-outline" size={20} color="#0F172A" />
                <Text style={styles.sectionTitleText}>{t('eventDetail.coordination')}</Text>
              </View>
              <Text style={styles.newMessagesText}>{t('eventDetail.newMessages', { count: 3 })}</Text>
            </View>

            <View style={styles.chatMessages}>
              {/* Message from other user — left aligned */}
              <View style={styles.chatRowLeft}>
                <Image source={{ uri: CHAT_AVATAR }} style={styles.chatAvatar} />
                <View style={styles.chatBubbleLeft}>
                  <View style={styles.chatBubbleHeader}>
                    <Text style={styles.chatAuthor}>Mark T.</Text>
                    <Text style={styles.chatTime}>10:24 AM</Text>
                  </View>
                  <Text style={styles.chatText}>
                    {"I'll bring an extra pair of grabbers if anyone needs them!"}
                  </Text>
                </View>
              </View>

              {/* Message from you — right aligned */}
              <View style={styles.chatRowRight}>
                <View style={styles.chatBubbleRight}>
                  <View style={styles.chatBubbleHeaderRight}>
                    <Text style={styles.chatTimeRight}>10:30 AM</Text>
                    <Text style={styles.chatOrganizer}>{t('common.organizer')}</Text>
                  </View>
                  <Text style={styles.chatTextRight}>
                    That would be great, Mark! Thanks.
                  </Text>
                </View>
                <View style={styles.youBadge}>
                  <Text style={styles.youBadgeText}>{t('common.you')}</Text>
                </View>
              </View>
            </View>

            {/* Send Input */}
            <View style={styles.sendInputContainer}>
              <View style={styles.sendInputBox}>
                <Text style={styles.sendPlaceholder}>{t('eventDetail.postUpdate')}</Text>
              </View>
              <View style={styles.sendIconBox}>
                <Ionicons name="paper-plane" size={11} color={Colors.white} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ─── Bottom Join Button ─── */}
      <View style={[styles.bottomBar, { paddingBottom: Platform.OS === 'ios' ? 32 : 24 }]}>
        <TouchableOpacity
          style={[styles.mainJoinButton, joined && styles.joinedButton]}
          onPress={() => setJoined(!joined)}
          activeOpacity={0.8}
        >
          <Ionicons name={joined ? 'checkmark-circle' : 'person-add-outline'} size={16.4} color={Colors.white} />
          <Text style={styles.mainJoinButtonText}>{joined ? t('eventDetail.joined') : t('eventDetail.joinEvent')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8F7',
  },

  // ─── Header ───
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
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    lineHeight: 28,
    color: '#0F172A',
    flex: 1,
    textAlign: 'center',
  },

  // ─── Scroll ───
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 16,
    paddingBottom: 120,
    gap: 16,
  },

  // ─── Map Preview ───
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

  // ─── Details Section ───
  detailsSection: {
    paddingHorizontal: 16,
    gap: 24,
  },

  // ─── Title Block ───
  titleBlock: {
    gap: 4,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
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

  // ─── Date & Time ───
  dateTimeRow: {
    flexDirection: 'row',
    gap: 12,
    height: 62,
  },
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
  dateTimeLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: '#64748B',
  },
  dateTimeValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    color: '#0F172A',
  },

  // ─── Participants ───
  participantsSection: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitleText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: 24,
    color: '#0F172A',
  },
  viewAllText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    color: '#20693A',
    textAlign: 'center',
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 16,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    overflow: 'hidden',
    shadowColor: '#F6F8F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
    // Use border for ring effect on iOS
    borderWidth: 2,
    borderColor: '#F6F8F7',
  },
  participantAvatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
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
  participantCountText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    color: '#20693A',
    textAlign: 'center',
  },
  rsvpSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  rsvpDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E2E8F0',
    marginRight: 25,
  },
  rsvpContent: {
    // No specific layout needed
  },
  rsvpLabel: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    lineHeight: 15,
    color: '#64748B',
    letterSpacing: -0.5,
    textTransform: 'uppercase',
  },
  rsvpValue: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    color: '#16A34A',
  },

  // ─── Equipment ───
  equipmentCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 17,
    gap: 12,
  },
  equipmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  equipmentList: {
    gap: 8,
  },
  equipmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F8F7',
    padding: 8,
    borderRadius: 16,
  },
  equipmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  equipmentName: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#0F172A',
  },
  equipmentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  equipmentStatusText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    lineHeight: 15,
  },
  statusProvided: {
    backgroundColor: '#DCFCE7',
  },
  statusProvidedText: {
    color: '#15803D',
  },
  statusBring: {
    backgroundColor: '#FEF9C3',
  },
  statusBringText: {
    color: '#A16207',
  },

  // ─── Chat ───
  chatSection: {
    gap: 16,
  },
  newMessagesText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: '#64748B',
  },
  chatMessages: {
    gap: 12,
  },

  // Left message (other user)
  chatRowLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  chatAvatar: {
    width: 32,
    height: 32,
    borderRadius: 9999,
  },
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
  chatBubbleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatAuthor: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    color: '#0F172A',
  },
  chatTime: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    lineHeight: 15,
    color: '#94A3B8',
  },
  chatText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#0F172A',
  },

  // Right message (you)
  chatRowRight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
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
  chatBubbleHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatTimeRight: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    lineHeight: 15,
    color: '#94A3B8',
  },
  chatOrganizer: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    color: '#20693A',
    textAlign: 'right',
  },
  chatTextRight: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#0F172A',
    textAlign: 'right',
  },
  youBadge: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    backgroundColor: '#20693A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  youBadgeText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    lineHeight: 15,
    color: Colors.white,
    textAlign: 'center',
  },

  // Send Input
  sendInputContainer: {
    position: 'relative',
  },
  sendInputBox: {
    backgroundColor: '#F1F5F9',
    borderRadius: 9999,
    paddingLeft: 20,
    paddingRight: 48,
    paddingTop: 13,
    paddingBottom: 14,
    overflow: 'hidden',
  },
  sendPlaceholder: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#6B7280',
  },
  sendIconBox: {
    position: 'absolute',
    right: 8,
    top: 6,
    backgroundColor: '#20693A',
    width: 36,
    height: 36,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ─── Bottom Bar ───
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
  mainJoinButton: {
    backgroundColor: '#20693A',
    paddingVertical: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  joinedButton: {
    backgroundColor: '#0F172A',
  },
  mainJoinButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.white,
    textAlign: 'center',
  },
});
