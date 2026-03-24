import React, { useCallback } from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { setLanguage } from '../i18n';
import { Fonts } from '../constants';

const LANGUAGES = {
  en: { flag: '\u{1F1EC}\u{1F1E7}', label: 'EN' },
  vi: { flag: '\u{1F1FB}\u{1F1F3}', label: 'VI' },
} as const;

interface LanguageToggleProps {
  style?: ViewStyle;
}

export default function LanguageToggle({ style }: LanguageToggleProps) {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language === 'vi' ? 'vi' : 'en') as keyof typeof LANGUAGES;
  const scale = useSharedValue(1);

  const toggleLanguage = useCallback(async () => {
    const nextLang = currentLang === 'en' ? 'vi' : 'en';
    await setLanguage(nextLang);
  }, [currentLang]);

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withTiming(0.9, { duration: 80 });
    })
    .onFinalize(() => {
      scale.value = withSequence(
        withSpring(1.05, { damping: 8, stiffness: 400 }),
        withSpring(1, { damping: 12, stiffness: 300 }),
      );
    })
    .onEnd(() => {
      toggleLanguage();
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const { flag, label } = LANGUAGES[currentLang];

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[styles.pill, animatedStyle, style]}>
        <Text style={styles.flag}>{flag}</Text>
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(20,66,39,0.08)',
  },
  flag: {
    fontSize: 16,
    lineHeight: 20,
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    lineHeight: 18,
    color: '#144227',
    letterSpacing: 0.5,
  },
});
