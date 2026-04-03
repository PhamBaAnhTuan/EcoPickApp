import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LanguageToggle from '../components/LanguageToggle';
import { Fonts } from '../constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ONBOARDING_KEY = '@ecopick_onboarding_complete';

// ─── Design Tokens (Figma) ─────────────────────────────────────────────────
const FigmaColors = {
  bg: '#F8F9FA',
  textDark: '#264653',
  textGray: '#6B7280',
  green: '#2D5A3D',
  greenLight: 'rgba(45,90,61,0.1)',
  greenBorder: 'rgba(45,90,61,0.3)',
  teal: '#2A9D8F',
  orange: '#F4A261',
  yellow: '#E9C46A',
  blue: '#3B82F6',
  cardBg: 'rgba(255,255,255,0.95)',
  cardBorder: 'rgba(255,255,255,0.2)',
  borderLight: '#F3F4F6',
  borderMedium: '#D1D5DB',
} as const;

// ─── Images ────────────────────────────────────────────────────────────────
const OnboardingImages = {
  discoverDirty: require('../assets/onboarding/discover_dirty.png'),
  discoverClean: require('../assets/onboarding/discover_clean.png'),
  connectVolunteers: require('../assets/onboarding/connect_volunteers.png'),
  impactBefore: require('../assets/onboarding/impact_before.jpg'),
  impactAfter: require('../assets/onboarding/impact_after.jpg'),
  impactAvatar: require('../assets/onboarding/impact_avatar.jpg'),
};

// ─── Screen 1: Discover Illustration ───────────────────────────────────────
function DiscoverIllustration() {
  return (
    <Animated.View entering={FadeIn.duration(600)} style={illStyles.discoverContainer}>
      {/* Split image: dirty (left, desaturated) | clean (right, vivid) */}
      <View style={illStyles.discoverSplit}>
        <View style={illStyles.discoverLeftHalf}>
          <Image
            source={OnboardingImages.discoverDirty}
            style={illStyles.discoverImage}
            resizeMode="cover"
          />
          {/* Desaturation overlay */}
          <View style={illStyles.desaturateOverlay} />
        </View>
        <View style={illStyles.discoverRightHalf}>
          <Image
            source={OnboardingImages.discoverClean}
            style={illStyles.discoverImage}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Map UI Overlay (glass card) */}
      <Animated.View entering={FadeInUp.delay(400).duration(700)} style={illStyles.mapOverlay}>
        <View style={illStyles.mapOverlayInner}>
          {/* Map grid lines (decorative) */}
          <View style={illStyles.mapGrid}>
            <View style={[illStyles.mapGridLine, { top: '25%', left: 0, right: 0, height: 1 }]} />
            <View style={[illStyles.mapGridLine, { top: '50%', left: 0, right: 0, height: 1 }]} />
            <View style={[illStyles.mapGridLine, { top: '75%', left: 0, right: 0, height: 1 }]} />
            <View style={[illStyles.mapGridLine, { left: '33%', top: 0, bottom: 0, width: 1 }]} />
            <View style={[illStyles.mapGridLine, { left: '66%', top: 0, bottom: 0, width: 1 }]} />
          </View>

          {/* User location dot */}
          <Animated.View entering={FadeIn.delay(800).duration(500)} style={illStyles.userDot} />

          {/* Trash pins */}
          <Animated.View entering={FadeIn.delay(600).duration(400)} style={[illStyles.trashPin, { top: '18%', left: '20%' }]}>
            <MapPin color={FigmaColors.teal} />
          </Animated.View>
          <Animated.View entering={FadeIn.delay(700).duration(400)} style={[illStyles.trashPin, { top: '14%', left: '55%' }]}>
            <MapPin color={FigmaColors.orange} />
          </Animated.View>
          <Animated.View entering={FadeIn.delay(800).duration(400)} style={[illStyles.trashPin, { top: '43%', left: '70%' }]}>
            <MapPin color={FigmaColors.yellow} />
          </Animated.View>
          <Animated.View entering={FadeIn.delay(900).duration(400)} style={[illStyles.trashPin, { top: '78%', left: '25%' }]}>
            <MapPin color={FigmaColors.teal} />
          </Animated.View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

function MapPin({ color }: { color: string }) {
  return (
    <View style={[illStyles.mapPinOuter, { backgroundColor: color }]}>
      <View style={illStyles.mapPinInner} />
    </View>
  );
}

// ─── Screen 2: Connect Illustration ────────────────────────────────────────
function ConnectIllustration() {
  const { t } = useTranslation();

  return (
    <Animated.View entering={FadeIn.duration(600)} style={illStyles.connectContainer}>
      {/* Rotated photo card */}
      <Animated.View entering={FadeInUp.delay(200).duration(800).springify()} style={illStyles.connectPhotoWrapper}>
        <View style={illStyles.connectPhotoCard}>
          <Image
            source={OnboardingImages.connectVolunteers}
            style={illStyles.connectPhoto}
            resizeMode="cover"
          />

          {/* Glass event date card overlay */}
          <Animated.View entering={FadeIn.delay(600).duration(500)} style={illStyles.eventDateCard}>
            <View style={illStyles.eventDateCardInner}>
              <View style={illStyles.eventDateIcon}>
                <Ionicons name="calendar-outline" size={18} color={FigmaColors.green} />
              </View>
              <View style={illStyles.eventDateText}>
                <Text style={illStyles.eventDateTitle}>{t('onboarding.connectEventDate')}</Text>
                <Text style={illStyles.eventDateTime}>{t('onboarding.connectEventTime')}</Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

// ─── Screen 3: Impact Illustration ─────────────────────────────────────────
function ImpactIllustration() {
  const { t } = useTranslation();

  return (
    <Animated.View entering={FadeIn.duration(600)} style={illStyles.impactContainer}>
      {/* Before / After comparison cards */}
      <Animated.View entering={FadeInUp.delay(200).duration(700)} style={illStyles.comparisonRow}>
        {/* Card 1: Before */}
        <View style={illStyles.comparisonCard}>
          <View style={illStyles.comparisonImageWrap}>
            <Image
              source={OnboardingImages.impactBefore}
              style={illStyles.comparisonImage}
              resizeMode="cover"
            />
            {/* Timestamp badge */}
            <View style={illStyles.timestampBadge}>
              <Text style={illStyles.timestampText}>{t('onboarding.impactTimestamp')}</Text>
            </View>
            {/* Avatar */}
            <View style={illStyles.avatarWrap}>
              <Image
                source={OnboardingImages.impactAvatar}
                style={illStyles.avatarImage}
                resizeMode="cover"
              />
            </View>
          </View>
          <View style={illStyles.comparisonLabel}>
            <Text style={[illStyles.comparisonLabelText, { color: FigmaColors.textDark }]}>
              {t('onboarding.impactBefore').toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Card 2: After */}
        <View style={illStyles.comparisonCard}>
          <View style={illStyles.comparisonImageWrap}>
            <Image
              source={OnboardingImages.impactAfter}
              style={illStyles.comparisonImage}
              resizeMode="cover"
            />
            {/* Verified badge */}
            <View style={illStyles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={10} color="#FFFFFF" />
              <Text style={illStyles.verifiedText}>{t('onboarding.impactVerified')}</Text>
            </View>
          </View>
          <View style={illStyles.comparisonLabel}>
            <Text style={[illStyles.comparisonLabelText, { color: FigmaColors.green }]}>
              {t('onboarding.impactAfter').toUpperCase()}
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Stats overlay card */}
      <Animated.View entering={FadeInUp.delay(500).duration(600)} style={illStyles.statsCard}>
        <Text style={illStyles.statsMain}>{t('onboarding.impactStats')}</Text>
        <Text style={illStyles.statsCO2}>{t('onboarding.impactCO2')}</Text>
      </Animated.View>

      {/* Plant seedling icon */}
      <Animated.View entering={FadeIn.delay(700).duration(500)} style={illStyles.seedlingWrap}>
        <Text style={illStyles.seedlingEmoji}>🌱</Text>
      </Animated.View>
    </Animated.View>
  );
}

// ─── Slide Data ────────────────────────────────────────────────────────────

interface OnboardingSlide {
  key: string;
  illustration: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    key: 'discover',
    illustration: <DiscoverIllustration />,
    titleKey: 'onboarding.discoverTitle',
    descriptionKey: 'onboarding.discoverDescription',
  },
  {
    key: 'connect',
    illustration: <ConnectIllustration />,
    titleKey: 'onboarding.connectTitle',
    descriptionKey: 'onboarding.connectDescription',
  },
  {
    key: 'impact',
    illustration: <ImpactIllustration />,
    titleKey: 'onboarding.impactTitle',
    descriptionKey: 'onboarding.impactDescription',
  },
];

// ─── Dot Indicator ─────────────────────────────────────────────────────────

function DotIndicator({
  scrollX,
  index,
  isLastSlide,
}: {
  scrollX: SharedValue<number>;
  index: number;
  isLastSlide: boolean;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];
    const scale = interpolate(scrollX.value, inputRange, [1, 1, 1], 'clamp');
    const opacity = interpolate(scrollX.value, inputRange, [0.3, 1, 0.3], 'clamp');
    const isActive = interpolate(scrollX.value, inputRange, [0, 1, 0], 'clamp');

    return {
      transform: [{ scale }],
      opacity,
      backgroundColor: isActive > 0.5 ? FigmaColors.green : 'transparent',
      borderWidth: isActive > 0.5 ? 0 : 1.5,
      borderColor: isActive > 0.5 ? 'transparent' : (isLastSlide ? FigmaColors.greenBorder : FigmaColors.borderMedium),
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

// ─── Main Onboarding Screen ────────────────────────────────────────────────

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollX.value = event.nativeEvent.contentOffset.x;
    },
    [scrollX],
  );

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const completeOnboarding = useCallback(async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    } catch { }
    router.replace('/auth/login');
  }, [router]);

  const handleNext = useCallback(() => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  }, [currentIndex, completeOnboarding]);

  const handleSkip = useCallback(() => {
    completeOnboarding();
  }, [completeOnboarding]);

  const renderItem = useCallback(
    ({ item, index }: { item: OnboardingSlide; index: number }) => {
      const isLast = index === SLIDES.length - 1;

      return (
        <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
          <View style={[styles.slideInner, { paddingTop: insets.top }]}>
            {/* Language Toggle */}
            <LanguageToggle
              style={{
                position: 'absolute',
                top: insets.top + 12,
                right: 24,
                zIndex: 10,
              }}
            />

            {/* Spacer for top safe area */}
            <View style={styles.headerSpacer} />

            {/* Illustration Section */}
            <View style={styles.illustrationSection}>{item.illustration}</View>

            {/* Pagination Dots — between illustration and content */}
            <View style={styles.dotsCenter}>
              {SLIDES.map((_, i) => (
                <DotIndicator key={i} index={i} scrollX={scrollX} isLastSlide={isLast} />
              ))}
            </View>

            {/* Content Section */}
            <View style={[styles.contentSection, isLast && styles.contentSectionLast]}>
              <View style={styles.textContent}>
                <Animated.Text
                  entering={FadeInDown.delay(200).duration(500)}
                  style={[styles.title, isLast && styles.titleCenter]}
                >
                  {t(item.titleKey as any)}
                </Animated.Text>
                <Animated.Text
                  entering={FadeInDown.delay(350).duration(500)}
                  style={[styles.description, isLast && styles.descriptionCenter]}
                >
                  {t(item.descriptionKey as any)}
                </Animated.Text>
              </View>

              {/* Footer Actions */}
              <View style={styles.footer}>
                {isLast ? (
                  <>
                    {/* Get Started CTA button */}
                    <Animated.View entering={FadeInDown.delay(500).duration(500)} style={{ width: '100%' }}>
                      <TouchableOpacity
                        style={styles.ctaButton}
                        onPress={handleNext}
                        activeOpacity={0.85}
                      >
                        <Text style={styles.ctaText}>{t('onboarding.getStarted')}</Text>
                      </TouchableOpacity>
                    </Animated.View>

                    {/* Login link */}
                    <View style={styles.loginRow}>
                      <Text style={styles.loginText}>
                        {t('onboarding.alreadyHaveAccount')}{' '}
                      </Text>
                      <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/auth/login')}>
                        <Text style={styles.loginLink}>{t('onboarding.logIn')}</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <View style={styles.footerRow}>
                    {/* Skip button aligned left, same row as Next */}
                    <TouchableOpacity onPress={handleSkip} activeOpacity={0.7} hitSlop={8}>
                      <Text style={styles.skipText}>{t('onboarding.skip')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={handleNext}
                      activeOpacity={0.85}
                    >
                      <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      );
    },
    [insets, t, scrollX, handleNext, handleSkip],
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />
    </View>
  );
}

// ─── Illustration Styles ───────────────────────────────────────────────────

const ILLUSTRATION_HEIGHT = SCREEN_HEIGHT * 0.48;

const illStyles = StyleSheet.create({
  // ─ Discover ─
  discoverContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 0,
  },
  discoverSplit: {
    flex: 1,
    flexDirection: 'row',
  },
  discoverLeftHalf: {
    flex: 4,
    overflow: 'hidden',
  },
  discoverRightHalf: {
    flex: 6,
    overflow: 'hidden',
  },
  discoverImage: {
    width: '100%',
    height: '100%',
  },
  desaturateOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  mapOverlay: {
    position: 'absolute',
    top: '10%',
    right: '5%',
    bottom: '10%',
    left: '45%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 25,
      },
      android: { elevation: 8 },
    }),
  },
  mapOverlayInner: {
    flex: 1,
    position: 'relative',
  },
  mapGrid: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  mapGridLine: {
    position: 'absolute',
    backgroundColor: '#000',
  },
  userDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: FigmaColors.blue,
    top: '60%',
    left: '40%',
  },
  trashPin: {
    position: 'absolute',
  },
  mapPinOuter: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 0,
    transform: [{ rotate: '-45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPinInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },

  // ─ Connect ─
  connectContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  connectPhotoWrapper: {
    transform: [{ rotate: '-2deg' }],
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.1,
        shadowRadius: 25,
      },
      android: { elevation: 16 },
    }),
  },
  connectPhotoCard: {
    width: SCREEN_WIDTH * 0.78,
    aspectRatio: 4 / 5,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  connectPhoto: {
    width: '100%',
    height: '100%',
  },
  eventDateCard: {
    position: 'absolute',
    bottom: 23,
    left: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.95)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
      },
      android: { elevation: 8 },
    }),
  },
  eventDateCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    paddingVertical: 13,
    gap: 12,
  },
  eventDateIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: FigmaColors.greenLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventDateText: {
    flexDirection: 'column',
  },
  eventDateTitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    lineHeight: 21,
    color: FigmaColors.textDark,
  },
  eventDateTime: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    color: FigmaColors.textGray,
  },

  // ─ Impact ─
  impactContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },
  comparisonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  comparisonCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: FigmaColors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: { elevation: 2 },
    }),
  },
  comparisonImageWrap: {
    width: '100%',
    height: 161,
    backgroundColor: '#E5E7EB',
    position: 'relative',
  },
  comparisonImage: {
    width: '100%',
    height: '100%',
  },
  timestampBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  timestampText: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    lineHeight: 15,
    color: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: FigmaColors.green,
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    lineHeight: 15,
    color: '#FFFFFF',
  },
  avatarWrap: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  comparisonLabel: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  comparisonLabelText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  statsCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    paddingHorizontal: 17,
    paddingVertical: 13,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#F9FAFB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
      },
      android: { elevation: 8 },
    }),
  },
  statsMain: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    lineHeight: 20,
    color: FigmaColors.textDark,
  },
  statsCO2: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    lineHeight: 20,
    color: FigmaColors.green,
  },
  seedlingWrap: {
    alignItems: 'center',
  },
  seedlingEmoji: {
    fontSize: 24,
  },
});

// ─── Main Styles ───────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FigmaColors.bg,
  },
  slide: {
    flex: 1,
  },
  slideInner: {
    flex: 1,
    backgroundColor: FigmaColors.bg,
  },
  headerSpacer: {
    height: 12,
  },
  skipText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: FigmaColors.textGray,
  },
  illustrationSection: {
    height: ILLUSTRATION_HEIGHT,
    overflow: 'hidden',
  },
  dotsCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 32,
    paddingBottom: 24,
    justifyContent: 'space-between',
    backgroundColor: FigmaColors.bg,
  },
  contentSectionLast: {
    paddingTop: 0,
  },
  textContent: {
    gap: 16,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    lineHeight: 35,
    color: FigmaColors.textDark,
    letterSpacing: -0.3,
  },
  titleCenter: {
    textAlign: 'center',
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 26,
    color: FigmaColors.textGray,
  },
  descriptionCenter: {
    textAlign: 'center',
  },
  footer: {
    gap: 16,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: FigmaColors.green,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(45,90,61,0.2)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 15,
      },
      android: { elevation: 8 },
    }),
  },
  ctaButton: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    backgroundColor: FigmaColors.green,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: { elevation: 6 },
    }),
  },
  ctaText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: FigmaColors.textGray,
  },
  loginLink: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    lineHeight: 21,
    color: FigmaColors.green,
  },
});
