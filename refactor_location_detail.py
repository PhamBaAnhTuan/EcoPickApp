import os

source_file = 'src/app/location/[id].tsx'

hero_tsx = """
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing } from '../../../../constants';

export function LocationHero() {
  return (
    <View style={s.heroContainer}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800',
        }}
        style={s.heroImage}
        resizeMode="cover"
      />
      <View style={s.imageOverlay}>
        <Ionicons name="location-outline" size={16} color={Colors.white} />
        <Text style={s.imageOverlayText}>Riverside Recreation Trail</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  heroContainer: {
    margin: Spacing.base,
    borderRadius: 16,
    overflow: 'hidden',
    height: 320,
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  heroImage: { width: '100%', height: '100%' },
  imageOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  imageOverlayText: {
    fontFamily: Fonts.medium,
    color: Colors.white,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
"""

title_tsx = """
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, Spacing } from '../../../../constants';
import { useTranslation } from 'react-i18next';

interface LocationTitleProps {
  reportTitle: string;
  severityLabel: string;
  severityTheme: { backgroundColor: string; borderColor: string; textColor: string };
  distanceText: string;
}

export function LocationTitle({ reportTitle, severityLabel, severityTheme, distanceText }: LocationTitleProps) {
  const { t } = useTranslation();

  return (
    <View style={s.titleSection}>
      <View style={s.titleRow}>
        <Text style={s.title}>{reportTitle}</Text>
        <View
          style={[
            s.severityBadge,
            { backgroundColor: severityTheme.backgroundColor, borderColor: severityTheme.borderColor },
          ]}
        >
          <Ionicons name="warning-outline" size={14} color={severityTheme.textColor} />
          <Text style={[s.severityText, { color: severityTheme.textColor }]}>
            {severityLabel?.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={s.metaRow}>
        <View style={s.metaItem}>
          <Ionicons name="navigate-outline" size={16} color={Colors.textSecondary} />
          <Text style={s.metaText}>{distanceText}</Text>
        </View>
        <View style={s.metaItem}>
          <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
          <Text style={s.metaText}>{t('location.reportedAgo')}</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  titleSection: { paddingHorizontal: Spacing.base, marginBottom: Spacing.lg },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 },
  title: { flex: 1, fontFamily: Fonts.bold, fontSize: 24, lineHeight: 30, color: Colors.textPrimary },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  severityText: { fontFamily: Fonts.bold, fontSize: 10, letterSpacing: 0.5 },
  metaRow: { flexDirection: 'row', gap: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.textSecondary },
});
"""

actions_tsx = """
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, Spacing, BorderRadius } from '../../../../constants';
import { useTranslation } from 'react-i18next';

interface LocationActionsProps {
  onNavigate: () => void;
  onCreateEvent: () => void;
}

export function LocationActions({ onNavigate, onCreateEvent }: LocationActionsProps) {
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
"""

history_tsx = """
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, Spacing } from '../../../../constants';
import { useTranslation } from 'react-i18next';

export function LocationHistory() {
  const { t } = useTranslation();

  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{t('location.statusHistory')}</Text>
      <View style={s.timeline}>
        <View style={s.timelineLine} />

        <View style={s.timelineItem}>
          <View style={[s.timelineIconWrapper, { backgroundColor: Colors.primary }]}>
            <Ionicons name="checkmark" size={16} color={Colors.white} />
          </View>
          <View style={s.timelineContent}>
            <Text style={s.timelineTitle}>{t('location.reported')}</Text>
            <Text style={s.timelineDesc}>{t('location.reportedDesc')}</Text>
          </View>
        </View>

        <View style={s.timelineItem}>
          <View style={[s.timelineIconWrapper, { backgroundColor: '#E2E8F0' }]}>
            <Ionicons name="eye-outline" size={16} color={Colors.textSecondary} />
          </View>
          <View style={s.timelineContent}>
            <Text style={s.timelineTitle}>{t('location.underReview')}</Text>
            <Text style={s.timelineDesc}>{t('location.underReviewDesc')}</Text>
          </View>
        </View>

        <View style={s.timelineItem}>
          <View style={[s.timelineIconWrapper, { backgroundColor: '#E2E8F0' }]}>
            <Ionicons name="leaf-outline" size={16} color={Colors.textSecondary} />
          </View>
          <View style={s.timelineContent}>
            <Text style={s.timelineTitle}>{t('location.cleaned')}</Text>
            <Text style={s.timelineDesc}>{t('location.cleanedDesc')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  section: { paddingHorizontal: Spacing.base, marginBottom: 32 },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: 18, color: Colors.textPrimary, marginBottom: 16 },
  timeline: { paddingLeft: 12, position: 'relative' },
  timelineLine: { position: 'absolute', top: 20, bottom: 20, left: 27, width: 2, backgroundColor: '#E2E8F0' },
  timelineItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 24, gap: 16 },
  timelineIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  timelineContent: { flex: 1, paddingTop: 4 },
  timelineTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.md, color: Colors.textPrimary, marginBottom: 2 },
  timelineDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.textSecondary },
});
"""

description_tsx = """
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, FontSizes, Spacing } from '../../../../constants';
import { useTranslation } from 'react-i18next';

interface LocationDescriptionProps {
  description?: string;
}

export function LocationDescription({ description }: LocationDescriptionProps) {
  const { t } = useTranslation();

  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{t('location.description')}</Text>
      <Text style={s.description}>
        {description}. {t('location.descriptionExtra')}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  section: { paddingHorizontal: Spacing.base, marginBottom: 32 },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: 18, color: Colors.textPrimary, marginBottom: 16 },
  description: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
});
"""

comments_tsx = """
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, Spacing } from '../../../../constants';
import { useTranslation } from 'react-i18next';

export function LocationComments() {
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
"""

index_wrapper_tsx = """
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Fonts, FontSizes, Spacing } from '../../../constants';
import { SeverityLevel } from '../../../data/mockData';
import { useReport } from '../../../hooks/useReportQueries';
import { formatDistanceInfo } from '../../../utils/distance';
import { getSeverityTheme } from '../../../utils/severity';

import { LocationHero } from './components/LocationHero';
import { LocationTitle } from './components/LocationTitle';
import { LocationActions } from './components/LocationActions';
import { LocationHistory } from './components/LocationHistory';
import { LocationDescription } from './components/LocationDescription';
import { LocationComments } from './components/LocationComments';

const API_SEVERITY_TO_UI: Record<string, SeverityLevel> = {
  low: 'light',
  medium: 'medium',
  high: 'heavy',
  critical: 'extreme',
};

export default function LocationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  const { data: report, isLoading, isError } = useReport(id as string);

  const severity: SeverityLevel = API_SEVERITY_TO_UI[report?.severity || 'low'] || 'light';
  const severityTheme = getSeverityTheme(severity);
  const severityLabel = t(`severity.${severity}`);
  const reportTitle = report?.location || report?.address || `Report #${(id as string)?.slice(0, 6)}`;

  // Compute real distance from user location
  const [distanceText, setDistanceText] = useState('Đang tính...');

  useEffect(() => {
    if (!report) return;
    const checkLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        const location = await Location.getCurrentPositionAsync({});
        const info = formatDistanceInfo(
          location.coords.latitude,
          location.coords.longitude,
          report.latitude,
          report.longitude,
        );
        setDistanceText(info);
      } catch (e) {
        console.log('Error computing distance:', e);
      }
    };
    checkLocation();
  }, [report]);

  const handleNavigate = () => {
    if (!report) return;
    const destLat = report.latitude;
    const destLng = report.longitude;
    const destTitle = reportTitle;

    router.push({
      pathname: '/(tabs)/map',
      params: {
        destLat: destLat.toString(),
        destLng: destLng.toString(),
        destTitle,
      },
    });
  };

  const handleCreateEvent = () => {
    if (!report) return;
    router.dismiss();
    setTimeout(() => {
      router.push({
        pathname: '/events/create',
        params: {
          latitude: report.latitude.toString(),
          longitude: report.longitude.toString(),
          location: report.location || report.address || reportTitle,
          address: report.address || '',
          reportId: id as string,
        },
      });
    }, 100);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('location.detailsTitle')}</Text>
          <View style={styles.headerBtn} />
        </View>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loaderText}>{t('common.loading') || 'Loading...'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !report) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('location.reportNotFound')}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>{t('common.goBack')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('location.detailsTitle')}</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Ionicons name="share-social-outline" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <LocationHero />
          
          <LocationTitle 
            reportTitle={reportTitle} 
            severityLabel={severityLabel} 
            severityTheme={severityTheme} 
            distanceText={distanceText} 
          />
          
          <LocationActions 
            onNavigate={handleNavigate} 
            onCreateEvent={handleCreateEvent} 
          />
          
          <LocationHistory />
          
          <LocationDescription description={report.description} />
          
          <LocationComments />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.white, paddingTop: Platform.OS === 'android' ? 24 : 0 },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { fontFamily: Fonts.medium, fontSize: 18, color: Colors.textSecondary, marginBottom: 16 },
  backBtn: { padding: 12, backgroundColor: Colors.primary, borderRadius: 8 },
  backBtnText: { color: Colors.white, fontFamily: Fonts.medium },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  headerBtn: { padding: 4 },
  headerTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.md, color: Colors.textPrimary },
  container: { flex: 1 },
  contentContainer: { paddingBottom: 40 },
  loaderContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loaderText: { marginTop: 12, color: Colors.textSecondary },
});
"""

with open('src/app/location/[id]/components/LocationHero.tsx', 'w') as f:
    f.write(hero_tsx)

with open('src/app/location/[id]/components/LocationTitle.tsx', 'w') as f:
    f.write(title_tsx)

with open('src/app/location/[id]/components/LocationActions.tsx', 'w') as f:
    f.write(actions_tsx)

with open('src/app/location/[id]/components/LocationHistory.tsx', 'w') as f:
    f.write(history_tsx)

with open('src/app/location/[id]/components/LocationDescription.tsx', 'w') as f:
    f.write(description_tsx)

with open('src/app/location/[id]/components/LocationComments.tsx', 'w') as f:
    f.write(comments_tsx)

with open('src/app/location/[id]/index.tsx', 'w') as f:
    f.write(index_wrapper_tsx)

os.remove(source_file)
