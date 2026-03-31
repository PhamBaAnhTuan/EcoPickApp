
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts } from '../../../../constants';
import { useTranslation } from 'react-i18next';
import { CHAT_AVATAR } from '../constants';

export function EventChat() {
  const { t } = useTranslation();

  return (
    <View style={s.chatSection}>
      <View style={s.sectionHeader}>
        <View style={s.sectionTitleRow}>
          <Ionicons name="chatbubbles-outline" size={20} color="#0F172A" />
          <Text style={s.sectionTitleText}>{t('eventDetail.coordination')}</Text>
        </View>
        <Text style={s.newMessagesText}>{t('eventDetail.newMessages', { count: 3 })}</Text>
      </View>

      <View style={s.chatMessages}>
        {/* Message from other user — left aligned */}
        <View style={s.chatRowLeft}>
          <Image source={{ uri: CHAT_AVATAR }} style={s.chatAvatar} />
          <View style={s.chatBubbleLeft}>
            <View style={s.chatBubbleHeader}>
              <Text style={s.chatAuthor}>Mark T.</Text>
              <Text style={s.chatTime}>10:24 AM</Text>
            </View>
            <Text style={s.chatText}>
              {"I'll bring an extra pair of grabbers if anyone needs them!"}
            </Text>
          </View>
        </View>

        {/* Message from you — right aligned */}
        <View style={s.chatRowRight}>
          <View style={s.chatBubbleRight}>
            <View style={s.chatBubbleHeaderRight}>
              <Text style={s.chatTimeRight}>10:30 AM</Text>
              <Text style={s.chatOrganizer}>{t('common.organizer')}</Text>
            </View>
            <Text style={s.chatTextRight}>That would be great, Mark! Thanks.</Text>
          </View>
          <View style={s.youBadge}>
            <Text style={s.youBadgeText}>{t('common.you')}</Text>
          </View>
        </View>
      </View>

      {/* Send Input */}
      <View style={s.sendInputContainer}>
        <View style={s.sendInputBox}>
          <TextInput
            style={s.sendInput}
            placeholder={t('eventDetail.postUpdate')}
            placeholderTextColor="#6B7280"
          />
        </View>
        <TouchableOpacity style={s.sendIconBox}>
          <Ionicons name="paper-plane" size={14} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  chatSection: { gap: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitleText: { fontFamily: Fonts.bold, fontSize: 16, lineHeight: 24, color: '#0F172A' },
  newMessagesText: { fontFamily: Fonts.regular, fontSize: 12, lineHeight: 16, color: '#64748B' },
  chatMessages: { gap: 12 },
  chatRowLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  chatAvatar: { width: 32, height: 32, borderRadius: 9999 },
  chatBubbleLeft: {
    flex: 1,
    backgroundColor: 'rgba(32,105,58,0.05)',
    padding: 12,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderTopLeftRadius: 0,
    gap: 4,
  },
  chatBubbleHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chatAuthor: { fontFamily: Fonts.bold, fontSize: 12, lineHeight: 16, color: '#0F172A' },
  chatTime: { fontFamily: Fonts.regular, fontSize: 10, lineHeight: 15, color: '#94A3B8' },
  chatText: { fontFamily: Fonts.regular, fontSize: 14, lineHeight: 20, color: '#0F172A' },
  chatRowRight: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  chatBubbleRight: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderTopLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderTopRightRadius: 0,
    gap: 4,
  },
  chatBubbleHeaderRight: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chatTimeRight: { fontFamily: Fonts.regular, fontSize: 10, lineHeight: 15, color: '#94A3B8' },
  chatOrganizer: { fontFamily: Fonts.bold, fontSize: 12, lineHeight: 16, color: '#20693A', textAlign: 'right' },
  chatTextRight: { fontFamily: Fonts.regular, fontSize: 14, lineHeight: 20, color: '#0F172A', textAlign: 'right' },
  youBadge: { width: 32, height: 32, borderRadius: 9999, backgroundColor: '#20693A', alignItems: 'center', justifyContent: 'center' },
  youBadgeText: { fontFamily: Fonts.bold, fontSize: 10, lineHeight: 15, color: Colors.white, textAlign: 'center' },
  sendInputContainer: { position: 'relative' },
  sendInputBox: { backgroundColor: '#F1F5F9', borderRadius: 9999, paddingLeft: 20, paddingRight: 48, overflow: 'hidden' },
  sendInput: { fontFamily: Fonts.regular, fontSize: 14, color: '#0F172A', height: 46 },
  sendIconBox: { position: 'absolute', right: 8, top: 6, backgroundColor: '#20693A', width: 36, height: 36, borderRadius: 9999, alignItems: 'center', justifyContent: 'center' },
});
