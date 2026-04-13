import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Fonts, Spacing } from '../../../constants';

<<<<<<< HEAD
export default function PointsCard({ points }: { points: number }) {
=======
interface PointsCardProps {
  ecoPoints: number;
  level: number;
}

export default function PointsCard({ ecoPoints, level }: PointsCardProps) {
>>>>>>> ce8a48819a99962c1633e8a700deffdbc01c3c94
  const { t } = useTranslation();

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardLabel}>{t('reportSuccess.totalEcoPoints')}</Text>
      <View style={styles.cardScoreRow}>
<<<<<<< HEAD
        <Text style={styles.cardScore}>{points | 0}</Text>
=======
        <Text style={styles.cardScore}>{ecoPoints ?? 0}</Text>
      </View>
      <Text style={styles.cardLabel}>{t('reportSuccess.level')}</Text>
      <View style={styles.cardScoreRow}>
        <Text style={styles.cardScore}>{level ?? 0}</Text>
>>>>>>> ce8a48819a99962c1633e8a700deffdbc01c3c94
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 40,
  },
  cardLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  cardScore: {
    fontFamily: Fonts.bold,
    fontSize: 48,
    color: '#FFFFFF',
  },
  cardTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardTrendText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#34D399',
  },
});
