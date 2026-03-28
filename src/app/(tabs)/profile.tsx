import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors, Fonts } from '../../constants';
import { useAuthStore } from '@/stores/authStore';
import { useUserInfo } from '@/hooks/useUserQueries';

const DEFAULT_AVATAR = 'https://i.pravatar.cc/150?u=ecopick_default';

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  // Auth & user data
  const storeUser = useAuthStore((s) => s.user);
  const { data: apiUser, isPending: isLoadingUser } = useUserInfo();

  // Ưu tiên data từ API (mới nhất), fallback về store
  const user = apiUser ?? storeUser;

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
              {isLoadingUser ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Image
                  source={{ uri: user?.avatar || DEFAULT_AVATAR }}
                  style={styles.avatarImage}
                />
              )}
            </View>
            <View style={styles.avatarBadge}>
              <Ionicons name="leaf" size={10.5} color={Colors.white} />
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.fullname || user?.email?.split('@')[0] || 'User'}
            </Text>
            <View style={styles.emailRow}>
              <Ionicons name="mail-outline" size={14} color="#64748B" />
              <Text style={styles.emailText}>{user?.email || '—'}</Text>
            </View>
            <View style={styles.roleBadgeMargin}>
              <View style={styles.roleBadge}>
                <Ionicons name="shield-checkmark" size={14.667} color={Colors.primary} />
                <Text style={styles.roleText}>
                  {user?.role?.name ?? 'user'}
                </Text>
              </View>
            </View>
            {user?.is_verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#2D5A3D" />
                <Text style={styles.verifiedText}>Đã xác minh</Text>
              </View>
            )}
          </View>
        </View>

        {/* ─── Stats Grid (from real API data) ─── */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIconRow}>
                <Ionicons name="flag-outline" size={12.75} color={Colors.primary} />
                <Text style={styles.statLabel}>{t('profile.reports')}</Text>
              </View>
              <Text style={styles.statValue}>{user?.total_reports ?? 0}</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconRow}>
                <Ionicons name="calendar-outline" size={16.5} color={Colors.primary} />
                <Text style={styles.statLabel}>{t('profile.cleanups') || 'Events'}</Text>
              </View>
              <Text style={styles.statValue}>{user?.total_events ?? 0}</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIconRow}>
                <Ionicons name="star-outline" size={15} color={Colors.primary} />
                <Text style={styles.statLabel}>{t('profile.ecoPoints')}</Text>
              </View>
              <Text style={styles.statValue}>{user?.eco_points ?? 0}</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconRow}>
                <Ionicons name="leaf-outline" size={12.747} color={Colors.primary} />
                <Text style={styles.statLabel}>Level</Text>
              </View>
              <Text style={styles.statValue}>{user?.level ?? 1}</Text>
            </View>
          </View>
        </View>

        {/* ─── Social Stats ─── */}
        <View style={styles.socialStatsCard}>
          <View style={styles.socialStatItem}>
            <Text style={styles.socialStatValue}>{user?.followers_count ?? 0}</Text>
            <Text style={styles.socialStatLabel}>Followers</Text>
          </View>
          <View style={styles.socialStatDivider} />
          <View style={styles.socialStatItem}>
            <Text style={styles.socialStatValue}>{user?.following_count ?? 0}</Text>
            <Text style={styles.socialStatLabel}>Following</Text>
          </View>
          <View style={styles.socialStatDivider} />
          <View style={styles.socialStatItem}>
            <Text style={styles.socialStatValue}>{user?.total_trees ?? 0}</Text>
            <Text style={styles.socialStatLabel}>Trees</Text>
          </View>
        </View>

        {/* ─── Bio ─── */}
        {user?.bio ? (
          <View style={styles.bioSection}>
            <Text style={styles.sectionTitle}>Bio</Text>
            <View style={styles.bioCard}>
              <Text style={styles.bioText}>{user.bio}</Text>
            </View>
          </View>
        ) : null}

        {/* ─── User Details ─── */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>{t('profile.details') || 'Thông tin'}</Text>
          <View style={styles.detailsCard}>
            {user?.phone_number ? (
              <View style={styles.detailRow}>
                <Ionicons name="call-outline" size={16} color="#64748B" />
                <Text style={styles.detailText}>{user.phone_number}</Text>
              </View>
            ) : null}
            {user?.address ? (
              <View style={styles.detailRow}>
                <Ionicons name="location-outline" size={16} color="#64748B" />
                <Text style={styles.detailText}>{user.address}</Text>
              </View>
            ) : null}
            {user?.date_of_birth ? (
              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={16} color="#64748B" />
                <Text style={styles.detailText}>{user.date_of_birth}</Text>
              </View>
            ) : null}
            {!user?.phone_number && !user?.address && !user?.date_of_birth && (
              <View style={styles.detailRow}>
                <Ionicons name="information-circle-outline" size={16} color="#94A3B8" />
                <Text style={[styles.detailText, { color: '#94A3B8' }]}>
                  Chưa cập nhật thông tin chi tiết
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* ─── Achievements (placeholder – giữ UI cũ) ─── */}
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
    paddingBottom: 120,
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
    gap: 4,
  },
  profileName: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    lineHeight: 32,
    color: '#0F172A',
    letterSpacing: -0.6,
    textAlign: 'center',
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  emailText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
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
    textTransform: 'capitalize',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  verifiedText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: '#2D5A3D',
  },

  // ─── Stats Grid ───
  statsGrid: {
    paddingHorizontal: 16,
    gap: 14,
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

  // ─── Social Stats ───
  socialStatsCard: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(32,105,58,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  socialStatItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  socialStatValue: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    lineHeight: 28,
    color: '#0F172A',
  },
  socialStatLabel: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#64748B',
  },
  socialStatDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(32,105,58,0.1)',
  },

  // ─── Bio ───
  bioSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 12,
  },
  bioCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(32,105,58,0.05)',
  },
  bioText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: '#334155',
  },

  // ─── Details ───
  detailsSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 12,
  },
  detailsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(32,105,58,0.05)',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
    flex: 1,
  },

  // ─── Achievements ───
  achievementsMargin: {
    paddingTop: 24,
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
});
