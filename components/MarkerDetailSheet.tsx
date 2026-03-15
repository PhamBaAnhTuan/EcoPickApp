import { Ionicons } from '@expo/vector-icons';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import BottomSheetLib, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BorderRadius, Colors, Fonts, FontSizes, LineHeights, Spacing } from '../constants';
import { SeverityLevel, WasteReport } from '../data/mockData';
import { getSeverityIcon, getSeverityTheme } from '../utils/severity';

export interface MarkerDetailSheetRef {
  show: (report: WasteReport) => void;
  dismiss: () => void;
}

interface MarkerDetailSheetProps {
  onNavigate?: (report: WasteReport) => void;
}

const SEVERITY_LABELS: Record<SeverityLevel, string> = {
  light: 'Light',
  medium: 'Medium',
  heavy: 'Heavy',
  extreme: 'Extreme',
};

export const MarkerDetailSheet = forwardRef<MarkerDetailSheetRef, MarkerDetailSheetProps>(({ onNavigate }, ref) => {
  const sheetRef = useRef<BottomSheetLib>(null);
  const snapPoints = useMemo(() => [320], []);
  const [report, setReport] = React.useState<WasteReport | null>(null);

  useImperativeHandle(ref, () => ({
    show: (r: WasteReport) => {
      setReport(r);
      sheetRef.current?.snapToIndex(0);
    },
    dismiss: () => {
      sheetRef.current?.close();
    },
  }));

  const handleNavigate = useCallback(() => {
    if (!report) return;
    onNavigate?.(report);
    // Open native maps
    const scheme = Platform.select({ ios: 'maps:', android: 'geo:' });
    const url = Platform.select({
      ios: `${scheme}?daddr=${report.latitude},${report.longitude}`,
      android: `${scheme}${report.latitude},${report.longitude}?q=${report.latitude},${report.longitude}(${report.title})`,
    });
    if (url) Linking.openURL(url).catch(() => {});
  }, [report, onNavigate]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.3} pressBehavior="close" />
    ),
    [],
  );

  const theme = report ? getSeverityTheme(report.severity) : null;
  const icon = report ? getSeverityIcon(report.severity) : null;
  const severityLabel = report ? SEVERITY_LABELS[report.severity] : '';

  return (
    <BottomSheetLib
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBg}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetView style={styles.content}>
        {report && theme && icon ? (
          <>
            {/* Header row */}
            <View style={styles.headerRow}>
              <View style={[styles.iconBox, { backgroundColor: icon.bgColor }]}>
                <Ionicons name={icon.name as keyof typeof Ionicons.glyphMap} size={24} color={theme.dotColor} />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.title}>{report.title}</Text>
                <Text style={styles.subtitle}>{report.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => sheetRef.current?.close()}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Ionicons name="close" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Info chips */}
            <View style={styles.chipsRow}>
              <View style={[styles.chip, { backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }]}>
                <View style={[styles.chipDot, { backgroundColor: theme.dotColor }]} />
                <Text style={[styles.chipText, { color: theme.textColor }]}>{severityLabel}</Text>
              </View>
              <View style={styles.chipInfo}>
                <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.chipInfoText}>{report.distance}</Text>
              </View>
              <View style={styles.chipInfo}>
                <Ionicons name="navigate-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.chipInfoText}>
                  {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                </Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.navigateBtn} onPress={handleNavigate} activeOpacity={0.8}>
                <Ionicons name="navigate" size={18} color={Colors.white} />
                <Text style={styles.navigateBtnText}>Navigate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareBtn} onPress={() => sheetRef.current?.close()} activeOpacity={0.8}>
                <Ionicons name="share-outline" size={18} color={Colors.primary} />
                <Text style={styles.shareBtnText}>Share</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </BottomSheetView>
    </BottomSheetLib>
  );
});

MarkerDetailSheet.displayName = 'MarkerDetailSheet';

const styles = StyleSheet.create({
  sheetBg: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 24,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 9999,
    backgroundColor: Colors.divider,
    alignSelf: 'center',
    marginVertical: 8,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.lg,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    lineHeight: LineHeights.lg,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chipText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
  },
  chipInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chipInfoText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
    color: Colors.textSecondary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  navigateBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  navigateBtnText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.white,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.md,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  shareBtnText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.primary,
  },
});
