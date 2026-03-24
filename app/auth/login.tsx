import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Fonts, AuthColors, authStyles } from '../../constants';
import LanguageToggle from '../../components/LanguageToggle';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // TODO: Implement actual login logic
    router.push('/auth/verify');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Background accents */}
      <View style={[authStyles.bgAccentGreen, { top: -88, left: 28, width: 260, height: 260 }]} />
      <View style={[authStyles.bgAccentBlue, { bottom: -40, right: -40, width: 200, height: 200 }]} />

      {/* Header */}
      <View style={[authStyles.headerBar, { paddingTop: insets.top, height: 64 + insets.top }]}>
        <View style={authStyles.headerLeft}>
          <TouchableOpacity
            style={authStyles.headerBackBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={20} color={AuthColors.brandAccent} />
          </TouchableOpacity>
          <Text style={authStyles.headerTitle}>{t('auth.logIn')}</Text>
        </View>
        <View style={authStyles.headerRight}>
          <LanguageToggle />
          <Text style={authStyles.headerBrand}>{t('auth.appName')}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.scrollContent, { paddingTop: 64 + insets.top + 40 }]}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero Text */}
          <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.heroText}>
            <Text style={styles.heroTitle}>{t('auth.loginTitle')}</Text>
            <Text style={styles.heroSubtitle}>{t('auth.loginSubtitle')}</Text>
          </Animated.View>

          {/* Login Form Card */}
          <Animated.View entering={FadeInDown.delay(250).duration(500)} style={[authStyles.glassCard, styles.formCard]}>
            <View style={styles.formFields}>
              {/* Email */}
              <View>
                <Text style={authStyles.label}>{t('auth.emailLabel')}</Text>
                <View style={authStyles.inputWrapper}>
                  <TextInput
                    style={[authStyles.input, authStyles.inputWithIcon]}
                    placeholder={t('auth.emailPlaceholder')}
                    placeholderTextColor={AuthColors.textPlaceholder}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                  <View style={styles.inputIcon}>
                    <Ionicons name="mail-outline" size={18} color={AuthColors.textPlaceholder} />
                  </View>
                </View>
              </View>

              {/* Password */}
              <View>
                <View style={styles.passwordHeader}>
                  <Text style={authStyles.label}>{t('auth.passwordLabel')}</Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.forgotLink}>{t('auth.forgotPassword')}</Text>
                  </TouchableOpacity>
                </View>
                <View style={authStyles.inputWrapper}>
                  <TextInput
                    style={[authStyles.input, authStyles.inputWithIcon, { paddingRight: 48 }]}
                    placeholder="••••••••"
                    placeholderTextColor={AuthColors.textPlaceholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                  />
                  <View style={styles.inputIcon}>
                    <Ionicons name="lock-closed-outline" size={18} color={AuthColors.textPlaceholder} />
                  </View>
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color={AuthColors.textPlaceholder}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remember me */}
              <TouchableOpacity
                style={styles.rememberRow}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                  {rememberMe && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </View>
                <Text style={styles.rememberText}>{t('auth.rememberDevice')}</Text>
              </TouchableOpacity>

              {/* Submit */}
              <TouchableOpacity activeOpacity={0.85} onPress={handleLogin}>
                <LinearGradient
                  colors={['#144227', '#2D5A3D']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={authStyles.primaryButton}
                >
                  <Text style={authStyles.primaryButtonText}>{t('auth.logIn')}</Text>
                  <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={authStyles.dividerRow}>
              <View style={authStyles.dividerLine} />
              <Text style={authStyles.dividerText}>{t('auth.orContinueWith')}</Text>
              <View style={authStyles.dividerLine} />
            </View>

            {/* Social icons row */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={authStyles.socialIconButton} activeOpacity={0.7}>
                <Image
                  source={require('../../assets/auth/google.png')}
                  style={styles.socialSmallIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={authStyles.socialIconButton} activeOpacity={0.7}>
                <Ionicons name="logo-apple" size={20} color="#191C1D" />
              </TouchableOpacity>
              <TouchableOpacity style={authStyles.socialIconButton} activeOpacity={0.7}>
                <Ionicons name="logo-facebook" size={20} color="#1877F2" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Footer */}
          <Animated.View entering={FadeIn.delay(500).duration(400)} style={[authStyles.footerLink, { marginTop: 32 }]}>
            <Text style={authStyles.footerLinkText}>{t('auth.noAccount')}{' '}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
              <Text style={authStyles.footerLinkBold}>{t('auth.signUp')}</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AuthColors.bg,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 40,
  },
  heroText: {
    gap: 8,
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: Fonts.bold,
    fontSize: 36,
    lineHeight: 40,
    color: AuthColors.brandDark,
    letterSpacing: -0.9,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    color: AuthColors.textSecondary,
    textAlign: 'center',
  },
  formCard: {
    paddingHorizontal: 33,
    paddingTop: 33,
    paddingBottom: 25,
    gap: 32,
    borderRadius: 12,
  },
  formFields: {
    gap: 24,
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  passwordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgotLink: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    color: AuthColors.brandTeal,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: AuthColors.inputBg,
    borderWidth: 1,
    borderColor: AuthColors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: AuthColors.brandDark,
    borderColor: AuthColors.brandDark,
  },
  rememberText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: AuthColors.textSecondary,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
  },
  socialSmallIcon: {
    width: 24,
    height: 24,
  },
});
