import { useUpdateUser, useUserInfo } from '@/hooks/useUserQueries';
import { useAuthStore } from '@/stores/authStore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { BorderRadius, Colors, Fonts, FontSizes, Spacing } from '../../constants';
import { pickImage, type PickedImage } from '../../utils/pickImage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = 160;
const AVATAR_SIZE = 88;
const BIO_MAX_LENGTH = 200;

const DEFAULT_AVATAR = 'https://bizweb.dktcdn.net/100/324/808/files/san-pham-co-nguon-goc-thien-nhien.jpg?v=1702028320944';
const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80';

// ─── Form Input Component ───
function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  multiline = false,
  maxLength,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  charCount,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: string;
  multiline?: boolean;
  maxLength?: number;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'url';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  charCount?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={formStyles.inputGroup}>
      <Text style={formStyles.label}>{label}</Text>
      <View style={[
        formStyles.inputContainer,
        isFocused && formStyles.inputContainerFocused,
        error ? formStyles.inputContainerError : null,
        multiline && { minHeight: 100, alignItems: 'flex-start' as const },
      ]}>
        {icon && (
          <Ionicons
            name={icon as any}
            size={18}
            color={isFocused ? Colors.primary : Colors.textSecondary}
            style={{ marginTop: multiline ? 14 : 0 }}
          />
        )}
        <TextInput
          style={[
            formStyles.input,
            multiline && { textAlignVertical: 'top', minHeight: 80 },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textPlaceholder}
          multiline={multiline}
          maxLength={maxLength}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      <View style={formStyles.inputFooter}>
        {error ? (
          <Text style={formStyles.errorText}>{error}</Text>
        ) : (
          <View />
        )}
        {charCount && maxLength ? (
          <Text style={[
            formStyles.charCount,
            value.length >= maxLength && { color: '#EF4444' },
          ]}>
            {value.length}/{maxLength}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

// ─── Section Header Component ───
function SectionHeader({ title, icon }: { title: string; icon: string }) {
  return (
    <View style={formStyles.sectionHeader}>
      <Ionicons name={icon as any} size={18} color={Colors.primary} />
      <Text style={formStyles.sectionHeaderText}>{title}</Text>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════
// EDIT PROFILE SCREEN
// ═══════════════════════════════════════════════════════════════
export default function EditProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const updateUserMutation = useUpdateUser();
  const { data: apiUser, refetch } = useUserInfo();
  const storeUser = useAuthStore((s) => s.user);
  const user = apiUser ?? storeUser;

  // ─── Form State ───
  const [fullname, setFullname] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [website, setWebsite] = useState('');

  // ─── Image State ───
  const [pendingAvatar, setPendingAvatar] = useState<PickedImage | null>(null);
  const [pendingBanner, setPendingBanner] = useState<PickedImage | null>(null);

  // ─── UI State ───
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // ─── Animations ───
  const saveButtonScale = useRef(new Animated.Value(1)).current;

  // ─── Initialize form with user data ───
  useEffect(() => {
    if (user) {
      setFullname(user.fullname || '');
      setBio(user.bio || '');
      setPhone(user.phone_number || '');
      setAddress(user.address || '');
      setDateOfBirth(user.date_of_birth || '');
    }
  }, [user]);

  // ─── Track changes ───
  useEffect(() => {
    if (!user) return;
    const changed =
      fullname !== (user.fullname || '') ||
      bio !== (user.bio || '') ||
      phone !== (user.phone_number || '') ||
      address !== (user.address || '') ||
      dateOfBirth !== (user.date_of_birth || '') ||
      pendingAvatar !== null ||
      pendingBanner !== null;
    setHasChanges(changed);
  }, [fullname, bio, phone, address, dateOfBirth, pendingAvatar, pendingBanner, user]);

  // ─── Validation ───
  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!fullname.trim()) {
      newErrors.fullname = 'Full name is required';
    } else if (fullname.trim().length < 2) {
      newErrors.fullname = 'Name must be at least 2 characters';
    }

    if (bio.length > BIO_MAX_LENGTH) {
      newErrors.bio = `Bio must be under ${BIO_MAX_LENGTH} characters`;
    }

    if (phone && !/^[\d\s+()-]{7,20}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fullname, bio, phone]);

  // ─── Image Handlers ───
  const handleChangeAvatar = useCallback(async () => {
    const result = await pickImage({
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    if (result.success) {
      setPendingAvatar(result.images[0]);
    } else if (result.reason === 'permission_denied') {
      Toast.show({ type: 'error', text1: t('report.galleryPermissionRequired') });
    }
  }, [t]);

  const handleChangeBanner = useCallback(async () => {
    const result = await pickImage({
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (result.success) {
      setPendingBanner(result.images[0]);
    } else if (result.reason === 'permission_denied') {
      Toast.show({ type: 'error', text1: t('report.galleryPermissionRequired') });
    }
  }, [t]);

  // ─── Save Handler ───
  const handleSave = useCallback(async () => {
    if (!validate()) return;
    if (!user?.id) return;

    // Button press animation
    Animated.sequence([
      Animated.timing(saveButtonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(saveButtonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    setIsSaving(true);

    try {
      const payload: Record<string, any> = {};

      if (fullname.trim() !== (user.fullname || '')) payload.fullname = fullname.trim();
      if (bio !== (user.bio || '')) payload.bio = bio;
      if (phone !== (user.phone_number || '')) payload.phone_number = phone;
      if (address !== (user.address || '')) payload.address = address;
      if (dateOfBirth !== (user.date_of_birth || '')) payload.date_of_birth = dateOfBirth;
      if (pendingAvatar) payload.avatar = pendingAvatar.file;

      // Only call API if there are actual changes
      if (Object.keys(payload).length > 0) {
        await updateUserMutation.mutateAsync({
          id: user.id,
          payload,
        });
      }

      // Optimistic update in store
      useAuthStore.getState().updateUser({
        fullname: fullname.trim() || user.fullname,
        bio: bio || user.bio,
        phone_number: phone || user.phone_number,
        address: address || user.address,
        date_of_birth: dateOfBirth || user.date_of_birth,
      } as any);

      refetch();
      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
        text2: 'Your changes have been saved successfully.',
      });
      router.back();
    } catch (_err) {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  }, [validate, user, fullname, bio, phone, address, dateOfBirth, pendingAvatar, updateUserMutation, refetch, router, saveButtonScale]);

  // ─── Cancel Handler ───
  const handleCancel = useCallback(() => {
    if (hasChanges) {
      // Could show a confirmation dialog here
      Toast.show({ type: 'info', text1: 'Changes discarded' });
    }
    router.back();
  }, [hasChanges, router]);

  const avatarUri = pendingAvatar?.uri || user?.avatar || DEFAULT_AVATAR;
  const bannerUri = pendingBanner?.uri || DEFAULT_BANNER;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* ─── Header ─── */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          style={styles.headerBtn}
          activeOpacity={0.7}
          onPress={handleCancel}
        >
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <Animated.View style={{ transform: [{ scale: saveButtonScale }] }}>
          <TouchableOpacity
            style={[
              styles.saveBtn,
              (!hasChanges || isSaving) && styles.saveBtnDisabled,
            ]}
            activeOpacity={0.7}
            onPress={handleSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Text style={styles.saveBtnText}>Save</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ═══════════════════════════════════════════════════ */}
          {/* BANNER + AVATAR PREVIEW                            */}
          {/* ═══════════════════════════════════════════════════ */}
          <View style={styles.mediaSection}>
            {/* Banner */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleChangeBanner}
              style={styles.bannerContainer}
            >
              <Image source={{ uri: bannerUri }} style={styles.bannerImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.4)']}
                style={styles.bannerGradient}
              />
              <View style={styles.bannerOverlay}>
                <View style={styles.changeBannerBtn}>
                  <Ionicons name="camera-outline" size={16} color={Colors.white} />
                  <Text style={styles.changeBannerText}>Change Cover</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Avatar */}
            <View style={styles.avatarSection}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleChangeAvatar}
                style={styles.avatarWrapper}
              >
                <View style={styles.avatarBorder}>
                  <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                </View>
                <View style={styles.avatarEditOverlay}>
                  <Ionicons name="camera" size={20} color={Colors.white} />
                </View>
              </TouchableOpacity>
              <Text style={styles.changeAvatarText}>Change Photo</Text>
            </View>
          </View>

          {/* ═══════════════════════════════════════════════════ */}
          {/* BASIC INFO SECTION                                 */}
          {/* ═══════════════════════════════════════════════════ */}
          <View style={formStyles.section}>
            <SectionHeader title="Basic Information" icon="person-outline" />

            <FormInput
              label="Full Name"
              value={fullname}
              onChangeText={setFullname}
              placeholder="Enter your full name"
              icon="person-outline"
              autoCapitalize="words"
              error={errors.fullname}
            />

            <FormInput
              label="Bio"
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself and your eco-journey..."
              icon="chatbubble-outline"
              multiline
              maxLength={BIO_MAX_LENGTH}
              charCount
              error={errors.bio}
            />

            <FormInput
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              placeholder="+84 xxx xxx xxx"
              icon="call-outline"
              keyboardType="phone-pad"
              error={errors.phone}
            />

            <FormInput
              label="Address"
              value={address}
              onChangeText={setAddress}
              placeholder="Your city or location"
              icon="location-outline"
            />

            <FormInput
              label="Date of Birth"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholder="YYYY-MM-DD"
              icon="calendar-outline"
            />
          </View>

          {/* ═══════════════════════════════════════════════════ */}
          {/* SOCIAL / OPTIONAL SECTION                          */}
          {/* ═══════════════════════════════════════════════════ */}
          <View style={formStyles.section}>
            <SectionHeader title="Social Links" icon="globe-outline" />

            <FormInput
              label="Website"
              value={website}
              onChangeText={setWebsite}
              placeholder="https://your-website.com"
              icon="link-outline"
              keyboardType="url"
              autoCapitalize="none"
            />
          </View>

          {/* ═══════════════════════════════════════════════════ */}
          {/* ACCOUNT INFO (READ-ONLY)                           */}
          {/* ═══════════════════════════════════════════════════ */}
          <View style={formStyles.section}>
            <SectionHeader title="Account" icon="shield-checkmark-outline" />

            <View style={formStyles.readOnlyRow}>
              <View style={formStyles.readOnlyLeft}>
                <Ionicons name="mail-outline" size={16} color={Colors.textSecondary} />
                <Text style={formStyles.readOnlyLabel}>Email</Text>
              </View>
              <Text style={formStyles.readOnlyValue}>{user?.email || '—'}</Text>
            </View>

            <View style={formStyles.readOnlyRow}>
              <View style={formStyles.readOnlyLeft}>
                <Ionicons name="shield-checkmark-outline" size={16} color={Colors.textSecondary} />
                <Text style={formStyles.readOnlyLabel}>Role</Text>
              </View>
              <View style={formStyles.roleBadge}>
                <Text style={formStyles.roleBadgeText}>{user?.role?.name ?? 'user'}</Text>
              </View>
            </View>

            <View style={formStyles.readOnlyRow}>
              <View style={formStyles.readOnlyLeft}>
                <Ionicons name="star-outline" size={16} color={Colors.textSecondary} />
                <Text style={formStyles.readOnlyLabel}>Eco Points</Text>
              </View>
              <Text style={formStyles.readOnlyValue}>{user?.eco_points ?? 0}</Text>
            </View>
          </View>

          {/* ─── Bottom Spacer ─── */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}


// ═══════════════════════════════════════════════════════════════
// STYLES - MAIN
// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ─── Header ───
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingBottom: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    zIndex: 10,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    minWidth: 70,
    alignItems: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: '#94A3B8',
    opacity: 0.6,
  },
  saveBtnText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Colors.white,
  },

  // ─── Scroll ───
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 0,
  },

  // ─── Media Section (Banner + Avatar) ───
  mediaSection: {
    marginBottom: 8,
  },
  bannerContainer: {
    width: SCREEN_WIDTH,
    height: BANNER_HEIGHT,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BANNER_HEIGHT * 0.6,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  changeBannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
  },
  changeBannerText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    color: Colors.white,
  },

  // ─── Avatar ───
  avatarSection: {
    alignItems: 'center',
    marginTop: -(AVATAR_SIZE / 2),
    gap: 8,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarBorder: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: { elevation: 6 },
    }),
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarEditOverlay: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: (AVATAR_SIZE - 8) / 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeAvatarText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    color: Colors.primary,
  },
});


// ═══════════════════════════════════════════════════════════════
// STYLES - FORM
// ═══════════════════════════════════════════════════════════════
const formStyles = StyleSheet.create({
  section: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.base,
    marginTop: Spacing.base,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    gap: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionHeaderText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },

  // ─── Input Group ───
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  inputContainerFocused: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(32,105,58,0.03)',
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: { elevation: 1 },
    }),
  },
  inputContainerError: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239,68,68,0.03)',
  },
  input: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    padding: 0,
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    minHeight: 16,
  },
  errorText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: '#EF4444',
  },
  charCount: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.textPlaceholder,
  },

  // ─── Read-Only Rows ───
  readOnlyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  readOnlyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  readOnlyLabel: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  readOnlyValue: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  roleBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  roleBadgeText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.xs,
    color: Colors.primary,
    textTransform: 'capitalize',
  },
});
