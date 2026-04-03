
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, Spacing } from '../../../../constants';
import { useTranslation } from 'react-i18next';

const LocationComments = () => {
  const { t } = useTranslation();

  return (
    <View style={s.section}>
      <View style={s.commentsHeader}>
        <Text style={s.sectionTitle}>{t('location.comments', { count: 3 })}</Text>
        <TouchableOpacity>
          <Text style={s.viewAllText}>{t('common.viewAll')}</Text>
        </TouchableOpacity>
      </View>

      <View style={s.commentItem}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} style={s.avatar} />
        <View style={s.commentBubble}>
          <View style={s.commentHeader}>
            <Text style={s.commentAuthor}>Mark Henderson</Text>
            <Text style={s.commentTime}>1H AGO</Text>
          </View>
          <Text style={s.commentText}>
            &quot;I&apos;m in the area tomorrow morning if anyone wants to join for a quick sweep!&quot;
          </Text>
        </View>
      </View>

      <View style={s.commentInputRow}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?u=eco' }} style={s.avatar} />
        <View style={s.inputContainer}>
          <TextInput
            style={s.input}
            placeholder={t('location.addComment')}
            placeholderTextColor={Colors.textInactive}
          />
          <TouchableOpacity style={s.sendBtn}>
            <Ionicons name="send" size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LocationComments;

const s = StyleSheet.create({
  section: { paddingHorizontal: Spacing.base, marginBottom: 32 },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: 18, color: Colors.textPrimary, marginBottom: 16 },
  commentsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  viewAllText: { fontFamily: Fonts.bold, color: Colors.primary, fontSize: FontSizes.sm },
  commentItem: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E2E8F0' },
  commentBubble: { flex: 1, backgroundColor: '#F8FAFC', padding: 12, borderRadius: 16, borderTopLeftRadius: 4 },
  commentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  commentAuthor: { fontFamily: Fonts.bold, fontSize: FontSizes.sm, color: Colors.textPrimary },
  commentTime: { fontFamily: Fonts.medium, fontSize: 10, color: Colors.textInactive },
  commentText: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.textSecondary, lineHeight: 20 },
  commentInputRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  inputContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 20, paddingHorizontal: 16 },
  input: { flex: 1, height: 40, fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.textPrimary },
  sendBtn: { padding: 4 },
});
