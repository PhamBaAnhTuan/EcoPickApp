import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, LineHeights, BorderRadius, Spacing } from '../constants';
import { WasteReport } from '../data/mockData';
import { getSeverityIcon } from '../utils/severity';
import { useTranslation } from 'react-i18next';

interface ReportCardProps {
  report: WasteReport;
  onNavigate?: () => void;
  onView?: () => void;
}

export function ReportCard({ report, onNavigate, onView }: ReportCardProps) {
  const icon = getSeverityIcon(report.severity);
  const isPrimary = report.severity === 'heavy' || report.severity === 'extreme';
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: icon.bgColor }]}>
        <Ionicons
          name={icon.name as keyof typeof Ionicons.glyphMap}
          size={18}
          color={
            report.severity === 'heavy'
              ? '#EF4444'
              : report.severity === 'medium'
                ? '#EAB308'
                : report.severity === 'extreme'
                  ? '#9333EA'
                  : '#16A34A'
          }
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{report.title}</Text>
        <View style={styles.descriptionRow}>
          <Text style={styles.description} numberOfLines={1}>
            {report.description}
          </Text>
          <View style={styles.distanceBadge}>
            <Ionicons name="bicycle-outline" size={12} color={Colors.textSecondary} />
            <Text style={styles.distanceText}>{report.distance}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.actionButton, isPrimary ? styles.actionButtonPrimary : styles.actionButtonSecondary]}
        onPress={isPrimary ? onNavigate : onView}
        activeOpacity={0.7}
      >
        <Text style={[styles.actionText, isPrimary ? styles.actionTextPrimary : styles.actionTextSecondary]}>
          {isPrimary ? t('reportCard.navigate') : t('reportCard.view')}
        </Text>
      </TouchableOpacity>
    </View>
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
    padding: 13,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
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
  descriptionRow: {
    marginTop: 2,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonPrimary: {
    backgroundColor: Colors.primary,
  },
  actionButtonSecondary: {
    backgroundColor: Colors.primaryLight,
  },
  actionText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
    textAlign: 'center',
  },
  actionTextPrimary: {
    color: Colors.white,
  },
  actionTextSecondary: {
    color: Colors.primary,
  },
});
