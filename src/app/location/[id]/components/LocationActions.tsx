
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, Spacing, BorderRadius } from '../../../../constants';
import { useTranslation } from 'react-i18next';

interface LocationActionsProps {
  onNavigate: () => void;
  onCreateEvent: () => void;
}

const LocationActions = ({ onNavigate, onCreateEvent }: LocationActionsProps) => {
  const { t } = useTranslation();

  return (
    <View style={s.actionRow}>
      <TouchableOpacity style={s.navigateBtn} activeOpacity={0.8} onPress={onNavigate}>
        <Ionicons name="navigate" size={20} color={Colors.white} />
        <Text style={s.navigateText}>{t('location.navigate')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.eventBtn} activeOpacity={0.8} onPress={onCreateEvent}>
        <Ionicons name="calendar-outline" size={20} color={Colors.white} />
        <Text style={s.eventText}>{t('location.createEvent')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LocationActions;

const s = StyleSheet.create({
  actionRow: { flexDirection: 'row', paddingHorizontal: Spacing.base, gap: Spacing.sm, marginBottom: 32 },
  navigateBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    gap: 8,
  },
  navigateText: { fontFamily: Fonts.bold, color: Colors.white, fontSize: FontSizes.md },
  eventBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    gap: 8,
  },
  eventText: { fontFamily: Fonts.bold, color: Colors.white, fontSize: FontSizes.md },
});
