import { useBadges, useUserBadges } from '@/hooks/useBadgeQueries';
import { useAuthStore } from '@/stores/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DeviceEventEmitter,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BorderRadius, Colors, FontSizes, Fonts, LineHeights, Spacing } from '../../constants';

// ─── Category key → i18n key mapping ──────────────────────────────────────────
const CATEGORY_ICON: Record<string, string> = {
  event: 'calendar',
  report: 'flag',
  eco: 'leaf',
  social: 'people',
  default: 'ribbon',
};

const CATEGORY_COLOR: Record<string, { color: string; bg: string }> = {
  event: { color: '#7C3AED', bg: 'rgba(124,58,237,0.1)' },
  report: { color: '#DC2626', bg: 'rgba(220,38,38,0.1)' },
  eco: { color: '#16A34A', bg: 'rgba(22,163,74,0.1)' },
  social: { color: '#0891B2', bg: 'rgba(8,145,178,0.1)' },
  default: { color: '#D97706', bg: 'rgba(217,119,6,0.1)' },
};

function getCategoryStyle(category: string) {
  return CATEGORY_COLOR[category] ?? CATEGORY_COLOR.default;
}

function getCategoryIcon(category: string): string {
  return CATEGORY_ICON[category] ?? CATEGORY_ICON.default;
}

// ─── Badge Card ────────────────────────────────────────────────────────────────
interface BadgeCardProps {
  badge: {
    id: string;
    name: string;
    description: string;
    icon_url: string;
    category: string;
  };
  earned: boolean;
  categoryLabel: string;
  onPress: () => void;
}

function BadgeCard({ badge, earned, categoryLabel, onPress }: BadgeCardProps) {
  const style = getCategoryStyle(badge.category);
  const icon = getCategoryIcon(badge.category);

  return (
    <TouchableOpacity
      style={[styles.badgeCard, !earned && styles.badgeCardLocked]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Badge icon */}
      <View style={[styles.badgeIconWrap, { backgroundColor: earned ? style.bg : 'rgba(194, 213, 240, 0.1)' }]}>
        {badge.icon_url ? (
          <Image
            source={{ uri: badge.icon_url }}
            style={[styles.badgeIcon, !earned && styles.badgeIconLocked]}
            resizeMode="contain"
          />
        ) : (
          <Ionicons
            name={(icon as any)}
            size={36}
            color={earned ? style.color : '#CBD5E1'}
          />
        )}
        {!earned && (
          <View style={styles.lockOverlay}>
            <Ionicons name="lock-closed" size={14} color="#94A3B8" />
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.badgeInfo}>
        <View style={styles.badgeTopRow}>
          <Text style={[styles.badgeName, !earned && styles.badgeNameLocked]} numberOfLines={1}>
            {badge.name}
          </Text>
          <View style={[styles.categoryPill, { backgroundColor: earned ? style.bg : 'rgba(148,163,184,0.08)' }]}>
            <Text style={[styles.categoryPillText, { color: earned ? style.color : '#94A3B8' }]}>
              {categoryLabel}
            </Text>
          </View>
        </View>
        <Text style={styles.badgeDesc} numberOfLines={2}>
          {badge.description}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={16} color={earned ? '#CBD5E1' : '#E2E8F0'} />
    </TouchableOpacity >
  );
}

// ─── Skeleton loader ───────────────────────────────────────────────────────────
function BadgeSkeleton() {
  return (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonIcon} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonLine} />
        <View style={[styles.skeletonLine, { width: '70%', marginTop: 8 }]} />
      </View>
    </View>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────────────────
export default function BadgesScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const userId = useAuthStore((s) => s.user?.id);

  const {
    data: allBadges = [],
    isLoading: loadingBadges,
    refetch: refetchBadges,
    isRefetching,
  } = useBadges();

  const { data: userBadges = [], isLoading: loadingUserBadges } = useUserBadges(
    userId ? { user_id: userId } : undefined,
  );
  // console.log('userBadges', userBadges);

  const earnedBadgeIds = useMemo(
    () => new Set(userBadges.map((ub) => ub.badge_id)),
    [userBadges],
  );

  const earnedCount = earnedBadgeIds.size;
  const totalCount = allBadges.length;
  const progress = totalCount > 0 ? earnedCount / totalCount : 0;

  const sortedBadges = useMemo(() => {
    const earned = allBadges.filter((b) => earnedBadgeIds.has(b.id));
    const locked = allBadges.filter((b) => !earnedBadgeIds.has(b.id));
    return { earned, locked };
  }, [allBadges, earnedBadgeIds]);

  const isLoading = loadingBadges || loadingUserBadges;

  // Helper: get category label via i18n
  const getCategoryLabel = (category: string): string => {
    const key = Object.keys(CATEGORY_COLOR).includes(category) ? category : 'default';
    return t(`badges.category.${key}` as any);
  };

  const flatListRef = useRef<ScrollView>(null);

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener('tabPress_badges', () => {
      flatListRef.current?.scrollTo({ y: 0, animated: true });
    });
    return () => sub.remove();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* ─── Header ─── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('badges.title')}</Text>
        <View style={styles.headerBadgeCount}>
          <Ionicons name="trophy" size={14} color={Colors.primary} />
          <Text style={styles.headerBadgeCountText}>
            {t('badges.headerCount', { earned: earnedCount, total: totalCount })}
          </Text>
        </View>
      </View>

      <ScrollView
        ref={flatListRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetchBadges}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      >
        {/* ─── Progress Banner ─── */}
        <View style={styles.progressBanner}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>{t('badges.progressTitle')}</Text>
              <Text style={styles.progressSub}>
                {t('badges.progressSub', { count: earnedCount })}
              </Text>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercent}>
                {totalCount > 0 ? Math.round(progress * 100) : 0}%
              </Text>
            </View>
          </View>

          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>

          <View style={styles.progressStats}>
            <View style={styles.progressStatItem}>
              <Ionicons name="checkmark-circle" size={14} color="#16A34A" />
              <Text style={styles.progressStatText}>
                {earnedCount} {t('badges.earnedLabel')}
              </Text>
            </View>
            <View style={styles.progressStatItem}>
              <Ionicons name="lock-closed" size={14} color="#94A3B8" />
              <Text style={[styles.progressStatText, { color: '#94A3B8' }]}>
                {totalCount - earnedCount} {t('badges.lockedLabel')}
              </Text>
            </View>
          </View>
        </View>

        {/* ─── Badge List ─── */}
        {isLoading ? (
          <View style={styles.sectionBlock}>
            {[...Array(6)].map((_, i) => (
              <BadgeSkeleton key={i} />
            ))}
          </View>
        ) : allBadges.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="trophy-outline" size={56} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>{t('badges.emptyTitle')}</Text>
            <Text style={styles.emptyDesc}>{t('badges.emptyDesc')}</Text>
          </View>
        ) : (
          <>
            {/* Earned section */}
            {sortedBadges.earned.length > 0 && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                  <Text style={styles.sectionTitle}>{t('badges.earnedSection')}</Text>
                  <View style={styles.sectionCountPill}>
                    <Text style={styles.sectionCountText}>{sortedBadges.earned.length}</Text>
                  </View>
                </View>
                {sortedBadges.earned.map((badge) => (
                  <BadgeCard
                    key={badge.id}
                    badge={badge}
                    earned
                    categoryLabel={getCategoryLabel(badge.category)}
                    onPress={() => router.push(`/badges/${badge.id}`)}
                  />
                ))}
              </View>
            )}

            {/* Locked section */}
            {sortedBadges.locked.length > 0 && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="lock-closed" size={16} color="#565e69" />
                  <Text style={[styles.sectionTitle, { color: '#565e69' }]}>
                    {t('badges.lockedSection')}
                  </Text>
                  <View style={[styles.sectionCountPill, { backgroundColor: 'rgba(148,163,184,0.12)' }]}>
                    <Text style={[styles.sectionCountText, { color: '#565e69' }]}>
                      {sortedBadges.locked.length}
                    </Text>
                  </View>
                </View>
                {sortedBadges.locked.map((badge) => (
                  <BadgeCard
                    key={badge.id}
                    badge={badge}
                    earned={false}
                    categoryLabel={getCategoryLabel(badge.category)}
                    onPress={() => router.push(`/badges/${badge.id}`)}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
    backgroundColor: 'rgba(246,248,247,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryBorder,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xl,
    lineHeight: LineHeights.lg,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerBadgeCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  headerBadgeCountText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    color: Colors.primary,
  },
  scrollContent: {
    paddingBottom: 110,
    gap: Spacing.base,
  },
  progressBanner: {
    marginHorizontal: Spacing.base,
    marginTop: Spacing.base,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: { elevation: 2 },
    }),
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  progressSub: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  progressCircle: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(32,105,58,0.15)',
  },
  progressPercent: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.primary,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: 'rgba(32,105,58,0.08)',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
  },
  progressStats: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  progressStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  progressStatText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: '#16A34A',
  },
  sectionBlock: {
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    flex: 1,
    letterSpacing: -0.3,
  },
  sectionCountPill: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  sectionCountText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.xs,
    color: Colors.primary,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: { elevation: 1 },
    }),
  },
  badgeCardLocked: {
    backgroundColor: '#FAFBFC',
    borderColor: Colors.border,
    opacity: 0.85,
  },
  badgeIconWrap: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexShrink: 0,
  },
  badgeIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  badgeIconLocked: {
    opacity: 0.35,
  },
  lockOverlay: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeInfo: {
    flex: 1,
    gap: 5,
  },
  badgeTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeName: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    flexShrink: 1,
    letterSpacing: -0.2,
  },
  badgeNameLocked: {
    color: Colors.textSecondary,
  },
  categoryPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    flexShrink: 0,
  },
  categoryPillText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.xs,
  },
  badgeDesc: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
    color: Colors.textSecondary,
  },
  skeletonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  skeletonIcon: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.md,
    backgroundColor: '#F1F5F9',
  },
  skeletonContent: {
    flex: 1,
    gap: 8,
  },
  skeletonLine: {
    height: 14,
    width: '85%',
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
    gap: 12,
  },
  emptyTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: Colors.textSecondary,
    letterSpacing: -0.4,
  },
  emptyDesc: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    lineHeight: LineHeights.md,
    color: Colors.textPlaceholder,
    textAlign: 'center',
  },
});
