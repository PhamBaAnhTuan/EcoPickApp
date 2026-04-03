
import { useEvent, useEventParticipants, useJoinEvent } from '@/hooks/useEventQueries';
import { useAuthStore } from '@/stores/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Colors, Fonts } from '../../../constants';
import EventChat from './components/EventChat';
import EventEquipment from './components/EventEquipment';
import EventHero from './components/EventHero';
import EventInfo from './components/EventInfo';
import EventParticipants from './components/EventParticipants';
import { parseEquipment } from './constants';

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
      console.log('Error creating event:', error?.response?.data || error);
      Toast.show({
        type: 'error',
        text1: t('common.error', { defaultValue: 'Error' }),
        text2: error?.response?.data?.detail ||
          t('eventDetail.joinError', { defaultValue: 'Could not join event. Please try again.' }),
      })
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
      {/* <StatusBar style="dark" /> */}

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity style={s.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={16} color="#0F172A" />
        </TouchableOpacity>
        {/* <Text style={s.headerTitle} numberOfLines={1}>
          {event.title}
        </Text> */}
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
    // paddingVertical: 12,
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
