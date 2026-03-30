import os
import shutil

base_dir = "/home/luanthnh/Public/Workspaces/uda/projects/EcoPick/ecopick/src/app/report-success"
components_dir = f"{base_dir}/components"
os.makedirs(components_dir, exist_ok=True)

success_graphic = """import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SuccessGraphic() {
  return (
    <View style={styles.graphicContainer}>
      <View style={styles.circleGraphic}>
        <Ionicons name="leaf" size={48} color="#FFFFFF" />
      </View>
      <View style={styles.smallBadge}>
        <Ionicons name="flower" size={12} color="#FFFFFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  graphicContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  circleGraphic: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2E8057',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3CB080',
  },
});
"""

points_card = """import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Fonts, Spacing } from '../../../../constants';

export default function PointsCard() {
  const { t } = useTranslation();

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardLabel}>{t('reportSuccess.totalEcoPoints')}</Text>
      <View style={styles.cardScoreRow}>
        <Text style={styles.cardScore}>450</Text>
        <View style={styles.cardTrend}>
          <Ionicons name="trending-up" size={16} color="#34D399" />
          <Text style={styles.cardTrendText}>+10%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 40,
  },
  cardLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  cardScore: {
    fontFamily: Fonts.bold,
    fontSize: 48,
    color: '#FFFFFF',
  },
  cardTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardTrendText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#34D399',
  },
});
"""

success_actions = """import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Fonts } from '../../../../constants';

interface SuccessActionsProps {
  onViewMap: () => void;
  onExplore: () => void;
}

export default function SuccessActions({ onViewMap, onExplore }: SuccessActionsProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.primaryBtn} onPress={onViewMap} activeOpacity={0.8}>
        <Ionicons name="map-outline" size={20} color="#1E293B" />
        <Text style={styles.primaryBtnText}>{t('reportSuccess.viewOnMap')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={onExplore} activeOpacity={0.7}>
        <Text style={styles.secondaryBtnText}>{t('reportSuccess.continueExploring')}</Text>
        <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    width: '100%',
    gap: 20,
  },
  primaryBtn: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 32,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#1E293B',
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  secondaryBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
"""

with open(f"{components_dir}/SuccessGraphic.tsx", "w") as f:
    f.write(success_graphic)
with open(f"{components_dir}/PointsCard.tsx", "w") as f:
    f.write(points_card)
with open(f"{components_dir}/SuccessActions.tsx", "w") as f:
    f.write(success_actions)

index_file = """import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Fonts, Spacing } from '../../constants';

import SuccessGraphic from './components/SuccessGraphic';
import PointsCard from './components/PointsCard';
import SuccessActions from './components/SuccessActions';

const { width } = Dimensions.get('window');

export default function ReportSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ reportId?: string; latitude?: string; longitude?: string }>();
  const { t } = useTranslation();

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
    router.replace('/home');
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

          <PointsCard />

          <SuccessActions 
            onViewMap={handleViewOnMap} 
            onExplore={handleContinueExploring} 
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
"""

with open(f"{base_dir}/index.tsx", "w") as f:
    f.write(index_file)

app_dir = "/home/luanthnh/Public/Workspaces/uda/projects/EcoPick/ecopick/src/app"
try:
    os.remove(f"{app_dir}/report-success.tsx")
except OSError:
    pass

print("Refactored report-success.tsx successfully")
