import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fonts } from '../../../constants';

interface SuccessActionsProps {
  onViewMap: () => void;
}

export default function SuccessActions({ onViewMap }: SuccessActionsProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.primaryBtn} onPress={onViewMap} activeOpacity={0.8}>
        <Ionicons name="map-outline" size={20} color="#1E293B" />
        <Text style={styles.primaryBtnText}>{t('reportSuccess.viewOnMap')}</Text>
      </TouchableOpacity>
<<<<<<< HEAD
=======

      {/* <TouchableOpacity style={styles.secondaryBtn} onPress={onExplore} activeOpacity={0.7}>
        <Text style={styles.secondaryBtnText}>{t('reportSuccess.continueExploring')}</Text>
        <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
      </TouchableOpacity> */}
>>>>>>> ce8a48819a99962c1633e8a700deffdbc01c3c94
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    width: '100%',
    gap: 20,
  },
  primaryBtn: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 32,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#1E293B',
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  secondaryBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
