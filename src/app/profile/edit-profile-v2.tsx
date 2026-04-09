/**
 * edit-profile-v2.tsx
 *
 * EditProfileScreenV2 — Màn hình chỉnh sửa hồ sơ người dùng (phiên bản 2)
 *
 * Khác biệt so với v1:
 *  - Comment đầy đủ từng bước xử lý
 *  - Logic handleSubmit rõ ràng: chỉ gửi các field thực sự thay đổi
 *  - Tách handleSubmit rõ ràng với animation, payload build, và error handling
 *  - Hỗ trợ upload ảnh avatar và banner (pending state)
 *  - Form được quản lý bằng react-hook-form + zodResolver
 */

import { useUpdateUser, useUserInfo } from '@/hooks/useUserQueries';
import { profileSchema, type ProfileFormData } from '@/lib/validations/profile';
import { useAuthStore } from '@/stores/authStore';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
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

// ─── Constants ───────────────────────────────────────────────────────────────
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = 160;
const AVATAR_SIZE = 88;
const BIO_MAX_LENGTH = 200;

const DEFAULT_AVATAR =
  'https://bizweb.dktcdn.net/100/324/808/files/san-pham-co-nguon-goc-thien-nhien.jpg?v=1702028320944';
const DEFAULT_BANNER =
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80';

// ─── FormInput Component (memoized) ──────────────────────────────────────────
/**
 * FormInput
 * Component input tái sử dụng, được memo hóa để tránh re-render không cần thiết
 * khi component cha cập nhật state khác (ví dụ: isSaving).
 * Điều này ngăn bàn phím bị tắt khi người dùng đang nhập.
 */
const FormInput = React.memo(function FormInput({
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
  // Trạng thái focus nội bộ — chỉ ảnh hưởng tới style, không trigger re-render cha
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={formStyles.inputGroup}>
      {/* Label hiển thị phía trên input */}
      <Text style={formStyles.label}>{label}</Text>

      {/* Wrapper container với border focus/error */}
      <View
        style={[
          formStyles.inputContainer,
          isFocused && formStyles.inputContainerFocused,
          error ? formStyles.inputContainerError : null,
          multiline && { minHeight: 100, alignItems: 'flex-start' as const },
        ]}
      >
        {/* Icon bên trái (nếu có) */}
        {icon && (
          <Ionicons
            name={icon as any}
            size={18}
            color={isFocused ? Colors.primary : Colors.textSecondary}
            style={{ marginTop: multiline ? 14 : 0 }}
          />
        )}

        {/* Ô nhập liệu thực sự */}
        <TextInput
          style={[
            formStyles.input,
            multiline && { textAlignVertical: 'top', minHeight: 80 },
          ]}
          value={value}
          onChangeText={onChangeText}          // Được truyền vào từ Controller của react-hook-form
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

      {/* Footer: hiển thị lỗi validation hoặc đếm ký tự */}
      <View style={formStyles.inputFooter}>
        {error ? (
          <Text style={formStyles.errorText}>{error}</Text>
        ) : (
          <View />
        )}
        {charCount && maxLength ? (
          <Text
            style={[
              formStyles.charCount,
              value.length >= maxLength && { color: '#EF4444' },
            ]}
          >
            {value.length}/{maxLength}
          </Text>
        ) : null}
      </View>
    </View>
  );
});

// ─── SectionHeader Component ──────────────────────────────────────────────────
/** Tiêu đề của mỗi nhóm field trong form */
function SectionHeader({ title, icon }: { title: string; icon: string }) {
  return (
    <View style={formStyles.sectionHeader}>
      <Ionicons name={icon as any} size={18} color={Colors.primary} />
      <Text style={formStyles.sectionHeaderText}>{title}</Text>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
export default function EditProfileScreenV2() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  // ─── Data Hooks ─────────────────────────────────────────────────────────────
  const updateUserMutation = useUpdateUser();       // Mutation PATCH /api/users/{id}/
  const { data: apiUser, refetch } = useUserInfo(); // Query GET /api/users/userinfo/
  const storeUser = useAuthStore((s) => s.user);    // User từ Zustand store (fallback)

  // Ưu tiên dùng data từ API, fallback về store nếu chưa load xong
  const user = apiUser ?? storeUser;

  // ─── Form Setup ─────────────────────────────────────────────────────────────
  /**
   * useForm với zodResolver:
   * - Validation tự động theo profileSchema
   * - react-hook-form chỉ re-render component khi cần (không re-render FormInput khi gõ)
   * - isDirty: true khi form có bất kỳ field nào khác với defaultValues
   */
  const {
    control,          // Truyền vào <Controller> để liên kết TextInput với form
    handleSubmit,     // Wrapper bọc onSubmit, tự validate trước khi gọi
    formState: { errors, isDirty }, // errors: lỗi theo từng field; isDirty: form có thay đổi không
    reset,            // Reset form về defaultValues (dùng khi load user data)
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: '',
      bio: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      website: '',
    },
  });

  // ─── Image State ────────────────────────────────────────────────────────────
  // Ảnh đã chọn nhưng chưa upload — chỉ upload khi nhấn Lưu
  const [pendingAvatar, setPendingAvatar] = useState<PickedImage | null>(null);
  const [pendingBanner, setPendingBanner] = useState<PickedImage | null>(null);

  // ─── UI State ───────────────────────────────────────────────────────────────
  const [isSaving, setIsSaving] = useState(false);

  // ─── Animation ──────────────────────────────────────────────────────────────
  const saveButtonScale = useRef(new Animated.Value(1)).current;

  // ─── Initialize Form with User Data ─────────────────────────────────────────
  /**
   * Chỉ gọi reset() một lần duy nhất khi user data lần đầu tiên có sẵn.
   * Dùng ref để tránh reset lại form (và mất dữ liệu đang nhập) khi user thay đổi.
   */
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (user && !hasInitialized.current) {
      reset({
        fullname: user.fullname || '',
        bio: user.bio || '',
        phone: user.phone_number || '',
        address: user.address || '',
        dateOfBirth: user.date_of_birth || '',
        website: '',
      });
      hasInitialized.current = true;
    }
  }, [user, reset]);

  // Form có thay đổi = field text dirty HOẶC có ảnh pending
  const hasChanges = isDirty || pendingAvatar !== null || pendingBanner !== null;

  // ─── Image Pick Handlers ─────────────────────────────────────────────────────
  /**
   * Mở thư viện ảnh để chọn avatar (tỉ lệ 1:1).
   * Ảnh được lưu vào pendingAvatar state, chưa upload lên server.
   */
  const handleChangeAvatar = useCallback(async () => {
    const result = await pickImage({
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    if (result.success) {
      // Lưu ảnh đã chọn vào state pending
      setPendingAvatar(result.images[0]);
    } else if (result.reason === 'permission_denied') {
      Toast.show({
        type: 'error',
        text1: t('report.galleryPermissionRequired'),
      });
    }
  }, [t]);

  /**
   * Mở thư viện ảnh để chọn banner (tỉ lệ 16:9).
   */
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
      Toast.show({
        type: 'error',
        text1: t('report.galleryPermissionRequired'),
      });
    }
  }, [t]);

  // ─── Submit Handler ──────────────────────────────────────────────────────────
  /**
   * onSubmit — được gọi bởi handleSubmit() sau khi validation thành công
   *
   * Luồng xử lý:
   * 1. Hiệu ứng nhấn nút
   * 2. Xây dựng payload — chỉ bao gồm các field thực sự thay đổi so với user hiện tại
   * 3. Nếu có ảnh avatar mới → thêm vào payload
   * 4. Gọi API PATCH nếu payload không rỗng
   * 5. Cập nhật optimistic lên Zustand store
   * 6. Refetch user info để đồng bộ cache
   * 7. Hiển thị toast thành công → quay lại màn hình trước
   */
  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.id) return;

    // ── Bước 1: Animation nút lưu ──
    Animated.sequence([
      Animated.timing(saveButtonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(saveButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsSaving(true);

    try {
      // ── Bước 2: Xây dựng payload chỉ chứa các field thay đổi ──
      const payload: Record<string, any> = {};

      // So sánh từng field với giá trị gốc từ server
      if (data.fullname.trim() !== (user.fullname || '')) {
        payload.fullname = data.fullname.trim();
      }
      if (data.bio !== (user.bio || '')) {
        payload.bio = data.bio ?? '';
      }
      if (data.phone !== (user.phone_number || '')) {
        payload.phone_number = data.phone ?? '';
      }
      if (data.address !== (user.address || '')) {
        payload.address = data.address ?? '';
      }
      if (data.dateOfBirth !== (user.date_of_birth || '')) {
        payload.date_of_birth = data.dateOfBirth ?? '';
      }

      // ── Bước 3: Thêm avatar nếu người dùng đã chọn ảnh mới ──
      if (pendingAvatar) {
        payload.avatar = pendingAvatar.file;
      }

      // ── Bước 4: Gọi API chỉ khi có field thay đổi ──
      if (Object.keys(payload).length > 0) {
        await updateUserMutation.mutateAsync({
          id: user.id,
          payload,
        });
      }

      // ── Bước 5: Cập nhật optimistic vào Zustand store ngay lập tức ──
      // Giúp UI hiển thị thông tin mới mà không cần chờ refetch
      useAuthStore.getState().updateUser({
        fullname: data.fullname.trim() || user.fullname,
        bio: data.bio || user.bio,
        phone_number: data.phone || user.phone_number,
        address: data.address || user.address,
        date_of_birth: data.dateOfBirth || user.date_of_birth,
      } as any);

      // ── Bước 6: Refetch để đồng bộ cache với server ──
      refetch();

      // ── Bước 7: Thông báo thành công và quay lại ──
      Toast.show({
        type: 'success',
        text1: 'Cập nhật thành công',
        text2: 'Hồ sơ của bạn đã được lưu.',
      });
      router.back();
    } catch (err) {
      // Xử lý lỗi API — hiển thị thông báo lỗi cho người dùng
      console.error('[EditProfileV2] Update failed:', err);
      Toast.show({
        type: 'error',
        text1: 'Cập nhật thất bại',
        text2: 'Đã có lỗi xảy ra. Vui lòng thử lại.',
      });
    } finally {
      // Dù thành công hay thất bại, luôn tắt trạng thái loading
      setIsSaving(false);
    }
  };

  // ─── Cancel Handler ──────────────────────────────────────────────────────────
  /**
   * Xử lý khi người dùng nhấn nút Hủy.
   * Nếu có thay đổi chưa lưu → hiển thị Dialog xác nhận trước khi thoát.
   */
  const handleCancel = useCallback(() => {
    if (hasChanges) {
      Alert.alert(
        'Hủy thay đổi?',
        'Bạn có thay đổi chưa được lưu. Bạn có chắc muốn thoát không?',
        [
          { text: 'Tiếp tục chỉnh sửa', style: 'cancel' },
          {
            text: 'Hủy thay đổi',
            style: 'destructive',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      router.back();
    }
  }, [hasChanges, router]);

  // ─── Derived Image URIs ──────────────────────────────────────────────────────
  // Ưu tiên: ảnh pending (vừa chọn) > ảnh từ API > ảnh mặc định
  const avatarUri = pendingAvatar?.uri || user?.avatar || DEFAULT_AVATAR;
  const bannerUri = pendingBanner?.uri || DEFAULT_BANNER;

  // ═══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════════
  return (
    <View style={styles.container}>

      {/* ─── Header Bar ─── */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        {/* Nút Hủy */}
        <TouchableOpacity
          style={styles.headerBtn}
          activeOpacity={0.7}
          onPress={handleCancel}
        >
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        {/* Tiêu đề */}
        <Text style={styles.headerTitle}>{t('profile.editProfile')}</Text>

        {/* Nút Lưu với animation scale */}
        <Animated.View style={{ transform: [{ scale: saveButtonScale }] }}>
          <TouchableOpacity
            style={[
              styles.saveBtn,
              (!hasChanges || isSaving) && styles.saveBtnDisabled,
            ]}
            activeOpacity={0.7}
            onPress={handleSubmit(onSubmit)}  // handleSubmit validate → gọi onSubmit
            disabled={!hasChanges || isSaving} // Disabled khi không có thay đổi hoặc đang lưu
          >
            {isSaving ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Text style={styles.saveBtnText}>{t('common.save')}</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* ─── Scroll Content với KeyboardAvoidingView ─── */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Cho phép tap vào input khi bàn phím đang mở
        >
          {/* ══════════════════════════════════════════════════════ */}
          {/* BANNER + AVATAR                                        */}
          {/* ══════════════════════════════════════════════════════ */}
          <View style={styles.mediaSection}>

            {/* Banner — nhấn để chọn ảnh mới */}
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
                  <Text style={styles.changeBannerText}>{t('profile.changeCover')}</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Avatar — nhấn để chọn ảnh mới */}
            <View style={styles.avatarSection}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleChangeAvatar}
                style={styles.avatarWrapper}
              >
                <View style={styles.avatarBorder}>
                  <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                </View>
                {/* Overlay camera icon lên avatar */}
                <View style={styles.avatarEditOverlay}>
                  <Ionicons name="camera" size={20} color={Colors.white} />
                </View>
              </TouchableOpacity>
              <Text style={styles.changeAvatarText}>{t('profile.changePhoto')}</Text>
            </View>
          </View>

          {/* ══════════════════════════════════════════════════════ */}
          {/* BASIC INFO — Các field có thể chỉnh sửa               */}
          {/* ══════════════════════════════════════════════════════ */}
          <View style={formStyles.section}>
            <SectionHeader title={t('profile.basicInfo')} icon="person-outline" />

            {/* Họ và tên */}
            <Controller
              control={control}
              name="fullname"
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t('profile.fullName')}
                  value={value}
                  onChangeText={onChange}   // onChange từ Controller cập nhật giá trị trong form
                  placeholder="Nhập họ và tên"
                  icon="person-outline"
                  autoCapitalize="words"
                  error={errors.fullname?.message}
                />
              )}
            />

            {/* Bio / giới thiệu bản thân */}
            <Controller
              control={control}
              name="bio"
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t('profile.bio')}
                  value={value || ''}
                  onChangeText={onChange}
                  placeholder="Giới thiệu bản thân và hành trình eco của bạn..."
                  icon="chatbubble-outline"
                  multiline
                  maxLength={BIO_MAX_LENGTH}
                  charCount                 // Hiển thị bộ đếm ký tự 0/200
                  error={errors.bio?.message}
                />
              )}
            />

            {/* Số điện thoại */}
            <Controller
              control={control}
              name="phone"
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t('profile.phoneNumber')}
                  value={value || ''}
                  onChangeText={onChange}
                  placeholder="+84 xxx xxx xxx"
                  icon="call-outline"
                  keyboardType="phone-pad"  // Bàn phím số điện thoại
                  error={errors.phone?.message}
                />
              )}
            />

            {/* Địa chỉ */}
            <Controller
              control={control}
              name="address"
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t('profile.address')}
                  value={value || ''}
                  onChangeText={onChange}
                  placeholder="Thành phố hoặc địa điểm của bạn"
                  icon="location-outline"
                  error={errors.address?.message}
                />
              )}
            />

            {/* Ngày sinh */}
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t('profile.dateOfBirth')}
                  value={value || ''}
                  onChangeText={onChange}
                  placeholder="YYYY-MM-DD"
                  icon="calendar-outline"
                  error={errors.dateOfBirth?.message}
                />
              )}
            />
          </View>

          {/* ══════════════════════════════════════════════════════ */}
          {/* SOCIAL LINKS                                           */}
          {/* ══════════════════════════════════════════════════════ */}
          <View style={formStyles.section}>
            <SectionHeader title={t('profile.socialLinks')} icon="globe-outline" />

            {/* Website */}
            <Controller
              control={control}
              name="website"
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t('profile.website')}
                  value={value || ''}
                  onChangeText={onChange}
                  placeholder="https://your-website.com"
                  icon="link-outline"
                  keyboardType="url"
                  autoCapitalize="none"
                  error={errors.website?.message}
                />
              )}
            />
          </View>

          {/* ══════════════════════════════════════════════════════ */}
          {/* ACCOUNT INFO — Chỉ đọc, không chỉnh sửa              */}
          {/* ══════════════════════════════════════════════════════ */}
          <View style={formStyles.section}>
            <SectionHeader title={t('profile.account')} icon="shield-checkmark-outline" />

            {/* Email (read-only) */}
            <View style={formStyles.readOnlyRow}>
              <View style={formStyles.readOnlyLeft}>
                <Ionicons name="mail-outline" size={16} color={Colors.textSecondary} />
                <Text style={formStyles.readOnlyLabel}>{t('profile.email')}</Text>
              </View>
              <Text style={formStyles.readOnlyValue}>{user?.email || '—'}</Text>
            </View>

            {/* Role badge (read-only) */}
            <View style={formStyles.readOnlyRow}>
              <View style={formStyles.readOnlyLeft}>
                <Ionicons name="shield-checkmark-outline" size={16} color={Colors.textSecondary} />
                <Text style={formStyles.readOnlyLabel}>{t('profile.role')}</Text>
              </View>
              <View style={formStyles.roleBadge}>
                <Text style={formStyles.roleBadgeText}>{user?.role?.name ?? 'user'}</Text>
              </View>
            </View>

            {/* Eco Points (read-only) */}
            <View style={formStyles.readOnlyRow}>
              <View style={formStyles.readOnlyLeft}>
                <Ionicons name="star-outline" size={16} color={Colors.textSecondary} />
                <Text style={formStyles.readOnlyLabel}>{t('profile.ecoPoints')}</Text>
              </View>
              <Text style={formStyles.readOnlyValue}>{user?.eco_points ?? 0}</Text>
            </View>
          </View>

          {/* Khoảng trống cuối trang */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLES — MAIN
// ═══════════════════════════════════════════════════════════════════════════════
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

  // ─── Media Section ───
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

// ═══════════════════════════════════════════════════════════════════════════════
// STYLES — FORM
// ═══════════════════════════════════════════════════════════════════════════════
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
