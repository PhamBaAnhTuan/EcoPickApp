import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Fonts, Spacing } from '../../../constants';

export default function PointsCard() {
  const { t } = useTranslation();

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardLabel}>{t('reportSuccess.totalEcoPoints')}</Text>
      <View style={styles.cardScoreRow}>
        <Text style={styles.cardScore}>450</Text>
        <View style={styles.cardTrend}>
          <Ionicons name="trending-up" size={16} color="#34D399" />
          <Text style={styles.cardTrendText}>+10%</Text>
        </View>
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
