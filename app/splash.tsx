import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

// Logo dimensions from Figma: 195x264 centered
const LOGO_WIDTH = 195;
const LOGO_HEIGHT = 264;

// Figma background: rgba(32, 105, 58, 0.2)
const SPLASH_BG = 'rgba(32, 105, 58, 0.2)';

const ONBOARDING_KEY = '@ecopick_onboarding_complete';

export default function SplashScreenView() {
  const router = useRouter();
  const hasNavigated = useRef(false);

  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.6);
  const logoTranslateY = useSharedValue(20);

  const navigateNext = async () => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;

    try {
      // TODO: Remove this line after testing — forces onboarding flow
      await AsyncStorage.removeItem(ONBOARDING_KEY);

      const onboardingDone = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (onboardingDone === 'true') {
        router.replace('/(tabs)/map');
      } else {
        router.replace('/onboarding');
      }
    } catch {
      router.replace('/onboarding');
    }
  };

  useEffect(() => {
    // Phase 1: Logo fades in + scales up + slides up
    logoOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });

    logoScale.value = withSpring(1, {
      damping: 14,
      stiffness: 100,
      mass: 0.8,
    });

    logoTranslateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });

    // Phase 2: After holding, navigate
    const timer = setTimeout(() => {
      // Fade out before navigating
      logoOpacity.value = withTiming(0, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(navigateNext)();
        }
      });
      logoScale.value = withTiming(1.1, { duration: 300 });
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { translateY: logoTranslateY.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Centered Logo */}
      <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SPLASH_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
});
