import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, BorderRadius, Spacing } from '../../constants';
import { MOCK_EVENTS, EventItem } from '../../data/mockData';

const TABS = ['Upcoming', 'My Events', 'Past'];

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Upcoming');

  const handleJoinEvent = useCallback((event: EventItem) => {
    // Action to join event
  }, []);

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
              <Text style={styles.organizerText}>ORGANIZER</Text>
            </View>
          )}
        </View>
        <View style={styles.eventContent}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <View style={styles.eventDateContainer}>
            <Ionicons name="calendar-outline" size={14} color={Colors.primary} />
            <Text style={styles.eventDateText}>
              {item.date} • {item.time}
            </Text>
          </View>
          
          <View style={styles.eventFooter}>
            <View style={styles.avatarsContainer}>
              {/* Dummy Avatars */}
              {[1, 2, 3].map((_, idx) => (
                <View key={idx} style={[styles.avatar, { zIndex: 3 - idx, marginLeft: idx > 0 ? -12 : 0 }]}>
                  <Ionicons name="person-circle" size={32} color={Colors.textSecondary} />
                </View>
              ))}
              <Text style={styles.othersText}>+{item.participants} others</Text>
            </View>
            <TouchableOpacity style={styles.joinButton} onPress={() => handleJoinEvent(item)} activeOpacity={0.8}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
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
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3234/3234123.png' }} style={styles.logo} />
        <Text style={styles.headerTitle}>EcoPick Events</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Event List */}
      <FlatList
        data={MOCK_EVENTS}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.base }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.base,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: '#0F172A',
  },
  searchButton: {
    padding: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    margin: Spacing.base,
    borderRadius: BorderRadius.lg,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: BorderRadius.md,
  },
  activeTab: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: '#64748B',
  },
  activeTabText: {
    color: '#0F172A',
    fontFamily: Fonts.semiBold,
  },
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: 100, // padding for bottom tab bar
  },
  eventCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    height: 180,
    width: '100%',
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
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  organizerText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  eventContent: {
    padding: Spacing.base,
  },
  eventTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: '#0F172A',
    marginBottom: 6,
  },
  eventDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  eventDateText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: Colors.primary,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  othersText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: '#64748B',
    marginLeft: 8,
  },
  joinButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
  },
  joinButtonText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
});
