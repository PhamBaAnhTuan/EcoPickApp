
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts } from '../../../../constants';
import { useTranslation } from 'react-i18next';

interface EventEquipmentProps {
  equipmentList: { name: string; status: 'BRING OWN' | 'PROVIDED' }[];
}

export function EventEquipment({ equipmentList }: EventEquipmentProps) {
  const { t } = useTranslation();

  if (equipmentList.length === 0) return null;

  return (
    <View style={s.equipmentCard}>
      <View style={s.equipmentHeader}>
        <Ionicons name="cube-outline" size={20} color="#0F172A" />
        <Text style={s.sectionTitleText}>{t('eventDetail.equipmentNeeded')}</Text>
      </View>
      <View style={s.equipmentList}>
        {equipmentList.map((item, index) => (
          <View key={index} style={s.equipmentRow}>
            <View style={s.equipmentLeft}>
              <Ionicons
                name={
                  item.name.toLowerCase().includes('water')
                    ? 'water-outline'
                    : item.name.toLowerCase().includes('bag')
                    ? 'bag-outline'
                    : 'hand-left-outline'
                }
                size={20}
                color="#64748B"
              />
              <Text style={s.equipmentName}>{item.name}</Text>
            </View>
            <View
              style={[
                s.equipmentStatus,
                item.status === 'PROVIDED' ? s.statusProvided : s.statusBring,
              ]}
            >
              <Text
                style={[
                  s.equipmentStatusText,
                  item.status === 'PROVIDED' ? s.statusProvidedText : s.statusBringText,
                ]}
              >
                {item.status === 'PROVIDED' ? t('eventDetail.provided') : t('eventDetail.bringOwn')}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  equipmentCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 17,
    gap: 12,
  },
  equipmentHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitleText: { fontFamily: Fonts.bold, fontSize: 16, lineHeight: 24, color: '#0F172A' },
  equipmentList: { gap: 8 },
  equipmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F8F7',
    padding: 8,
    borderRadius: 16,
  },
  equipmentLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  equipmentName: { fontFamily: Fonts.regular, fontSize: 14, lineHeight: 20, color: '#0F172A' },
  equipmentStatus: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  equipmentStatusText: { fontFamily: Fonts.bold, fontSize: 10, lineHeight: 15 },
  statusProvided: { backgroundColor: '#DCFCE7' },
  statusProvidedText: { color: '#15803D' },
  statusBring: { backgroundColor: '#FEF9C3' },
  statusBringText: { color: '#A16207' },
});
