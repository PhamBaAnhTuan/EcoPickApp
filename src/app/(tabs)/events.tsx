import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, BorderRadius, Spacing } from '../../constants';
import { MOCK_EVENTS, EventItem } from '../../data/mockData';
import { useTranslation } from 'react-i18next';

const TAB_KEYS = ['upcoming', 'myEvents', 'past'] as const;

const AVATAR_IMAGES = [
  'https://i.pravatar.cc/100?u=a1',
  'https://i.pravatar.cc/100?u=b2',
  'https://i.pravatar.cc/100?u=c3',
];

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('upcoming');
  const { t } = useTranslation();

  const getFilteredEvents = useCallback(() => {
    if (activeTab === 'upcoming') return MOCK_EVENTS;
    if (activeTab === 'myEvents') return MOCK_EVENTS.filter((e) => e.isOrganizer);
    if (activeTab === 'past') return [];
    return MOCK_EVENTS;
  }, [activeTab]);

  const handleJoinEvent = useCallback((event: EventItem) => {
    router.push(`/events/${event.id}`);
  }, [router]);

  const handlePressCard = useCallback((event: EventItem) => {
    router.push(`/events/${event.id}`);
  }, [router]);

  const renderEvent = useCallback(
    ({ item }: { item: EventItem }) => (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => handlePressCard(item)}
        activeOpacity={0.9}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.eventImage} resizeMode="cover" />
          {item.isOrganizer && (
            <View style={styles.organizerBadge}>
              <Text style={styles.organizerText}>{t('common.organizer').toUpperCase()}</Text>
            </View>
          )}
        </View>
        <View style={styles.eventContent}>
          <View style={styles.textContent}>
            <Text style={styles.eventTitle} numberOfLines={2}>{item.title}</Text>
            <View style={styles.eventDateContainer}>
              <Ionicons name="calendar-outline" size={14} color={Colors.primary} />
              <Text style={styles.eventDateText}>
                {item.date} • {item.time}
              </Text>
            </View>
          </View>

          <View style={styles.eventFooterMargin}>
            <View style={styles.eventFooter}>
              <View style={styles.avatarsSection}>
                <View style={styles.avatarsStack}>
                  {AVATAR_IMAGES.map((uri, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.avatar,
                        { zIndex: 3 - idx, marginLeft: idx > 0 ? -8 : 0 },
                      ]}
                    >
                      <Image source={{ uri }} style={styles.avatarImage} />
                    </View>
                  ))}
                </View>
                <Text style={styles.othersText}>{t('events.others', { count: item.participants })}</Text>
              </View>
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => handleJoinEvent(item)}
                activeOpacity={0.8}
              >
                <Text style={styles.joinButtonText}>{t('events.join')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [handleJoinEvent, handlePressCard]
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + (Platform.OS === 'android' ? 16 : 0) }]}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3234/3234123.png' }}
            style={styles.logo}
          />
        </View>
        <Text style={styles.headerTitle}>{t('events.headerTitle')}</Text>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={18} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrapper}>
        <View style={styles.tabsContainer}>
          {TAB_KEYS.map((tabKey) => (
            <TouchableOpacity
              key={tabKey}
              style={[styles.tab, activeTab === tabKey && styles.activeTab]}
              onPress={() => setActiveTab(tabKey)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tabKey && styles.activeTabText]}>
                {t(`events.${tabKey}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Event List */}
      <FlatList
        data={getFilteredEvents()}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={48} color="#94A3B8" />
            <Text style={styles.emptyText}>{t('events.noEvents')}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ─── Header ───
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(32,105,58,0.1)',
  },
  logoContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 29,
    height: 39,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: '#0F172A',
    letterSpacing: -0.5,
    textAlign: 'center',
    flex: 1,
  },
  searchContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ─── Tabs ───
  tabsWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(32,105,58,0.05)',
    borderRadius: 12,
    padding: 4,
    height: 48,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
  },
  activeTabText: {
    color: '#20693A',
  },

  // ─── Event List ───
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  // ─── Event Card ───
  eventCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(32,105,58,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  organizerBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#20693A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  organizerText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  eventContent: {
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 16,
    gap: 12,
  },
  textContent: {
    gap: 4,
  },
  eventTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    lineHeight: 22.5,
    color: '#0F172A',
  },
  eventDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventDateText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: '#20693A',
  },

  // ─── Footer ───
  eventFooterMargin: {
    paddingTop: 4,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarsSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarsStack: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: Colors.white,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  othersText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#64748B',
    marginLeft: 12,
  },
  joinButton: {
    backgroundColor: '#20693A',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 12,
  },
  joinButtonText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  // ─── Empty State ───
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 12,
  },
  emptyText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: '#94A3B8',
  },
});
