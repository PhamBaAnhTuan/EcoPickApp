import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Platform, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Colors, Fonts, FontSizes, Spacing, BorderRadius } from '../../constants';
import { MOCK_REPORTS, SeverityLevel } from '../../data/mockData';
import { getSeverityTheme } from '../../utils/severity';
import { formatDistanceInfo } from '../../utils/distance';
import { useTranslation } from 'react-i18next';

const SEVERITY_LABELS: Record<SeverityLevel, string> = {
  light: 'Light',
  medium: 'Medium',
  heavy: 'Heavy',
  extreme: 'Extreme',
};

export default function LocationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  const report = MOCK_REPORTS.find(r => r.id === id) || MOCK_REPORTS[0];
  const severityTheme = getSeverityTheme(report.severity);
  const severityLabel = t(`severity.${report.severity}`);

  // Compute real distance from user location
  const [distanceText, setDistanceText] = useState(report.distance);

  useEffect(() => {
    (async () => {
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
    })();
  }, [report.latitude, report.longitude]);

  const handleNavigate = () => {
    // Navigate to the main Map tab and pass the destination coordinates 
    // to trigger the in-app routing calculation
    const destLat = report.latitude;
    const destLng = report.longitude;
    const destTitle = report.title;

    router.push({
      pathname: '/(tabs)/map',
      params: { 
        destLat: destLat.toString(), 
        destLng: destLng.toString(), 
        destTitle 
      }
    });
  };

  if (!report) {
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('location.detailsTitle')}</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Ionicons name="share-social-outline" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800' }} 
            style={styles.heroImage} 
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <Ionicons name="location-outline" size={16} color={Colors.white} />
            <Text style={styles.imageOverlayText}>Riverside Recreation Trail</Text>
          </View>
        </View>

        {/* Title and Severity */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{report.title}</Text>
            <View style={[styles.severityBadge, { backgroundColor: severityTheme.backgroundColor, borderColor: severityTheme.borderColor }]}>
              <Ionicons name="warning-outline" size={14} color={severityTheme.textColor} />
              <Text style={[styles.severityText, { color: severityTheme.textColor }]}>{severityLabel?.toUpperCase()}</Text>
            </View>
          </View>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="navigate-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{distanceText}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{t('location.reportedAgo')}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.navigateBtn} activeOpacity={0.8} onPress={handleNavigate}>
            <Ionicons name="navigate" size={20} color={Colors.white} />
            <Text style={styles.navigateText}>{t('location.navigate')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.eventBtn} activeOpacity={0.8}>
            <Ionicons name="calendar-outline" size={20} color={Colors.white} />
            <Text style={styles.eventText}>{t('location.createEvent')}</Text>
          </TouchableOpacity>
        </View>

        {/* Status History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('location.statusHistory')}</Text>
          <View style={styles.timeline}>
            <View style={styles.timelineLine} />

            <View style={styles.timelineItem}>
              <View style={[styles.timelineIconWrapper, { backgroundColor: Colors.primary }]}>
                <Ionicons name="checkmark" size={16} color={Colors.white} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>{t('location.reported')}</Text>
                <Text style={styles.timelineDesc}>{t('location.reportedDesc')}</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineIconWrapper, { backgroundColor: '#E2E8F0' }]}>
                <Ionicons name="eye-outline" size={16} color={Colors.textSecondary} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>{t('location.underReview')}</Text>
                <Text style={styles.timelineDesc}>{t('location.underReviewDesc')}</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineIconWrapper, { backgroundColor: '#E2E8F0' }]}>
                <Ionicons name="leaf-outline" size={16} color={Colors.textSecondary} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>{t('location.cleaned')}</Text>
                <Text style={styles.timelineDesc}>{t('location.cleanedDesc')}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('location.description')}</Text>
          <Text style={styles.description}>
            {report.description}. {t('location.descriptionExtra')}
          </Text>
        </View>

        {/* Comments */}
        <View style={styles.section}>
          <View style={styles.commentsHeader}>
            <Text style={styles.sectionTitle}>{t('location.comments', { count: 3 })}</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>{t('common.viewAll')}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.commentItem}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} style={styles.avatar} />
            <View style={styles.commentBubble}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>Mark Henderson</Text>
                <Text style={styles.commentTime}>1H AGO</Text>
              </View>
              <Text style={styles.commentText}>
                &quot;I&apos;m in the area tomorrow morning if anyone wants to join for a quick sweep!&quot;
              </Text>
            </View>
          </View>

          {/* Comment Input */}
          <View style={styles.commentInputRow}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?u=eco' }} style={styles.avatar} />
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder={t('location.addComment')}
                placeholderTextColor={Colors.textInactive}
              />
              <TouchableOpacity style={styles.sendBtn}>
                <Ionicons name="send" size={18} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontFamily: Fonts.medium,
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  backBtn: {
    padding: 12,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  backBtnText: {
    color: Colors.white,
    fontFamily: Fonts.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  headerBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  heroContainer: {
    margin: Spacing.base,
    borderRadius: 16,
    overflow: 'hidden',
    height: 320,
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
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
  titleSection: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontFamily: Fonts.bold,
    fontSize: 24,
    lineHeight: 30,
    color: Colors.textPrimary,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  severityText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
    marginBottom: 32,
  },
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
  navigateText: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    fontSize: FontSizes.md,
  },
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
  eventText: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    fontSize: FontSizes.md,
  },
  section: {
    paddingHorizontal: Spacing.base,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  timeline: {
    paddingLeft: 12,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 27,
    width: 2,
    backgroundColor: '#E2E8F0',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 16,
  },
  timelineIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 4,
  },
  timelineTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  timelineDesc: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  viewAllText: {
    fontFamily: Fonts.bold,
    color: Colors.primary,
    fontSize: FontSizes.sm,
  },
  commentItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  commentBubble: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 16,
    borderTopLeftRadius: 4,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthor: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  commentTime: {
    fontFamily: Fonts.medium,
    fontSize: 10,
    color: Colors.textInactive,
  },
  commentText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 40,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  sendBtn: {
    padding: 4,
  },
});
