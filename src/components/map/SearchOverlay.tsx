import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BorderRadius, Colors, Fonts, FontSizes, LineHeights, Spacing } from '../../constants';
import type { WasteReport } from '../../data/mockData';
import { getSeverityTheme } from '../../utils/severity';

interface SearchOverlayProps {
  visible: boolean;
  query: string;
  onQueryChange: (text: string) => void;
  onClose: () => void;
  onSelectReport: (report: WasteReport) => void;
  recentSearches: string[];
  onRemoveRecent: (query: string) => void;
  onClearRecents: () => void;
  reports: WasteReport[];
}

export function SearchOverlay({
  visible,
  query,
  onQueryChange,
  onClose,
  onSelectReport,
  recentSearches,
  onRemoveRecent,
  onClearRecents,
  reports,
}: SearchOverlayProps) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const inputRef = useRef<TextInput>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, damping: 20, stiffness: 200, useNativeDriver: true }),
      ]).start();
      // Auto-focus with small delay to allow animation to start
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -20, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim]);

  // Filtered reports based on query
  const filteredReports = useMemo(() => {
    if (!query.trim()) return reports.slice(0, 5); // show nearby by default
    const lower = query.toLowerCase();
    return reports
      .filter((r) => r.title.toLowerCase().includes(lower) || r.description.toLowerCase().includes(lower))
      .slice(0, 8);
  }, [query, reports]);

  const handleClose = useCallback(() => {
    Keyboard.dismiss();
    onClose();
  }, [onClose]);

  const handleSelectReport = useCallback(
    (report: WasteReport) => {
      Keyboard.dismiss();
      onSelectReport(report);
    },
    [onSelectReport],
  );

  if (!visible) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      {/* Backdrop */}
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose} />

      {/* Content */}
      <Animated.View style={[styles.content, { paddingTop: insets.top, transform: [{ translateY: slideAnim }] }]}>
        {/* Search Input Row */}
        <View style={styles.searchRow}>
          <TouchableOpacity onPress={handleClose} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <Ionicons name="search-outline" size={16} color={Colors.textPlaceholder} />
            <TextInput
              ref={inputRef}
              value={query}
              onChangeText={onQueryChange}
              placeholder={t('search.placeholder')}
              placeholderTextColor={Colors.textPlaceholder}
              style={styles.input}
              returnKeyType="search"
              autoCorrect={false}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => onQueryChange('')} activeOpacity={0.7}>
                <Ionicons name="close-circle" size={18} color={Colors.textPlaceholder} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={handleClose} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="mic" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Results Area */}
        <View style={styles.resultsArea}>
          {/* Recent Searches (only when no query) */}
          {!query.trim() && recentSearches.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t('search.recentSearches', 'Recent Searches')}</Text>
                <TouchableOpacity onPress={onClearRecents} activeOpacity={0.7}>
                  <Text style={styles.clearBtn}>{t('search.clearAll', 'Clear all')}</Text>
                </TouchableOpacity>
              </View>
              {recentSearches.slice(0, 5).map((item, i) => (
                <TouchableOpacity
                  key={`recent-${i}`}
                  style={styles.recentItem}
                  activeOpacity={0.7}
                  onPress={() => onQueryChange(item)}
                >
                  <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
                  <Text style={styles.recentText} numberOfLines={1}>
                    {item}
                  </Text>
                  <TouchableOpacity
                    onPress={() => onRemoveRecent(item)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="close" size={14} color={Colors.textPlaceholder} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Search Results / Nearby Reports */}
          <View style={[styles.section, { flex: 1 }]}>
            <Text style={styles.sectionTitle}>
              {query.trim() ? t('search.results', 'Search Results') : t('search.nearbyReports', 'Nearby Reports')}
            </Text>
            <FlatList
              data={filteredReports}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <SearchResultCard report={item} onPress={() => handleSelectReport(item)} />}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              keyboardShouldPersistTaps="handled"
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="search" size={32} color={Colors.textPlaceholder} />
                  <Text style={styles.emptyText}>{t('search.noResults', 'No results found')}</Text>
                </View>
              }
            />
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

// ─── Search Result Card ─────────────────────────────────────────────
function SearchResultCard({ report, onPress }: { report: WasteReport; onPress: () => void }) {
  const theme = getSeverityTheme(report.severity);

  return (
    <TouchableOpacity style={cardStyles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[cardStyles.iconBox, { backgroundColor: theme.backgroundColor }]}>
        <Ionicons name="location" size={18} color={theme.dotColor} />
      </View>
      <View style={cardStyles.textContainer}>
        <Text style={cardStyles.title} numberOfLines={1}>
          {report.title}
        </Text>
        <Text style={cardStyles.description} numberOfLines={1}>
          {report.description}
        </Text>
        <View style={cardStyles.metaRow}>
          {report.distance ? (
            <View style={cardStyles.metaChip}>
              <Ionicons name="bicycle-outline" size={10} color={Colors.textSecondary} />
              <Text style={cardStyles.metaText}>{report.distance}</Text>
            </View>
          ) : null}
          <View
            style={[
              cardStyles.severityBadge,
              { backgroundColor: theme.backgroundColor, borderColor: theme.borderColor },
            ]}
          >
            <View style={[cardStyles.severityDot, { backgroundColor: theme.dotColor }]} />
            <Text style={[cardStyles.severityText, { color: theme.textColor }]}>
              {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
            </Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color={Colors.textPlaceholder} />
    </TouchableOpacity>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    elevation: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 20,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  resultsArea: {
    flex: 1,
    paddingTop: Spacing.md,
  },
  section: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  clearBtn: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.primary,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  recentText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    color: Colors.textPlaceholder,
  },
});

const cardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: 12,
    gap: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  severityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  severityText: {
    fontFamily: Fonts.semiBold,
    fontSize: 10,
  },
});
