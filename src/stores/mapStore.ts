import { create } from 'zustand';
import type { SeverityLevel, WasteReport, WasteType, ReportStatus } from '../data/mockData';

// ─── Filter Types ───────────────────────────────────────────────────
export interface MapFilters {
  severity: SeverityLevel[];
  wasteTypes: WasteType[];
  distanceRange: number; // km
  status: ReportStatus[];
}

const DEFAULT_FILTERS: MapFilters = {
  severity: ['light', 'medium', 'heavy', 'extreme'],
  wasteTypes: [],
  distanceRange: 50,
  status: ['reported', 'in_progress'],
};

// ─── Store Types ────────────────────────────────────────────────────
interface MapState {
  // Search
  searchQuery: string;
  isSearchFocused: boolean;
  recentSearches: string[];

  // Filters
  filters: MapFilters;
  isFilterSheetOpen: boolean;

  // Selection
  selectedMarker: WasteReport | null;
  markerSheetIndex: number; // -1 = hidden, 0 = collapsed, 1 = expanded

  // Loading
  isLoading: boolean;

  // Routing
  isRouting: boolean;
  routeCoordinates: { latitude: number; longitude: number }[];
  routeInfo: { distance: string; duration: string; destTitle: string } | null;
  isLoadingRoute: boolean;

  // Actions — Search
  setSearchQuery: (query: string) => void;
  setSearchFocused: (focused: boolean) => void;
  addRecentSearch: (query: string) => void;
  removeRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Actions — Filters
  setFilters: (filters: Partial<MapFilters>) => void;
  toggleSeverityFilter: (severity: SeverityLevel) => void;
  toggleWasteTypeFilter: (type: WasteType) => void;
  toggleStatusFilter: (status: ReportStatus) => void;
  setDistanceRange: (km: number) => void;
  resetFilters: () => void;
  setFilterSheetOpen: (open: boolean) => void;

  // Actions — Selection
  selectMarker: (marker: WasteReport | null) => void;
  setMarkerSheetIndex: (index: number) => void;

  // Actions — Loading
  setLoading: (loading: boolean) => void;

  // Actions — Routing
  setRouting: (routing: boolean) => void;
  setRouteCoordinates: (coords: { latitude: number; longitude: number }[]) => void;
  setRouteInfo: (info: { distance: string; duration: string; destTitle: string } | null) => void;
  setLoadingRoute: (loading: boolean) => void;
  cancelRoute: () => void;
}

// ─── Store ──────────────────────────────────────────────────────────
export const useMapStore = create<MapState>((set) => ({
  // ── Initial State ──
  searchQuery: '',
  isSearchFocused: false,
  recentSearches: [],

  filters: { ...DEFAULT_FILTERS },
  isFilterSheetOpen: false,

  selectedMarker: null,
  markerSheetIndex: -1,

  isLoading: false,

  isRouting: false,
  routeCoordinates: [],
  routeInfo: null,
  isLoadingRoute: false,

  // ── Search Actions ──
  setSearchQuery: (query) => set({ searchQuery: query }),

  setSearchFocused: (focused) => set({ isSearchFocused: focused }),

  addRecentSearch: (query) =>
    set((state) => ({
      recentSearches: [query, ...state.recentSearches.filter((q) => q !== query)].slice(0, 10),
    })),

  removeRecentSearch: (query) =>
    set((state) => ({
      recentSearches: state.recentSearches.filter((q) => q !== query),
    })),

  clearRecentSearches: () => set({ recentSearches: [] }),

  // ── Filter Actions ──
  setFilters: (partial) =>
    set((state) => ({
      filters: { ...state.filters, ...partial },
    })),

  toggleSeverityFilter: (severity) =>
    set((state) => {
      const current = state.filters.severity;
      const next = current.includes(severity)
        ? current.length > 1
          ? current.filter((s) => s !== severity)
          : current // don't allow empty
        : [...current, severity];
      return { filters: { ...state.filters, severity: next } };
    }),

  toggleWasteTypeFilter: (type) =>
    set((state) => {
      const current = state.filters.wasteTypes;
      const next = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type];
      return { filters: { ...state.filters, wasteTypes: next } };
    }),

  toggleStatusFilter: (status) =>
    set((state) => {
      const current = state.filters.status;
      const next = current.includes(status)
        ? current.length > 1
          ? current.filter((s) => s !== status)
          : current
        : [...current, status];
      return { filters: { ...state.filters, status: next } };
    }),

  setDistanceRange: (km) =>
    set((state) => ({
      filters: { ...state.filters, distanceRange: km },
    })),

  resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),

  setFilterSheetOpen: (open) => set({ isFilterSheetOpen: open }),

  // ── Selection Actions ──
  selectMarker: (marker) =>
    set({
      selectedMarker: marker,
      markerSheetIndex: marker ? 0 : -1,
    }),

  setMarkerSheetIndex: (index) => set({ markerSheetIndex: index }),

  // ── Loading ──
  setLoading: (loading) => set({ isLoading: loading }),

  // ── Routing Actions ──
  setRouting: (routing) => set({ isRouting: routing }),

  setRouteCoordinates: (coords) => set({ routeCoordinates: coords }),

  setRouteInfo: (info) => set({ routeInfo: info }),

  setLoadingRoute: (loading) => set({ isLoadingRoute: loading }),

  cancelRoute: () =>
    set({
      isRouting: false,
      routeCoordinates: [],
      routeInfo: null,
      isLoadingRoute: false,
    }),
}));
