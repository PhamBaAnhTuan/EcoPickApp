import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';

import { Fonts, Colors } from '../../../../constants';
import { DIFFICULTIES, EQUIPMENT_OPTIONS } from '../constants';
import { FieldError } from './FieldError';

interface StepSettingsProps {
  t: any;
  control: any;
  errors: any;
  difficulty: string;
  setDifficulty: (d: string) => void;
  selectedEquipment: Set<string>;
  toggleEquipment: (item: string) => void;
}

const DIFF_ICONS: Record<string, { icon: string; color: string; bg: string }> = {
  easy: { icon: 'happy', color: '#22C55E', bg: '#F0FDF4' },
  medium: { icon: 'flash', color: '#F59E0B', bg: '#FFFBEB' },
  hard: { icon: 'flame', color: '#EF4444', bg: '#FEF2F2' },
};

const EQUIP_ICONS: Record<string, string> = {
  Gloves: 'hand-left-outline',
  'Trash bags': 'bag-outline',
  Pickers: 'construct-outline',
  Water: 'water-outline',
  Sunscreen: 'sunny-outline',
  'First aid kit': 'medkit-outline',
};

export function StepSettings({
  t,
  control,
  errors,
  difficulty,
  setDifficulty,
  selectedEquipment,
  toggleEquipment,
}: StepSettingsProps) {
  return (
    <View style={s.container}>
      {/* ─── Difficulty ─── */}
      <View style={s.section}>
        <View style={s.sectionHeader}>
          <View style={s.sectionIconWrap}>
            <Ionicons name="fitness" size={14} color={Colors.primary} />
          </View>
          <Text style={s.sectionTitle}>
            {t('createEvent.settings.difficulty')}
          </Text>
        </View>

        <View style={s.diffRow}>
          {DIFFICULTIES.map((diff) => {
            const isSel = difficulty === diff.id;
            const meta = DIFF_ICONS[diff.id];
            return (
              <TouchableOpacity
                key={diff.id}
                style={[s.diffCard, isSel && { borderColor: meta.color, backgroundColor: meta.bg }]}
                onPress={() => setDifficulty(diff.id)}
                activeOpacity={0.7}
              >
                <View style={[s.diffIco, { backgroundColor: isSel ? meta.color : '#F1F5F9' }]}>
                  <Ionicons
                    name={meta.icon as any}
                    size={22}
                    color={isSel ? '#fff' : '#94A3B8'}
                  />
                </View>
                <Text style={[s.diffText, isSel && { color: meta.color, fontFamily: Fonts.bold }]}>
                  {t(diff.label)}
                </Text>
                {isSel && (
                  <View style={[s.diffCheck, { backgroundColor: meta.color }]}>
                    <Ionicons name="checkmark" size={10} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ─── Participants ─── */}
      <View style={s.section}>
        <View style={s.sectionHeader}>
          <View style={s.sectionIconWrap}>
            <Ionicons name="people" size={14} color={Colors.primary} />
          </View>
          <Text style={s.sectionTitle}>
            {t('createEvent.settings.participants')}
          </Text>
        </View>

        <Controller
          control={control}
          name="maxParticipants"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View style={[s.inputWrap, errors.maxParticipants && s.inputError]}>
                <Ionicons name="people-outline" size={18} color="#94A3B8" />
                <TextInput
                  style={s.input}
                  keyboardType="numeric"
                  placeholder="30"
                  placeholderTextColor="#94A3B8"
                  value={value ? value.toString() : ''}
                  onChangeText={(txt) => onChange(parseInt(txt) || 0)}
                  onBlur={onBlur}
                />
                <Text style={s.inputSuffix}>
                  {t('createEvent.settings.people', { defaultValue: 'people' })}
                </Text>
              </View>
              {errors.maxParticipants && (
                <FieldError message={t(errors.maxParticipants.message as string)} />
              )}
            </>
          )}
        />
      </View>

      {/* ─── Equipment ─── */}
      <View style={s.section}>
        <View style={s.sectionHeader}>
          <View style={s.sectionIconWrap}>
            <Ionicons name="build" size={14} color={Colors.primary} />
          </View>
          <Text style={s.sectionTitle}>
            {t('createEvent.settings.equipment')}
          </Text>
        </View>

        <View style={s.equipGrid}>
          {EQUIPMENT_OPTIONS.map((item) => {
            const isSel = selectedEquipment.has(item);
            const iconName = EQUIP_ICONS[item] || 'ellipse-outline';
            return (
              <TouchableOpacity
                key={item}
                style={[s.equipChip, isSel && s.equipChipSel]}
                onPress={() => toggleEquipment(item)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={iconName as any}
                  size={16}
                  color={isSel ? '#fff' : '#64748B'}
                />
                <Text style={[s.equipText, isSel && s.equipTextSel]}>
                  {t(`createEvent.equipment.${item}`, { defaultValue: item })}
                </Text>
                {isSel && (
                  <Ionicons name="checkmark-circle" size={14} color="rgba(255,255,255,0.8)" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ─── Eco Points ─── */}
      <View style={s.section}>
        <View style={s.sectionHeader}>
          <View style={[s.sectionIconWrap, { backgroundColor: '#FEF9C3' }]}>
            <Ionicons name="leaf" size={14} color="#EAB308" />
          </View>
          <Text style={s.sectionTitle}>
            {t('createEvent.settings.ecoPoints')}
          </Text>
        </View>

        <Controller
          control={control}
          name="ecoPointReward"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View style={[s.ecoWrap, errors.ecoPointReward && s.inputError]}>
                <View style={s.ecoLeaf}>
                  <Ionicons name="leaf" size={16} color="#EAB308" />
                </View>
                <TextInput
                  style={s.input}
                  keyboardType="numeric"
                  placeholder="50"
                  placeholderTextColor="#94A3B8"
                  value={value ? value.toString() : ''}
                  onChangeText={(txt) => onChange(parseInt(txt) || 0)}
                  onBlur={onBlur}
                />
                <Text style={s.inputSuffix}>pts</Text>
              </View>
              {errors.ecoPointReward && (
                <FieldError message={t(errors.ecoPointReward.message as string)} />
              )}
            </>
          )}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 20,
    gap: 4,
  },

  // ─── Section ───
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sectionIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
  },

  // ─── Difficulty ───
  diffRow: {
    flexDirection: 'row',
    gap: 10,
  },
  diffCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E8ECF0',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    gap: 10,
  },
  diffIco: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diffText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: '#64748B',
  },
  diffCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ─── Input ───
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E8ECF0',
    borderRadius: 14,
    paddingHorizontal: 16,
    minHeight: 52,
    gap: 10,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  input: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: '#1E293B',
    paddingVertical: 14,
  },
  inputSuffix: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    color: '#94A3B8',
  },

  // ─── Equipment ───
  equipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  equipChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E8ECF0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 6,
  },
  equipChipSel: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  equipText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: '#475569',
  },
  equipTextSel: {
    color: '#fff',
    fontFamily: Fonts.semiBold,
  },

  // ─── Eco Points ───
  ecoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFEF5',
    borderWidth: 1.5,
    borderColor: '#FEF3C7',
    borderRadius: 14,
    paddingHorizontal: 16,
    minHeight: 52,
    gap: 10,
  },
  ecoLeaf: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FEF9C3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
