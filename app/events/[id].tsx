import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Colors, Fonts, FontSizes, BorderRadius, Spacing } from '../../constants';
import { MOCK_EVENTS } from '../../data/mockData';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const event = MOCK_EVENTS.find((e) => e.id === id) || MOCK_EVENTS[0];
  const [joined, setJoined] = useState(false);

  const handleOpenMaps = () => {
    // Navigate to the main Map tab and pass the destination coordinates 
    // to trigger the in-app routing calculation
    const destLat = event.latitude || 37.7749;
    const destLng = event.longitude || -122.4194;
    const destTitle = event.title;

    router.push({
      pathname: '/(tabs)/map',
      params: { 
        destLat: destLat.toString(), 
        destLng: destLng.toString(), 
        destTitle 
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{event.title}</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Ionicons name="share-social-outline" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: event.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop' }} style={styles.coverImage} />
          
          {event.distance && (
            <View style={styles.routeBadge}>
              <Ionicons name="git-network-outline" size={14} color={Colors.white} />
              <Text style={styles.routeText}>{event.distance}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.openMapsBtn} activeOpacity={0.8} onPress={handleOpenMaps}>
            <Ionicons name="open-outline" size={14} color={Colors.primary} />
            <Text style={styles.openMapsText}>Open Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          {/* Main Title & Type */}
          <View style={styles.typeRow}>
            <Ionicons name="home-outline" size={16} color={Colors.primary} />
            <Text style={styles.typeText}>{event.type || 'Community Event'}</Text>
          </View>
          <Text style={styles.title}>{event.title}</Text>
          
          <Text style={styles.description}>
            {event.description || `Help us restore the natural beauty of the area. We'll be collecting plastic waste and contributing to a greener environment.`}
          </Text>

          {/* Date & Time Row */}
          <View style={styles.dateTimeRow}>
            <View style={styles.dateTimeBox}>
              <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
              <View>
                <Text style={styles.dateTimeLabel}>Date</Text>
                <Text style={styles.dateTimeValue}>{event.date}</Text>
              </View>
            </View>
            <View style={styles.dateTimeBox}>
              <Ionicons name="time-outline" size={20} color={Colors.primary} />
              <View>
                <Text style={styles.dateTimeLabel}>Time</Text>
                <Text style={styles.dateTimeValue}>{event.time}</Text>
              </View>
            </View>
          </View>

          {/* Participants */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="people-outline" size={20} color="#0F172A" />
              <Text style={styles.sectionTitleText}>Participants ({event.participants})</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.participantsRow}>
            <View style={styles.avatarsContainer}>
              {[1, 2, 3, 4].map((_, idx) => (
                <View key={idx} style={[styles.avatar, { zIndex: 4 - idx, marginLeft: idx > 0 ? -12 : 0 }]}>
                  <Ionicons name="person-circle" size={32} color={Colors.textSecondary} />
                </View>
              ))}
              <View style={[styles.avatarTextContainer, { zIndex: 0, marginLeft: -12 }]}>
                <Text style={styles.avatarText}>+{event.participants > 4 ? event.participants - 4 : 0}</Text>
              </View>
            </View>
            <View style={styles.rsvpContainer}>
              <Text style={styles.rsvpLabel}>RSVP STATUS</Text>
              <Text style={styles.rsvpValue}>{event.confirmedCount || 8} Confirmed</Text>
            </View>
          </View>

          {/* Equipment */}
          {(event.equipment && event.equipment.length > 0) && (
             <View style={styles.equipmentCard}>
               <View style={[styles.sectionTitleRow, { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }]}>
                 <Ionicons name="cube-outline" size={20} color="#0F172A" />
                 <Text style={styles.sectionTitleText}>Equipment Needed</Text>
               </View>
               {event.equipment.map((item, index) => (
                 <View key={index} style={styles.equipmentRow}>
                   <View style={styles.equipmentLeft}>
                     <Ionicons 
                       name={item.name.toLowerCase().includes('water') ? 'water-outline' : item.name.toLowerCase().includes('bag') ? 'bag-outline' : 'hand-left-outline'} 
                       size={20} 
                       color="#64748B" 
                     />
                     <Text style={styles.equipmentName}>{item.name}</Text>
                   </View>
                   <View style={[styles.equipmentStatus, item.status === 'PROVIDED' ? styles.statusProvided : styles.statusBring]}>
                     <Text style={[styles.equipmentStatusText, item.status === 'PROVIDED' ? styles.statusProvidedText : styles.statusBringText]}>
                       {item.status}
                     </Text>
                   </View>
                 </View>
               ))}
               <View style={{ height: 8 }} />
             </View>
          )}

          {/* Coordination (Dummy) */}
          <View style={[styles.sectionHeader, { marginTop: 24 }]}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="chatbubbles-outline" size={20} color="#0F172A" />
              <Text style={styles.sectionTitleText}>Coordination</Text>
            </View>
            <Text style={styles.newMessagesText}>3 new messages</Text>
          </View>
          
          <View style={styles.messageBox}>
            <View style={styles.avatar}>
              <Ionicons name="person-circle" size={32} color={Colors.textSecondary} />
            </View>
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageAuthor}>Mark T.</Text>
                <Text style={styles.messageTime}>10:24 AM</Text>
              </View>
              <Text style={styles.messageText}>{"I'll bring an extra pair of grabbers if anyone needs them!"}</Text>
            </View>
          </View>

          {/* Placeholder for sending message */}
          <View style={styles.sendInputBox}>
            <Text style={styles.sendPlaceholder}>Post an update...</Text>
            <View style={styles.sendIconBox}>
              <Ionicons name="paper-plane" size={14} color={Colors.white} />
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Floating Join Button */}
      <View style={[styles.bottomBar, { paddingBottom: Platform.OS === 'ios' ? 24 : 16 }]}>
        <TouchableOpacity 
          style={[styles.mainJoinButton, joined && styles.joinedButton]} 
          onPress={() => setJoined(!joined)} 
          activeOpacity={0.8}
        >
          <Ionicons name={joined ? "checkmark-circle" : "person-add-outline"} size={20} color={Colors.white} />
          <Text style={styles.mainJoinButtonText}>{joined ? "Joined" : "Join Event"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB', // very light gray mostly seen in typical apps
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  headerBtn: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: '#0F172A',
    flex: 1,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120, // space for bottom button
  },
  coverContainer: {
    width: '100%',
    height: 240,
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  routeBadge: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    gap: 6,
  },
  routeText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  openMapsBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  openMapsText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.primary,
  },
  detailsContainer: {
    padding: Spacing.base,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  typeText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.primary,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: '#0F172A',
    marginBottom: 12,
    lineHeight: 32,
  },
  description: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 24,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  dateTimeBox: {
    flex: 1,
    backgroundColor: '#F1F5F9', // subtle gray
    padding: 16,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateTimeLabel: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  dateTimeValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#0F172A',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitleText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#0F172A',
  },
  viewAllText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.primary,
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarTextContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    color: '#475569',
  },
  rsvpContainer: {
    alignItems: 'flex-end',
  },
  rsvpLabel: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    color: '#64748B',
    marginBottom: 4,
  },
  rsvpValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.primary,
  },
  equipmentCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 32,
  },
  equipmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  equipmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  equipmentName: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: '#334155',
  },
  equipmentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  equipmentStatusText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
  },
  statusProvided: {
    backgroundColor: '#DCFCE7',
  },
  statusProvidedText: {
    color: '#166534',
    fontFamily: Fonts.bold,
    fontSize: 10,
  },
  statusBring: {
    backgroundColor: '#FEF9C3',
  },
  statusBringText: {
    color: '#854D0E',
    fontFamily: Fonts.bold,
    fontSize: 10,
  },
  newMessagesText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: '#64748B',
  },
  messageBox: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderRadius: BorderRadius.lg,
    marginBottom: 16,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  messageAuthor: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#0F172A',
  },
  messageTime: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: '#94A3B8',
  },
  messageText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  sendInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F5F9',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sendPlaceholder: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: '#94A3B8',
  },
  sendIconBox: {
    backgroundColor: Colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.base,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  mainJoinButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: BorderRadius.lg,
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
    color: Colors.white,
  },
});
