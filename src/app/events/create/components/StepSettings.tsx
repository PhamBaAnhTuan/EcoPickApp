import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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

const ICON_CHOICES = [
  'hammer-outline',
  'flashlight-outline',
  'shirt-outline',
  'umbrella-outline',
  'nutrition-outline',
  'glasses-outline',
  'thermometer-outline',
  'bandage-outline',
  'briefcase-outline',
  'cut-outline',
  'map-outline',
  'megaphone-outline',
] as const;

const StepSettings =({
  t,
  control,
  errors,
  difficulty,
  setDifficulty,
  selectedEquipment,
  toggleEquipment,
}: StepSettingsProps)=> {
  const [showAddModal, setShowAddModal] = useState(false);
  const [customLabel, setCustomLabel] = useState('');
  const [customIcon, setCustomIcon] = useState('hammer-outline');
  const [customEquipItems, setCustomEquipItems] = useState<
    { label: string; icon: string }[]
  >([]);

  const handleAddCustom = () => {
    const trimmed = customLabel.trim();
    if (!trimmed) return;
    setCustomEquipItems((prev) => [...prev, { label: trimmed, icon: customIcon }]);
    toggleEquipment(trimmed);
    setCustomLabel('');
    setCustomIcon('hammer-outline');
    setShowAddModal(false);
  };

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

          {/* Custom equipment items */}
          {customEquipItems.map((item) => {
            const isSel = selectedEquipment.has(item.label);
            return (
              <TouchableOpacity
                key={item.label}
                style={[s.equipChip, isSel && s.equipChipSel]}
                onPress={() => toggleEquipment(item.label)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.icon as any}
                  size={16}
                  color={isSel ? '#fff' : '#64748B'}
                />
                <Text style={[s.equipText, isSel && s.equipTextSel]}>
                  {item.label}
                </Text>
                {isSel && (
                  <Ionicons name="checkmark-circle" size={14} color="rgba(255,255,255,0.8)" />
                )}
              </TouchableOpacity>
            );
          })}

          {/* Add custom button */}
          <TouchableOpacity
            style={s.addEquipBtn}
            onPress={() => setShowAddModal(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle-outline" size={16} color={Colors.primary} />
            <Text style={s.addEquipText}>
              {t('createEvent.equipment.addCustom', { defaultValue: 'Add' })}
            </Text>
          </TouchableOpacity>
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

      {/* ─── Add Custom Equipment Modal ─── */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <TouchableWithoutFeedback onPress={() => setShowAddModal(false)}>
            <View style={s.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={s.modalSheet}>
                  {/* Handle bar */}
                  <View style={s.modalHandle} />

                  <Text style={s.modalTitle}>
                    {t('createEvent.equipment.addTitle', { defaultValue: 'Add Equipment' })}
                  </Text>

                  {/* Label input */}
                  <View style={s.modalBody}>
                    <Text style={s.modalInputLabel}>
                      {t('createEvent.equipment.name', { defaultValue: 'Name' })}
                    </Text>
                    <View style={s.modalInputWrap}>
                      <Ionicons name={customIcon as any} size={18} color={Colors.primary} />
                      <TextInput
                        style={s.modalInput}
                        placeholder={t('createEvent.equipment.namePlaceholder', {
                          defaultValue: 'e.g. Bucket, Rope...',
                        })}
                        placeholderTextColor="#94A3B8"
                        value={customLabel}
                        onChangeText={setCustomLabel}
                        autoFocus
                        maxLength={24}
                      />
                    </View>

                    {/* Icon picker */}
                    <Text style={[s.modalInputLabel, { marginTop: 20 }]}>
                      {t('createEvent.equipment.icon', { defaultValue: 'Icon' })}
                    </Text>
                    <View style={s.iconGrid}>
                      {ICON_CHOICES.map((ico) => {
                        const sel = customIcon === ico;
                        return (
                          <TouchableOpacity
                            key={ico}
                            style={[s.iconOption, sel && s.iconOptionSel]}
                            onPress={() => setCustomIcon(ico)}
                            activeOpacity={0.7}
                          >
                            <Ionicons
                              name={ico as any}
                              size={20}
                              color={sel ? '#fff' : '#64748B'}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    {/* Action buttons */}
                    <View style={s.modalActions}>
                      <TouchableOpacity
                        style={s.modalCancelBtn}
                        onPress={() => setShowAddModal(false)}
                        activeOpacity={0.7}
                      >
                        <Text style={s.modalCancelText}>{t('common.cancel')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[s.modalAddBtn, !customLabel.trim() && { opacity: 0.4 }]}
                        onPress={handleAddCustom}
                        activeOpacity={0.8}
                        disabled={!customLabel.trim()}
                      >
                        <Ionicons name="add" size={18} color="#fff" />
                        <Text style={s.modalAddText}>
                          {t('createEvent.equipment.addBtn', { defaultValue: 'Add' })}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
export default StepSettings;
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

  // ─── Add custom button ───
  addEquipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(32,105,58,0.04)',
  },
  addEquipText: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    color: Colors.primary,
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

  // ─── Modal ───
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  modalInputLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  modalInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E8ECF0',
    borderRadius: 14,
    paddingHorizontal: 14,
    gap: 10,
  },
  modalInput: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: '#1E293B',
    paddingVertical: 14,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  iconOption: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E8ECF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOptionSel: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalCancelBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
  },
  modalCancelText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: '#64748B',
  },
  modalAddBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Colors.primary,
  },
  modalAddText: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: '#fff',
  },
});
