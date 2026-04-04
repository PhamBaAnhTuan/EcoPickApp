import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BorderRadius, Colors, Fonts, FontSizes, LineHeights } from '../constants';
import { getWasteTypeConfig, WasteReport } from '../data/mockData';
import { getSeverityIcon, getSeverityTheme } from '../utils/severity';

interface ReportCardProps {
  report: WasteReport;
  onNavigate?: () => void;
  onView?: () => void;
}

export function ReportCard({ report, onNavigate, onView }: ReportCardProps) {
  const icon = getSeverityIcon(report.severity);
  const theme = getSeverityTheme(report.severity);
  const isPrimary = report.severity === 'heavy' || report.severity === 'extreme';
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={isPrimary ? onNavigate : onView}>
      {/* Left: Icon or Thumbnail */}
      {report.image ? (
        <View style={styles.thumbWrapper}>
          <Image source={{ uri: report.image }} style={styles.thumbnail} resizeMode="cover" />
          <View style={[styles.thumbBadge, { backgroundColor: theme.dotColor }]}>
            <Ionicons name={icon.name as keyof typeof Ionicons.glyphMap} size={10} color="#FFF" />
          </View>
        </View>
      ) : (
        <View style={[styles.iconContainer, { backgroundColor: icon.bgColor }]}>
          <Ionicons name={icon.name as keyof typeof Ionicons.glyphMap} size={18} color={theme.dotColor} />
        </View>
      )}

      {/* Center: Text content */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {report.title}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {report.description}
        </Text>

        {/* Waste type mini chips */}
        {report.wasteTypes && report.wasteTypes.length > 0 && (
          <View style={styles.wasteChipsRow}>
            {report.wasteTypes.slice(0, 3).map((wt) => {
              const wtConfig = getWasteTypeConfig(wt);
              return (
                <View key={wt} style={[styles.miniChip, { backgroundColor: `${wtConfig.color}10` }]}>
                  <Ionicons name={wtConfig.icon as keyof typeof Ionicons.glyphMap} size={9} color={wtConfig.color} />
                  <Text style={[styles.miniChipText, { color: wtConfig.color }]}>{wtConfig.label}</Text>
                </View>
              );
            })}
            {report.wasteTypes.length > 3 && <Text style={styles.moreText}>+{report.wasteTypes.length - 3}</Text>}
          </View>
        )}

        {/* Distance badge */}
        {report.distance ? (
          <View style={styles.distanceBadge}>
            <Ionicons name="bicycle-outline" size={12} color={Colors.textSecondary} />
            <Text style={styles.distanceText}>{report.distance}</Text>
          </View>
        ) : null}
      </View>

      {/* Right: Action button */}
      <TouchableOpacity
        style={[styles.actionButton, isPrimary ? styles.actionButtonPrimary : styles.actionButtonSecondary]}
        onPress={isPrimary ? onNavigate : onView}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isPrimary ? 'navigate' : 'eye-outline'}
          size={14}
          color={isPrimary ? Colors.white : Colors.primary}
        />
        <Text style={[styles.actionText, isPrimary ? styles.actionTextPrimary : styles.actionTextSecondary]}>
          {isPrimary ? t('reportCard.navigate') : t('reportCard.view')}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: 12,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbWrapper: {
    position: 'relative',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
  },
  thumbBadge: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    lineHeight: LineHeights.md,
    color: Colors.textPrimary,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  wasteChipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  miniChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  miniChipText: {
    fontFamily: Fonts.medium,
    fontSize: 9,
  },
  moreText: {
    fontFamily: Fonts.medium,
    fontSize: 9,
    color: Colors.textSecondary,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 4,
  },
  distanceText: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  actionButton: {
    borderRadius: BorderRadius.md,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    minWidth: 100,
    gap: 3,
  },
  actionButtonPrimary: {
    backgroundColor: Colors.primary,
  },
  actionButtonSecondary: {
    backgroundColor: Colors.primaryLight,
  },
  actionText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xs,
    lineHeight: LineHeights.xs,
    textAlign: 'center',
  },
  actionTextPrimary: {
    color: Colors.white,
  },
  actionTextSecondary: {
    color: Colors.primary,
  },
});
