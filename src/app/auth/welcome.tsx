import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Fonts, AuthColors, authStyles } from '../../constants';
import LanguageToggle from '../../components/LanguageToggle';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Top Branding Area ───────────────────────────────── */}
        <View style={[styles.brandingArea, { paddingTop: insets.top + 40 }]}>
          {/* Language Toggle */}
          <LanguageToggle
            style={{
              position: 'absolute',
              top: insets.top + 12,
              right: 24,
              zIndex: 10,
            }}
          />

          {/* Decorative blurs */}
          <View style={[authStyles.bgAccentGreen, { top: -48, left: -48 }]} />
          <View style={[authStyles.bgAccentBlue, { top: 96, right: 0 }]} />

          <Animated.View entering={FadeIn.duration(600)} style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Image
                source={require('../../assets/auth/logo_icon.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.brandName}>{t('auth.appName')}</Text>
          </Animated.View>
        </View>

        {/* ─── Bottom Card ─────────────────────────────────────── */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            {/* Header */}
            <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.headerText}>
              <Text style={styles.heading}>{t('auth.welcomeTitle')}</Text>
              <Text style={styles.subtitle}>{t('auth.welcomeSubtitle')}</Text>
            </Animated.View>

            {/* Action buttons */}
            <Animated.View entering={FadeInDown.delay(350).duration(500)} style={styles.actionCluster}>
              {/* Continue with Email */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push('/auth/login')}
              >
                <LinearGradient
                  colors={['#144227', '#2D5A3D']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.emailButton}
                >
                  <Ionicons name="mail-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.emailButtonText}>{t('auth.continueEmail')}</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Social buttons */}
              <View style={styles.socialGroup}>
                <TouchableOpacity style={authStyles.socialButton} activeOpacity={0.7}>
                  <Image
                    source={require('../../assets/auth/google.png')}
                    style={styles.socialIcon}
                    resizeMode="contain"
                  />
                  <Text style={authStyles.socialButtonText}>{t('auth.continueGoogle')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={authStyles.socialButton} activeOpacity={0.7}>
                  <Ionicons name="logo-apple" size={18} color="#191C1D" />
                  <Text style={authStyles.socialButtonText}>{t('auth.continueApple')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={authStyles.socialButton} activeOpacity={0.7}>
                  <Ionicons name="logo-facebook" size={20} color="#1877F2" />
                  <Text style={authStyles.socialButtonText}>{t('auth.continueFacebook')}</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Community Goal Card */}
            <Animated.View entering={FadeInUp.delay(500).duration(500)} style={styles.communityCard}>
              <Image
                source={require('../../assets/auth/community.png')}
                style={styles.communityImage}
                resizeMode="cover"
              />
              <View style={styles.communityText}>
                <Text style={styles.communityLabel}>{t('auth.communityGoal')}</Text>
                <Text style={styles.communityValue}>{t('auth.communityValue')}</Text>
              </View>
            </Animated.View>

            {/* Footer */}
            <Animated.View entering={FadeIn.delay(600).duration(500)} style={authStyles.footerLink}>
              <Text style={[authStyles.footerLinkText, { fontSize: 14, lineHeight: 20 }]}>
                {t('auth.alreadyHaveAccount')}{' '}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push('/auth/login')}
              >
                <Text style={[authStyles.footerLinkBold, { fontSize: 14, lineHeight: 20 }]}>
                  {t('auth.logIn')}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AuthColors.bg,
  },
  brandingArea: {
    height: 309,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: AuthColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(20,66,39,0.05)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: { elevation: 2 },
    }),
  },
  logoImage: {
    width: 36,
    height: 40,
  },
  brandName: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    lineHeight: 32,
    color: AuthColors.brandDark,
    letterSpacing: -0.6,
    marginTop: 16,
  },
  cardContainer: {
    flex: 1,
    marginTop: -40,
  },
  card: {
    flex: 1,
    backgroundColor: AuthColors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 40,
    gap: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.03,
        shadowRadius: 40,
      },
      android: { elevation: 8 },
    }),
  },
  headerText: {
    gap: 12,
    alignItems: 'flex-start',
  },
  heading: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    lineHeight: 36,
    color: AuthColors.textPrimary,
    letterSpacing: -0.75,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 26,
    color: AuthColors.textSecondary,
  },
  actionCluster: {
    gap: 16,
  },
  emailButton: {
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(20,66,39,0.1)',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 1,
        shadowRadius: 25,
      },
      android: { elevation: 10 },
    }),
  },
  emailButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: AuthColors.white,
  },
  socialGroup: {
    gap: 12,
    marginTop: 8,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  communityCard: {
    backgroundColor: 'rgba(20,66,39,0.05)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  communityImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  communityText: {
    flex: 1,
    gap: 2,
  },
  communityLabel: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    color: AuthColors.brandDark,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  communityValue: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: AuthColors.textSecondary,
  },
});
