import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors, Fonts, BorderRadius, Spacing } from '../../constants';

const mockCover = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop';

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('profile.title')}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerSettingsBtn}
            activeOpacity={0.7}
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ─── Profile Info Section ─── */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarBorder}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
                style={styles.avatarImage}
              />
            </View>
            <View style={styles.avatarBadge}>
              <Ionicons name="leaf" size={10.5} color={Colors.white} />
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{t('profile.name')}</Text>
            <View style={styles.roleBadgeMargin}>
              <View style={styles.roleBadge}>
                <Ionicons name="shield-checkmark" size={14.667} color={Colors.primary} />
                <Text style={styles.roleText}>{t('profile.role')}</Text>
              </View>
            </View>
            <View style={styles.memberSinceMargin}>
              <Text style={styles.memberSince}>{t('profile.memberSince')}</Text>
            </View>
          </View>
        </View>

        {/* ─── Stats Grid ─── */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIconRow}>
                <Ionicons name="flag-outline" size={12.75} color={Colors.primary} />
                <Text style={styles.statLabel}>{t('profile.reports')}</Text>
              </View>
              <Text style={styles.statValue}>15</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconRow}>
                <Ionicons name="trash-bin-outline" size={16.5} color={Colors.primary} />
                <Text style={styles.statLabel}>{t('profile.cleanups')}</Text>
              </View>
              <Text style={styles.statValue}>8</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIconRow}>
                <Ionicons name="star-outline" size={15} color={Colors.primary} />
                <Text style={styles.statLabel}>{t('profile.ecoPoints')}</Text>
              </View>
              <Text style={styles.statValue}>450</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconRow}>
                <Ionicons name="leaf-outline" size={12.747} color={Colors.primary} />
                <Text style={styles.statLabel}>{t('profile.impact')}</Text>
              </View>
              <Text style={styles.statValue}>120kg</Text>
            </View>
          </View>
        </View>

        {/* ─── Achievements ─── */}
        <View style={styles.achievementsMargin}>
          <View style={styles.achievementsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('profile.achievements')}</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>{t('common.viewAll')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.badgesRow}>
              <View style={styles.badgeItem}>
                <View style={[styles.badgeCircle, { backgroundColor: '#FEF9C3' }]}>
                  <Ionicons name="ribbon" size={20} color="#EAB308" />
                </View>
                <Text style={styles.badgeText}>{t('profile.firstClean')}</Text>
              </View>
              <View style={styles.badgeItem}>
                <View style={[styles.badgeCircle, { backgroundColor: 'rgba(32,105,58,0.2)' }]}>
                  <Ionicons name="leaf" size={23.75} color={Colors.primary} />
                </View>
                <Text style={styles.badgeText}>{t('profile.soilHero')}</Text>
              </View>
              <View style={styles.badgeItem}>
                <View style={[styles.badgeCircle, { backgroundColor: '#F1F5F9' }]}>
                  <Ionicons name="water-outline" size={20} color="#94A3B8" />
                </View>
                <Text style={styles.badgeTextLight}>{t('profile.locked')}</Text>
              </View>
              <View style={styles.badgeItem}>
                <View style={[styles.badgeCircle, { backgroundColor: '#F1F5F9' }]}>
                  <Ionicons name="people-outline" size={20} color="#94A3B8" />
                </View>
                <Text style={styles.badgeTextLight}>{t('profile.locked')}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ─── Recent Activity ─── */}
        <View style={styles.activityMargin}>
          <View style={styles.activitySection}>
            <Text style={styles.sectionTitle}>{t('profile.recentActivity')}</Text>

            <View style={styles.timelineContainer}>
              {/* Activity 1 */}
              <View style={styles.timelineItem}>
                {/* Vertical border line */}
                <View style={styles.timelineLine} />
                {/* Dot with ring */}
                <View style={styles.timelineDotWrapper}>
                  <View style={[styles.timelineDot, { backgroundColor: Colors.primary }]} />
                </View>

                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{t('profile.reportedDumping')}</Text>
                  <Text style={styles.activityTime}>{t('profile.dumpingTime')}</Text>
                  <Image source={{ uri: mockCover }} style={styles.activityImage} />
                </View>
              </View>

              {/* Activity 2 */}
              <View style={styles.timelineItem}>
                <View style={styles.timelineLine} />
                <View style={styles.timelineDotWrapper}>
                  <View style={[styles.timelineDot, { backgroundColor: 'rgba(32,105,58,0.4)' }]} />
                </View>

                <View style={[styles.activityContent, { paddingBottom: 16 }]}>
                  <Text style={styles.activityTitle}>{t('profile.organizedCleanup')}</Text>
                  <Text style={styles.activityTime}>{t('profile.cleanupTime')}</Text>
                  <View style={styles.activityPointsMargin}>
                    <Text style={styles.activityPoints}>{t('profile.pointsEarned')}</Text>
                  </View>
                </View>
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

  // ─── Header ───
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(246,248,247,0.8)',
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    lineHeight: 25,
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  headerRight: {
    width: 48,
    alignItems: 'flex-end',
  },
  headerSettingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: 'rgba(32,105,58,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // ─── Profile Section ───
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarBorder: {
    width: 128,
    height: 128,
    borderRadius: 9999,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 8,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: '#20693A',
    borderWidth: 4,
    borderColor: '#F6F8F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    lineHeight: 32,
    color: '#0F172A',
    letterSpacing: -0.6,
    textAlign: 'center',
  },
  roleBadgeMargin: {
    paddingTop: 4,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(32,105,58,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  roleText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: '#20693A',
    textAlign: 'center',
  },
  memberSinceMargin: {
    paddingTop: 8,
  },
  memberSince: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
    textAlign: 'center',
  },

  // ─── Stats Grid ───
  statsGrid: {
    paddingHorizontal: 16,
    gap: 14,
    marginBottom: 0,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 17,
    borderWidth: 1,
    borderColor: 'rgba(32,105,58,0.05)',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#20693A',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    lineHeight: 32,
    color: '#0F172A',
  },

  // ─── Achievements ───
  achievementsMargin: {
    paddingTop: 32,
  },
  achievementsSection: {
    paddingHorizontal: 16,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    lineHeight: 28,
    color: '#0F172A',
    letterSpacing: -0.45,
  },
  viewAllText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: '#20693A',
    textAlign: 'center',
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 17,
    borderWidth: 1,
    borderColor: 'rgba(32,105,58,0.05)',
    gap: 16,
  },
  badgeItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  badgeCircle: {
    width: 56,
    height: 56,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: Fonts.semiBold,
    fontSize: 10,
    lineHeight: 10,
    color: '#0F172A',
    textAlign: 'center',
  },
  badgeTextLight: {
    fontFamily: Fonts.semiBold,
    fontSize: 10,
    lineHeight: 10,
    color: '#94A3B8',
    textAlign: 'center',
  },

  // ─── Recent Activity ───
  activityMargin: {
    paddingTop: 32,
  },
  activitySection: {
    paddingHorizontal: 16,
    gap: 16,
  },
  timelineContainer: {
    paddingLeft: 8,
    gap: 16,
  },
  timelineItem: {
    position: 'relative',
    paddingLeft: 26,
  },
  timelineLine: {
    position: 'absolute',
    left: -1,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(32,105,58,0.2)',
  },
  timelineDotWrapper: {
    position: 'absolute',
    left: -9,
    top: 0,
    zIndex: 2,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 9999,
    // Ring effect using shadow (simulates box-shadow 0 0 0 4px)
    shadowColor: '#F6F8F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
    borderWidth: 4,
    borderColor: '#F6F8F7',
  },
  activityContent: {
    flex: 1,
    gap: 2,
  },
  activityTitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    color: '#0F172A',
  },
  activityTime: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: '#64748B',
  },
  activityImage: {
    width: '100%',
    height: 102,
    borderRadius: 16,
    marginTop: 2,
  },
  activityPointsMargin: {
    paddingTop: 2,
  },
  activityPoints: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#20693A',
  },
});
