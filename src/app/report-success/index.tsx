import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fonts, Spacing } from '../../constants';

import { SafeAreaView } from 'react-native-safe-area-context';
import { reportService } from '../../api/services/reportService';
import { useUpdateUser } from '../../hooks/useUserQueries';
import { useAuthStore } from '../../stores/authStore';
import PointsCard from './components/PointsCard';
import SuccessActions from './components/SuccessActions';
import SuccessGraphic from './components/SuccessGraphic';

const { width } = Dimensions.get('window');

export default function ReportSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ reportId?: string; latitude?: string; longitude?: string }>();
  const { t } = useTranslation();

  const user = useAuthStore(s => s.user);
  const updateUserStore = useAuthStore(s => s.updateUser);
  const updateUserMutation = useUpdateUser();
  const hasAwardedRef = useRef(false);

  useEffect(() => {
    const awardPoints = async () => {
      if (!user?.id || hasAwardedRef.current) return;
      hasAwardedRef.current = true;

      try {
        const userReports = await reportService.getAll({ reporter_id: user.id });
        const totalReports = userReports.length;

        const newEcoPoints = (user.eco_points || 0) + 10;
        const newLevel = (user.level || 0) + 1;

        await updateUserMutation.mutateAsync({
          id: user.id,
          payload: {
            eco_points: newEcoPoints,
            level: newLevel,
            total_reports: totalReports,
          }
        });

        updateUserStore({
          eco_points: newEcoPoints,
          level: newLevel,
          total_reports: totalReports,
        });
      } catch (error) {
        console.error("Failed to award eco points:", error);
      }
    };

    awardPoints();
  }, [user?.id]);

  const handleViewOnMap = () => {
    if (params.latitude && params.longitude) {
      router.replace({
        pathname: '/map',
        params: {
          destLat: params.latitude,
          destLng: params.longitude,
          destTitle: 'Your Report',
        },
      });
    } else {
      router.replace('/map');
    }
  };

  const handleContinueExploring = () => {
    router.replace('/map');
  };

  const handleClose = () => {
    router.replace('/map');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1F7155', '#094B73']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Background Graphic Waves */}
      <View style={styles.waveOverlay}>
        <View style={styles.waveCircle1} />
        <View style={styles.waveCircle2} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Header Close Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose} activeOpacity={0.7}>
            <Ionicons name="close" size={24} color="rgba(255, 255, 255, 0.7)" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <SuccessGraphic />

          {/* Titles */}
          <Text style={styles.titleText}>{t('reportSuccess.thankYou')} 🌱</Text>

          <View style={styles.pointsPill}>
            <Ionicons name="star" size={16} color="#FBBF24" />
            <Text style={styles.pointsPillText}>{t('reportSuccess.earnedPoints')}</Text>
          </View>

          <PointsCard
<<<<<<< HEAD
            points={user?.eco_points || 0}
=======
            ecoPoints={user?.eco_points || 0}
            level={user?.level || 0}
>>>>>>> ce8a48819a99962c1633e8a700deffdbc01c3c94
          />

          <SuccessActions
            onViewMap={handleViewOnMap}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#094B73',
  },
  waveOverlay: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    opacity: 0.15,
  },
  waveCircle1: {
    position: 'absolute',
    bottom: -width * 0.5,
    left: -width * 0.2,
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: '#FFFFFF',
  },
  waveCircle2: {
    position: 'absolute',
    bottom: -width * 0.3,
    right: -width * 0.3,
    width: width,
    height: width,
    borderRadius: width * 0.5,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: 40,
  },
  titleText: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  pointsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 40,
  },
  pointsPillText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
});
