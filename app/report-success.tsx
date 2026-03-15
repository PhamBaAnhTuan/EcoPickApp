import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants';

const { width } = Dimensions.get('window');

export default function ReportSuccessScreen() {
  const router = useRouter();

  const handleViewOnMap = () => {
    // Return to map to see the reported location or just default map
    router.replace('/map');
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
      
      {/* Background Graphic Waves (Optional/Approximated with gradients) */}
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
          {/* Center Graphic */}
          <View style={styles.graphicContainer}>
            <View style={styles.circleGraphic}>
              <Ionicons name="leaf" size={48} color="#FFFFFF" />
            </View>
            <View style={styles.smallBadge}>
              <Ionicons name="flower" size={12} color="#FFFFFF" />
            </View>
          </View>

          {/* Titles */}
          <Text style={styles.titleText}>Thank You! 🌱</Text>
          
          <View style={styles.pointsPill}>
            <Ionicons name="star" size={16} color="#FBBF24" />
            <Text style={styles.pointsPillText}>You earned +10 Eco Points</Text>
          </View>

          {/* Total Points Card */}
          <View style={styles.cardContainer}>
            <Text style={styles.cardLabel}>TOTAL ECO POINTS</Text>
            <View style={styles.cardScoreRow}>
              <Text style={styles.cardScore}>450</Text>
              <View style={styles.cardTrend}>
                <Ionicons name="trending-up" size={16} color="#34D399" />
                <Text style={styles.cardTrendText}>+10%</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.primaryBtn} onPress={handleViewOnMap} activeOpacity={0.8}>
              <Ionicons name="map-outline" size={20} color="#1E293B" />
              <Text style={styles.primaryBtnText}>View on Map</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryBtn} onPress={handleContinueExploring} activeOpacity={0.7}>
              <Text style={styles.secondaryBtnText}>Continue Exploring</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

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
    backgroundColor: '#2E8057', // Accent dark green
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3CB080',
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
