import { Ionicons } from '@expo/vector-icons';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import BottomSheetLib, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BorderRadius, Colors, Fonts, FontSizes, LineHeights, Spacing } from '../../constants';
import type { SeverityLevel, WasteReport } from '../../data/mockData';
import { getWasteTypeConfig } from '../../data/mockData';
import { getSeverityIcon, getSeverityTheme } from '../../utils/severity';
import { StatusBadge } from './StatusBadge';

export interface MarkerPreviewSheetRef {
  show: (report: WasteReport) => void;
  dismiss: () => void;
  expand: () => void;
}

interface MarkerPreviewSheetProps {
  onViewDetails?: (report: WasteReport) => void;
  onGetDirections?: (report: WasteReport) => void;
}

const SEVERITY_LABELS: Record<SeverityLevel, string> = {
  light: 'Light',
  medium: 'Medium',
  heavy: 'Heavy',
  extreme: 'Extreme',
};

const DEFAULT_IMAGE =
  'https://bizweb.dktcdn.net/100/324/808/files/san-pham-co-nguon-goc-thien-nhien.jpg?v=1702028320944';

export const MarkerPreviewSheet = forwardRef<MarkerPreviewSheetRef, MarkerPreviewSheetProps>(
  ({ onViewDetails, onGetDirections }, ref) => {
    const sheetRef = useRef<BottomSheetLib>(null);
    const snapPoints = useMemo(() => ['32%', '72%'], []);
    const [report, setReport] = React.useState<WasteReport | null>(null);
    const [sheetIndex, setSheetIndex] = React.useState(-1);
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      show: (r: WasteReport) => {
        setReport(r);
        sheetRef.current?.snapToIndex(0);
      },
      dismiss: () => {
        sheetRef.current?.close();
      },
      expand: () => {
        sheetRef.current?.snapToIndex(1);
      },
    }));

    const handleSheetChange = useCallback((index: number) => {
      setSheetIndex(index);
    }, []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.2} pressBehavior="close" />
      ),
      [],
    );

    const theme = report ? getSeverityTheme(report.severity) : null;
    const icon = report ? getSeverityIcon(report.severity) : null;
    const isExpanded = sheetIndex >= 1;

    // Format relative time
    const getTimeAgo = useCallback(
      (dateStr: string) => {
        const now = new Date();
        const date = new Date(dateStr);
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHrs = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHrs / 24);

        if (diffDays > 0) return `${diffDays} ${t('time.daysAgo', 'ngày trước')}`;
        if (diffHrs > 0) return `${diffHrs} ${t('time.hoursAgo', 'giờ trước')}`;
        return `${diffMins} ${t('time.minsAgo', 'phút trước')}`;
      },
      [t],
    );

    return (
      <BottomSheetLib
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.sheetBg}
        handleIndicatorStyle={styles.handle}
        onChange={handleSheetChange}
      >
        <BottomSheetScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {report && theme && icon ? (
            <>
              {/* ── Collapsed Preview (always visible) ── */}
              <View style={styles.previewRow}>
                {/* Thumbnail */}
                <View style={styles.thumbWrapper}>
                  <Image source={{ uri: report?.image || DEFAULT_IMAGE }} style={styles.thumbnail} resizeMode="cover" />
                  <View style={[styles.thumbBadge, { backgroundColor: theme.dotColor }]}>
                    <Ionicons name={icon.name as keyof typeof Ionicons.glyphMap} size={12} color="#FFF" />
                  </View>
                </View>

                {/* Info */}
                <View style={styles.previewInfo}>
                  <Text style={styles.previewTitle} numberOfLines={1}>
                    {report.title}
                  </Text>

                  {/* Waste type chips (compact) */}
                  <View style={styles.wasteChipsRow}>
                    {report.wasteTypes.slice(0, 3).map((wt) => {
                      const wtConfig = getWasteTypeConfig(wt);
                      return (
                        <View key={wt} style={[styles.miniChip, { backgroundColor: `${wtConfig.color}12` }]}>
                          <Ionicons
                            name={wtConfig.icon as keyof typeof Ionicons.glyphMap}
                            size={10}
                            color={wtConfig.color}
                          />
                          <Text style={[styles.miniChipText, { color: wtConfig.color }]}>{wtConfig.label}</Text>
                        </View>
                      );
                    })}
                    {report.wasteTypes.length > 3 && (
                      <Text style={styles.moreChipText}>+{report.wasteTypes.length - 3}</Text>
                    )}
                  </View>

                  {/* Meta row */}
                  <View style={styles.metaRow}>
                    <View
                      style={[
                        styles.severityBadge,
                        { backgroundColor: theme.backgroundColor, borderColor: theme.borderColor },
                      ]}
                    >
                      <View style={[styles.severityDot, { backgroundColor: theme.dotColor }]} />
                      <Text style={[styles.severityLabel, { color: theme.textColor }]}>
                        {SEVERITY_LABELS[report.severity]}
                      </Text>
                    </View>
                    {report.distance ? (
                      <View style={styles.metaItem}>
                        <Ionicons name="location-outline" size={11} color={Colors.textSecondary} />
                        <Text style={styles.metaText}>{report.distance}</Text>
                      </View>
                    ) : null}
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={11} color={Colors.textSecondary} />
                      <Text style={styles.metaText}>{getTimeAgo(report.createdAt)}</Text>
                    </View>
                  </View>
                </View>

                {/* Close button */}
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => sheetRef.current?.close()}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Ionicons name="close" size={16} color={Colors.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* ── Expanded Content ── */}
              {isExpanded && (
                <View style={styles.expandedContent}>
                  {/* Large image */}
                  <View style={styles.imageWrapper}>
                    <Image
                      source={{ uri: report?.image || DEFAULT_IMAGE }}
                      style={styles.largeImage}
                      resizeMode="cover"
                    />
                    <StatusBadge status={report.status} />
                  </View>

                  {/* Description */}
                  <Text style={styles.description}>{report.description}</Text>

                  {/* Stats row */}
                  <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                      <Ionicons name="arrow-up-circle-outline" size={16} color={Colors.primary} />
                      <Text style={styles.statValue}>{report.upvotes}</Text>
                      <Text style={styles.statLabel}>{t('marker.upvotes', 'upvotes')}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Ionicons name="chatbubble-outline" size={16} color={Colors.primary} />
                      <Text style={styles.statValue}>{report.comments}</Text>
                      <Text style={styles.statLabel}>{t('marker.comments', 'comments')}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Ionicons name="person-outline" size={16} color={Colors.primary} />
                      <Text style={styles.statValue}>{report.reporterName}</Text>
                    </View>
                  </View>

                  {/* All waste types */}
                  <View style={styles.wasteSection}>
                    <Text style={styles.wasteSectionLabel}>{t('marker.wasteTypes', 'Waste Types')}</Text>
                    <View style={styles.wasteFullRow}>
                      {report.wasteTypes.map((wt) => {
                        const wtConfig = getWasteTypeConfig(wt);
                        return (
                          <View
                            key={wt}
                            style={[
                              styles.wasteFullChip,
                              { backgroundColor: `${wtConfig.color}10`, borderColor: `${wtConfig.color}25` },
                            ]}
                          >
                            <Ionicons
                              name={wtConfig.icon as keyof typeof Ionicons.glyphMap}
                              size={14}
                              color={wtConfig.color}
                            />
                            <Text style={[styles.wasteFullLabel, { color: wtConfig.color }]}>{wtConfig.label}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              )}

              {/* ── Action Buttons (always visible) ── */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.secondaryBtn}
                  onPress={() => report && onViewDetails?.(report)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="document-text-outline" size={18} color={Colors.primary} />
                  <Text style={styles.secondaryBtnText}>{t('marker.viewDetails', 'View Details')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={() => report && onGetDirections?.(report)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="navigate" size={18} color={Colors.white} />
                  <Text style={styles.primaryBtnText}>{t('marker.getDirections', 'Directions')}</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </BottomSheetScrollView>
      </BottomSheetLib>
    );
  },
);

MarkerPreviewSheet.displayName = 'MarkerPreviewSheet';

// ─── Styles ─────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  sheetBg: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 24,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 9999,
    backgroundColor: Colors.divider,
    alignSelf: 'center',
    marginVertical: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
    gap: 16,
  },

  // ── Preview Row (collapsed) ──
  previewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  thumbWrapper: {
    position: 'relative',
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: Colors.background,
  },
  thumbBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: { elevation: 4 },
    }),
  },
  previewInfo: {
    flex: 1,
    gap: 4,
  },
  previewTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    lineHeight: LineHeights.base,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  wasteChipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  miniChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  miniChipText: {
    fontFamily: Fonts.medium,
    fontSize: 9,
  },
  moreChipText: {
    fontFamily: Fonts.medium,
    fontSize: 9,
    color: Colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  severityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  severityLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Expanded Content ──
  expandedContent: {
    gap: 14,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  largeImage: {
    width: '100%',
    height: 180,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    lineHeight: LineHeights.md,
    color: Colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  statLabel: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
  },
  wasteSection: {
    gap: 8,
  },
  wasteSectionLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  wasteFullRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wasteFullChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  wasteFullLabel: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
  },

  // ── Actions ──
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.md,
    paddingVertical: 13,
  },
  secondaryBtnText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.primary,
  },
  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 13,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryBtnText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.white,
  },
});
