/**
 * Distance & duration utilities
 * - Haversine formula for straight-line distance
 * - Road distance estimation (× 1.4 factor)
 * - Motorbike travel time estimation (~30 km/h in city)
 * - dayjs-based smart duration formatting (giây / phút / giờ / ngày)
 */

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

// ─── Haversine ──────────────────────────────────────────────────────

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Calculate straight-line distance between two coordinates using Haversine formula
 * @returns distance in kilometers
 */
export function calculateHaversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// ─── Distance formatting ────────────────────────────────────────────

/** Approximate road distance = straight-line distance × 1.4 */
const ROAD_FACTOR = 1.4;

/** Average motorbike speed in Vietnamese city traffic (km/h) */
const MOTORBIKE_SPEED_KMH = 30;

/**
 * Format distance in km (or m if < 1 km)
 */
export function formatDistance(straightLineKm: number): string {
  const roadKm = straightLineKm * ROAD_FACTOR;
  if (roadKm < 1) {
    return `${Math.round(roadKm * 1000)}m`;
  }
  return `${roadKm.toFixed(1)} km`;
}

/**
 * Format road distance in km from meters (OSRM returns meters)
 */
export function formatRoadDistanceFromMeters(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

// ─── Duration formatting (dayjs) ────────────────────────────────────

/**
 * Smart format duration from seconds using dayjs
 * Auto picks the best unit:
 *   < 60s        → "45 giây"
 *   < 60min      → "12 phút"
 *   < 24h        → "1 giờ 25 phút"
 *   >= 24h       → "1 ngày 3 giờ"
 */
export function formatDuration(totalSeconds: number): string {
  const dur = dayjs.duration(totalSeconds, 'seconds');

  const days = Math.floor(dur.asDays());
  const hours = dur.hours();
  const minutes = dur.minutes();
  const seconds = dur.seconds();

  if (days > 0) {
    if (hours > 0) {
      return `${days} ngày ${hours} giờ`;
    }
    return `${days} ngày`;
  }

  if (hours > 0) {
    if (minutes > 0) {
      return `${hours} giờ ${minutes} phút`;
    }
    return `${hours} giờ`;
  }

  if (minutes > 0) {
    return `${minutes} phút`;
  }

  return `${seconds} giây`;
}

/**
 * Estimate motorbike travel time in minutes from haversine distance
 */
export function estimateMotorbikeMinutes(straightLineKm: number): number {
  const roadKm = straightLineKm * ROAD_FACTOR;
  const minutes = (roadKm / MOTORBIKE_SPEED_KMH) * 60;
  return Math.max(1, Math.round(minutes));
}

// ─── Combined formatters ────────────────────────────────────────────

/**
 * Format distance info for report cards (estimated, from haversine)
 * e.g. "1.2 km • ~4 phút" or "800m • ~2 phút"
 */
export function formatDistanceInfo(
  userLat: number,
  userLng: number,
  destLat: number,
  destLng: number,
): string {
  const straightLine = calculateHaversineDistance(userLat, userLng, destLat, destLng);
  const dist = formatDistance(straightLine);
  const seconds = estimateMotorbikeMinutes(straightLine) * 60;
  return `${dist} • ~${formatDuration(seconds)}`;
}

/**
 * Format route info from OSRM response (real road distance + duration)
 * @param distanceMeters  - from OSRM routes[0].distance (meters)
 * @param durationSeconds - from OSRM routes[0].duration (seconds)
 * @returns { distance: "3.2 km", duration: "12 phút", combined: "3.2 km • 12 phút" }
 */
export function formatRouteInfo(distanceMeters: number, durationSeconds: number) {
  const distance = formatRoadDistanceFromMeters(distanceMeters);
  const duration = formatDuration(durationSeconds);
  return {
    distance,
    duration,
    combined: `${distance} • ${duration}`,
  };
}
