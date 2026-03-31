
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
