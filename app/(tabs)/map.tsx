import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, Polyline } from 'react-native-maps';
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
  MOCK_REPORTS,
  MAP_MARKERS,
  INITIAL_REGION,
  SEVERITY_FILTERS,
  SeverityLevel,
  WasteReport,
} from '../../data/mockData';

const MARKER_COLORS: Record<SeverityLevel, string> = {
  light: '#16A34A',
  medium: '#EAB308',
  heavy: '#DC2626',
  extreme: '#9333EA',
};

const CUSTOM_MAP_STYLE = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
];

export default function MapScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ destLat?: string; destLng?: string; destTitle?: string }>();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<SeverityLevel>>(
    new Set(['light', 'medium', 'heavy', 'extreme']),
  );

  // Routing State
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  const [isRouting, setIsRouting] = useState(false);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [routingDestTitle, setRoutingDestTitle] = useState('');
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission to access location was denied');
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
        const coords = data.routes[0].geometry.coordinates.map((coord: [number, number]) => ({
          latitude: coord[1],
          longitude: coord[0]
        }));
        
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
              edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
              animated: true,
            }
          );
        }
      } else {
        Alert.alert("Route Error", "Could not find a route to this destination.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch routing data.");
      console.error(error);
    } finally {
      setIsLoadingRoute(false);
    }
  };

  const cancelRoute = () => {
    setIsRouting(false);
    setRouteCoordinates([]);
    setRoutingDestTitle('');
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

  const filteredReports = MOCK_REPORTS.filter((r) => activeFilters.has(r.severity));
  const filteredMarkers = MAP_MARKERS.filter((m) => activeFilters.has(m.severity));

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
          Alert.alert('Permission denied', 'Go to settings to enable location permission.');
        }
      }
    } catch (e) {
      console.log('Error getting location: ', e);
    }
  }, [userLocation]);

  const handleFilterPress = useCallback(() => {
    Alert.alert('Filters', 'Advanced filter options would appear here.', [{ text: 'OK' }]);
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
      // Assuming navigation logic will be handled here since detailSheet is removed
      router.push(`/location/${report.id}`);
    },
    [router],
  );

  const handleViewReport = useCallback((report: WasteReport) => {
    // Navigate to the location details screen
    router.push(`/location/${report.id}`);
  }, [router]);

  const handleMarkerClick = useCallback(
    (marker: { id?: string }) => {
      const report = MOCK_REPORTS.find((r) => r.id === marker.id);
      if (report) {
        // Zoom to marker location and navigate to details
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              latitude: report.latitude,
              longitude: report.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            },
            800,
          );
        }
        router.push(`/location/${report.id}`);
      }
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
        customMapStyle={CUSTOM_MAP_STYLE}
      >
        {filteredMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            pinColor={MARKER_COLORS[marker.severity]}
            onPress={() => handleMarkerClick(marker)}
          />
        ))}

        {/* User Location Marker */}
        {userLocation && (
          <Marker
            coordinate={{ 
              latitude: userLocation.coords.latitude, 
              longitude: userLocation.coords.longitude 
            }}
            title="My Location"
            pinColor={Colors.primary}
          />
        )}

        {/* Route Polyline */}
        {isRouting && routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor={Colors.primary}
            strokeWidth={4}
            lineDashPattern={[0]}
          />
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
            <Ionicons name="navigate-circle" size={24} color={Colors.primary} />
            <Text style={styles.routingText} numberOfLines={1}>Navigating to {routingDestTitle}</Text>
          </View>
          <TouchableOpacity onPress={cancelRoute} style={styles.cancelRouteBtn}>
            <Ionicons name="close" size={20} color="#DC2626" />
          </TouchableOpacity>
        </View>
      )}

      {/* Loading Overlay */}
      {isLoadingRoute && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Calculating route...</Text>
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
  cameraButton: {
    width: 56,
    height: 56,
    borderRadius: 9999,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
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
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  routingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  routingText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    flex: 1,
  },
  cancelRouteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2', // light red
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
});
