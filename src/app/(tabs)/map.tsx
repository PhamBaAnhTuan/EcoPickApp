import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, ActivityIndicator, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

import { Colors, Fonts, FontSizes, BorderRadius, Spacing } from '../../constants';
import {
  SearchBar,
  SeverityChip,
  ReportsBottomSheet,
} from '../../components';
import {
  INITIAL_REGION,
  SEVERITY_FILTERS,
  SeverityLevel,
  WasteReport,
} from '../../data/mockData';
import { getSeverityIcon } from '../../utils/severity';
import { formatDistanceInfo, formatRouteInfo } from '../../utils/distance';
import { useTranslation } from 'react-i18next';
import { useReports } from '../../hooks/useReportQueries';
import type { Report } from '../../api/services/reportService';

// ─── Marker Design Config ───────────────────────────────────────────
const MARKER_THEMES: Record<SeverityLevel, { bg: string; border: string; icon: string; glow: string }> = {
  light: {
    bg: '#16A34A',
    border: '#15803D',
    icon: 'leaf',
    glow: 'rgba(22, 163, 74, 0.25)',
  },
  medium: {
    bg: '#F59E0B',
    border: '#D97706',
    icon: 'alert-circle',
    glow: 'rgba(245, 158, 11, 0.25)',
  },
  heavy: {
    bg: '#EF4444',
    border: '#DC2626',
    icon: 'trash',
    glow: 'rgba(239, 68, 68, 0.25)',
  },
  extreme: {
    bg: '#8B5CF6',
    border: '#7C3AED',
    icon: 'warning',
    glow: 'rgba(139, 92, 246, 0.25)',
  },
};

// ─── Clean Map Style — hide everything except project markers ───────
const CUSTOM_MAP_STYLE = [
  // Hide all POI icons and labels
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  // Hide transit icons and labels
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
  // Hide road icons (keep road lines and text labels)
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  // Hide business labels
  {
    featureType: 'poi.business',
    stylers: [{ visibility: 'off' }],
  },
  // Hide government labels
  {
    featureType: 'poi.government',
    stylers: [{ visibility: 'off' }],
  },
  // Hide medical labels
  {
    featureType: 'poi.medical',
    stylers: [{ visibility: 'off' }],
  },
  // Hide school labels
  {
    featureType: 'poi.school',
    stylers: [{ visibility: 'off' }],
  },
  // Hide sports complex labels
  {
    featureType: 'poi.sports_complex',
    stylers: [{ visibility: 'off' }],
  },
  // Hide place of worship
  {
    featureType: 'poi.place_of_worship',
    stylers: [{ visibility: 'off' }],
  },
  // Subtle water color
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#d4eaf7' }],
  },
  // Lighter landscape
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [{ color: '#f0f4f0' }],
  },
  // Subtle road colors
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#e8e8e8' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#d0d0d0' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [{ color: '#f0f0f0' }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [{ color: '#f8f8f8' }],
  },
  // Muted road labels
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }],
  },
];

// ─── Custom Marker Component ────────────────────────────────────────
const CustomMarkerView = React.memo(({ severity }: { severity: SeverityLevel }) => {
  const theme = MARKER_THEMES[severity];
  return (
    <View style={markerStyles.wrapper}>
      {/* Glow / shadow circle */}
      <View style={[markerStyles.glow, { backgroundColor: theme.glow }]} />
      {/* Main circle */}
      <View style={[markerStyles.circle, { backgroundColor: theme.bg, borderColor: theme.border }]}>
        <Ionicons
          name={theme.icon as keyof typeof Ionicons.glyphMap}
          size={18}
          color="#FFFFFF"
        />
      </View>
      {/* Triangle pointer */}
      <View style={[markerStyles.pointer, { borderTopColor: theme.bg }]} />
    </View>
  );
});

CustomMarkerView.displayName = 'CustomMarkerView';

const markerStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: 52,
    height: 58,
  },
  glow: {
    position: 'absolute',
    top: -2,
    width: 48,
    height: 48,
    borderRadius: 24,
    opacity: 0.6,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -2,
    // Shadow for pointer
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

// ─── API severity → UI severity mapping ─────────────────────────────
const API_SEVERITY_TO_UI: Record<string, SeverityLevel> = {
  low: 'light',
  medium: 'medium',
  high: 'heavy',
  critical: 'extreme',
};

/** Transform API Report → UI WasteReport */
function transformReportToWasteReport(r: Report): WasteReport {
  return {
    id: r.id,
    title: r.location || r.title || r.address || `Report #${r.id.slice(0, 6)}`,
    description: r.description || '',
    severity: API_SEVERITY_TO_UI[r.severity || 'low'] || 'light',
    distance: '',
    latitude: r.latitude || 0,
    longitude: r.longitude || 0,
  };
}

// ─── Main MapScreen ─────────────────────────────────────────────────
export default function MapScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ destLat?: string; destLng?: string; destTitle?: string }>();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<SeverityLevel>>(
    new Set(['light', 'medium', 'heavy', 'extreme']),
  );

  // ── Fetch reports from API ──
  const { data: apiReports = [], isLoading: isLoadingReports } = useReports();
  const allReports: WasteReport[] = useMemo(
    () => apiReports.map(transformReportToWasteReport),
    [apiReports],
  );

  // Routing State
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  const [isRouting, setIsRouting] = useState(false);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [routingDestTitle, setRoutingDestTitle] = useState('');
  const [routeDistance, setRouteDistance] = useState('');
  const [routeDuration, setRouteDuration] = useState('');
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);

  // Compute real distance + motorbike time for each report based on user location
  const reportsWithDistance: WasteReport[] = useMemo(() => {
    if (!userLocation) return allReports;
    const uLat = userLocation.coords.latitude;
    const uLng = userLocation.coords.longitude;
    return allReports.map((r) => ({
      ...r,
      distance: formatDistanceInfo(uLat, uLng, r.latitude, r.longitude),
    }));
  }, [userLocation, allReports]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(t('map.permissionDenied'), t('map.locationDenied'));
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, []);

  // Handle incoming route params from deep linking
  useEffect(() => {
    if (params.destLat && params.destLng && userLocation) {
      calculateRoute(
        userLocation.coords.latitude,
        userLocation.coords.longitude,
        parseFloat(params.destLat),
        parseFloat(params.destLng),
        params.destTitle || 'Destination'
      );
    }
  }, [params.destLat, params.destLng, params.destTitle, userLocation]);

  const calculateRoute = async (startLat: number, startLng: number, destLat: number, destLng: number, title: string) => {
    setIsLoadingRoute(true);
    setRoutingDestTitle(title);

    try {
      // OSRM coordinates are in longitude, latitude format
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${destLng},${destLat}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coords = route.geometry.coordinates.map((coord: [number, number]) => ({
          latitude: coord[1],
          longitude: coord[0]
        }));

        // Extract real distance (meters) and duration (seconds) from OSRM
        const routeInfo = formatRouteInfo(route.distance, route.duration);
        setRouteDistance(routeInfo.distance);
        setRouteDuration(routeInfo.duration);

        setRouteCoordinates(coords);
        setIsRouting(true);

        // Fit map to show both start and end points
        if (mapRef.current) {
          mapRef.current.fitToCoordinates(
            [
              { latitude: startLat, longitude: startLng },
              { latitude: destLat, longitude: destLng }
            ],
            {
              edgePadding: { top: 120, right: 60, bottom: 120, left: 60 },
              animated: true,
            }
          );
        }
      } else {
        Alert.alert(t('map.routeErrorTitle'), t('map.routeError'));
      }
    } catch (error) {
      Alert.alert(t('common.error'), t('map.fetchError'));
      console.error(error);
    } finally {
      setIsLoadingRoute(false);
    }
  };

  const cancelRoute = () => {
    setIsRouting(false);
    setRouteCoordinates([]);
    setRoutingDestTitle('');
    setRouteDistance('');
    setRouteDuration('');
    // Clear params
    router.setParams({ destLat: '', destLng: '', destTitle: '' });
  };

  const toggleFilter = useCallback((severity: SeverityLevel) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(severity)) {
        if (next.size > 1) {
          next.delete(severity);
        }
      } else {
        next.add(severity);
      }
      return next;
    });
  }, []);

  const filteredReports = reportsWithDistance.filter((r) => activeFilters.has(r.severity));
  const filteredMarkers = reportsWithDistance.filter((m) => activeFilters.has(m.severity));

  const handleMyLocation = useCallback(async () => {
    try {
      if (userLocation && mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          },
          1000
        );
      } else {
        // Try requesting it
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          setUserLocation(location);
          if (mapRef.current) {
            mapRef.current.animateToRegion(
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
              },
              1000
            );
          }
        } else {
          Alert.alert(t('map.permissionDenied'), t('map.locationSettings'));
        }
      }
    } catch (e) {
      console.log('Error getting location: ', e);
    }
  }, [userLocation]);

  const handleFilterPress = useCallback(() => {
    Alert.alert(t('map.filtersTitle'), t('map.filtersMessage'), [{ text: t('common.ok') }]);
  }, []);

  const handleNavigateReport = useCallback(
    (report: WasteReport) => {
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: report.latitude,
            longitude: report.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          800,
        );
      }
      router.push(`/location/${report.id}`);
    },
    [router],
  );

  const handleViewReport = useCallback((report: WasteReport) => {
    router.push(`/location/${report.id}`);
  }, [router]);

  const handleMarkerClick = useCallback(
    (marker: WasteReport) => {
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: marker.latitude,
            longitude: marker.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          },
          800,
        );
      }
      router.push(`/location/${marker.id}`);
    },
    [router],
  );

  const renderMap = () => {
    return (
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsIndoors={false}
        showsTraffic={false}
        customMapStyle={CUSTOM_MAP_STYLE}
        mapPadding={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        {/* Waste Report Markers — from API */}
        {filteredMarkers
          .filter((m) => m.latitude && m.longitude)
          .map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            onPress={() => handleMarkerClick(marker)}
            tracksViewChanges={false}
            anchor={{ x: 0.5, y: 1 }}
          >
            <CustomMarkerView severity={marker.severity} />
          </Marker>
        ))}

        {/* Route Polyline — smooth with rounded caps */}
        {isRouting && routeCoordinates.length > 0 && (
          <>
            {/* Shadow/outline polyline for depth effect */}
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="rgba(32, 105, 58, 0.15)"
              strokeWidth={10}
              lineCap="round"
              lineJoin="round"
            />
            {/* Main route polyline */}
            <Polyline
              coordinates={routeCoordinates}
              strokeColor={Colors.primary}
              strokeWidth={5}
              lineCap="round"
              lineJoin="round"
            />
          </>
        )}
      </MapView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Map */}
      {renderMap()}

      {/* Routing Banner Overlay */}
      {isRouting && (
        <View style={[styles.routingBanner, { top: insets.top + 16 }]}>
          <View style={styles.routingInfo}>
            <View style={styles.routingIconBg}>
              <Ionicons name="navigate" size={18} color={Colors.primary} />
            </View>
            <View style={styles.routingTextContainer}>
              <Text style={styles.routingLabel}>{t('map.routingLabel')}</Text>
              <Text style={styles.routingText} numberOfLines={1}>{routingDestTitle}</Text>
              {/* Route stats: distance + duration */}
              {(routeDistance || routeDuration) && (
                <View style={styles.routeStatsRow}>
                  {routeDistance ? (
                    <View style={styles.routeStatChip}>
                      <Ionicons name="speedometer-outline" size={12} color={Colors.primary} />
                      <Text style={styles.routeStatText}>{routeDistance}</Text>
                    </View>
                  ) : null}
                  {routeDuration ? (
                    <View style={styles.routeStatChip}>
                      <Ionicons name="time-outline" size={12} color={Colors.primary} />
                      <Text style={styles.routeStatText}>{routeDuration}</Text>
                    </View>
                  ) : null}
                </View>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={cancelRoute} style={styles.cancelRouteBtn} activeOpacity={0.7}>
            <Ionicons name="close" size={18} color="#DC2626" />
          </TouchableOpacity>
        </View>
      )}

      {/* Loading Overlay */}
      {isLoadingRoute && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>{t('map.loadingRoute')}</Text>
          </View>
        </View>
      )}

      {/* Top overlay - Search + Filters (Hide when routing) */}
      {!isRouting && (
        <View style={[styles.topOverlay, { paddingTop: insets.top + 24 }]}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} onFilterPress={handleFilterPress} />
          <View style={styles.filtersRow}>
            {SEVERITY_FILTERS.map((filter) => (
              <SeverityChip
                key={filter.key}
                severity={filter.key}
                label={filter.label}
                selected={activeFilters.has(filter.key)}
                onPress={() => toggleFilter(filter.key)}
              />
            ))}
          </View>
        </View>
      )}

      {/* Floating buttons — right-aligned vertical stack */}
      <View style={[styles.floatingButtons, isRouting && { bottom: 32 }]}>
        <TouchableOpacity style={styles.locationButton} onPress={handleMyLocation} activeOpacity={0.7}>
          <Ionicons name="locate" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Sheets Container - Highest z-index (Hide when routing) */}
      {!isRouting && (
        <View style={[StyleSheet.absoluteFillObject, { zIndex: 999, elevation: 999 }]} pointerEvents="box-none">
          {/* Reports list sheet */}
          <ReportsBottomSheet
            reports={filteredReports}
            totalCount={filteredReports.length}
            onNavigateReport={handleNavigateReport}
            onViewReport={handleViewReport}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.base,
    gap: 12,
    zIndex: 10,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 8,
  },
  floatingButtons: {
    position: 'absolute',
    right: Spacing.base,
    bottom: 220,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  locationButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  routingBanner: {
    position: 'absolute',
    left: Spacing.base,
    right: Spacing.base,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  routingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  routingIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routingTextContainer: {
    flex: 1,
  },
  routingLabel: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  routingText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  routeStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  routeStatChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  routeStatText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    color: Colors.primary,
  },
  cancelRouteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 32,
    paddingVertical: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
});
