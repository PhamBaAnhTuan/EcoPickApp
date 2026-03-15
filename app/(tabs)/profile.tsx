import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Colors, Fonts, BorderRadius, Spacing } from '../../constants';

// URLs corresponding to images and icons in the design
const mockCover = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Eco Profile</Text>
        <TouchableOpacity style={styles.headerSettingsBtn} activeOpacity={0.7}>
          <Ionicons name="settings-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Info Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarBorder}>
              {/* Dummy avatar url */}
              <Image source={{ uri: "https://i.pravatar.cc/150?u=a042581f4e29026704d" }} style={styles.avatarImage} />
            </View>
            <View style={styles.avatarBadge}>
              <Ionicons name="leaf" size={12} color={Colors.white} />
            </View>
          </View>

          <Text style={styles.profileName}>Alex Green</Text>
          
          <View style={styles.roleBadge}>
            <Ionicons name="shield-checkmark" size={14} color={Colors.primary} />
            <Text style={styles.roleText}>Forest Guardian</Text>
          </View>
          
          <Text style={styles.memberSince}>Member since March 2023</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIconRow}>
              <Ionicons name="flag-outline" size={16} color={Colors.primary} />
              <Text style={styles.statLabel}>REPORTS</Text>
            </View>
            <Text style={styles.statValue}>15</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconRow}>
              <Ionicons name="trash-bin-outline" size={16} color={Colors.primary} />
              <Text style={styles.statLabel}>CLEANUPS</Text>
            </View>
            <Text style={styles.statValue}>8</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconRow}>
              <Ionicons name="star-outline" size={16} color={Colors.primary} />
              <Text style={styles.statLabel}>ECO POINTS</Text>
            </View>
            <Text style={styles.statValue}>450</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconRow}>
              <Ionicons name="leaf-outline" size={16} color={Colors.primary} />
              <Text style={styles.statLabel}>IMPACT</Text>
            </View>
            <Text style={styles.statValue}>120kg</Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.badgesRow}>
            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: '#FEF9C3' }]}>
                <Ionicons name="ribbon" size={24} color="#EAB308" />
              </View>
              <Text style={styles.badgeText}>First Clean</Text>
            </View>
            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: 'rgba(32,105,58,0.2)' }]}>
                <Ionicons name="leaf" size={24} color={Colors.primary} />
              </View>
              <Text style={styles.badgeText}>Soil Hero</Text>
            </View>
            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: '#F1F5F9' }]}>
                <Ionicons name="water-outline" size={24} color="#94A3B8" />
              </View>
              <Text style={styles.badgeTextLight}>Locked</Text>
            </View>
            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: '#F1F5F9' }]}>
                <Ionicons name="people-outline" size={24} color="#94A3B8" />
              </View>
              <Text style={styles.badgeTextLight}>Locked</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.timelineContainer}>
            {/* Activity 1 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLine} />
              <View style={[styles.timelineDot, { backgroundColor: Colors.primary }]} />
              
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Reported illegal dumping</Text>
                <Text style={styles.activityTime}>Today at 10:45 AM • Oakwood Park</Text>
                <Image source={{ uri: mockCover }} style={styles.activityImage} />
              </View>
            </View>

            {/* Activity 2 */}
            <View style={[styles.timelineItem, { paddingBottom: 0 }]}>
              <View style={[styles.timelineDot, { backgroundColor: 'rgba(32,105,58,0.4)' }]} />
              
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Organized community cleanup</Text>
                <Text style={styles.activityTime}>2 days ago • Riverside Area</Text>
                <Text style={styles.activityPoints}>+50 Eco Points earned</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: 12,
    backgroundColor: 'rgba(246,248,247,0.8)',
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: '#0F172A',
  },
  headerSettingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(32,105,58,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarBorder: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    borderWidth: 4,
    borderColor: '#F6F8F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: '#0F172A',
    marginBottom: 4,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(32,105,58,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    marginBottom: 8,
  },
  roleText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.primary,
  },
  memberSince: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#64748B',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: Spacing.base,
    marginBottom: 32,
  },
  statCard: {
    width: 'calc(50% - 8px)' as any, // React Native handles percentages in flex layouts nicely but we can do flex: 1 for rows. Let's adapt this.
    flexBasis: '47%',
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(32,105,58,0.05)',
  },
  statIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statLabel: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: '#0F172A',
  },
  achievementsSection: {
    paddingHorizontal: Spacing.base,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: '#0F172A',
    marginBottom: 16, // using margin bottom inside section container for Recent Activity
  },
  viewAllText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.primary,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(32,105,58,0.05)',
  },
  badgeItem: {
    alignItems: 'center',
    gap: 8,
  },
  badgeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: Fonts.semiBold,
    fontSize: 10,
    color: '#0F172A',
  },
  badgeTextLight: {
    fontFamily: Fonts.semiBold,
    fontSize: 10,
    color: '#94A3B8',
  },
  activitySection: {
    paddingHorizontal: Spacing.base,
  },
  timelineContainer: {
    paddingLeft: 8,
  },
  timelineItem: {
    position: 'relative',
    paddingLeft: 26,
    paddingBottom: 24,
  },
  timelineLine: {
    position: 'absolute',
    left: 7,
    top: 16,
    bottom: -16,
    width: 2,
    backgroundColor: 'rgba(32,105,58,0.2)',
  },
  timelineDot: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#F6F8F7',
    zIndex: 2,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 2,
    lineHeight: 20,
  },
  activityTime: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  activityImage: {
    width: '100%',
    height: 102,
    borderRadius: 16,
    marginTop: 8,
  },
  activityPoints: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.primary,
    marginTop: 2,
  },
});
