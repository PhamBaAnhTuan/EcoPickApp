export type SeverityLevel = 'light' | 'medium' | 'heavy' | 'extreme';

export interface WasteReport {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  distance: string;
  latitude: number;
  longitude: number;
}

export interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  severity: SeverityLevel;
  title: string;
}

export const MOCK_REPORTS: WasteReport[] = [
  {
    id: '1',
    title: 'Oak Street Alley',
    description: 'Heavy waste',
    severity: 'heavy',
    distance: '200m away',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: '2',
    title: 'Lakeside Park Path',
    description: 'Medium litter',
    severity: 'medium',
    distance: '450m away',
    latitude: 37.7849,
    longitude: -122.4094,
  },
  {
    id: '3',
    title: 'Marina Boulevard',
    description: 'Light debris',
    severity: 'light',
    distance: '600m away',
    latitude: 37.8049,
    longitude: -122.4294,
  },
  {
    id: '4',
    title: 'Sunset District Corner',
    description: 'Extreme pollution',
    severity: 'extreme',
    distance: '1.2km away',
    latitude: 37.7549,
    longitude: -122.4894,
  },
  {
    id: '5',
    title: 'Golden Gate Vista',
    description: 'Light waste',
    severity: 'light',
    distance: '800m away',
    latitude: 37.808,
    longitude: -122.4177,
  },
  {
    id: '6',
    title: 'Mission Creek Trail',
    description: 'Heavy dumping',
    severity: 'heavy',
    distance: '350m away',
    latitude: 37.77,
    longitude: -122.393,
  },
  {
    id: '7',
    title: 'Chinatown Market',
    description: 'Medium litter',
    severity: 'medium',
    distance: '500m away',
    latitude: 37.7941,
    longitude: -122.4078,
  },
  {
    id: '8',
    title: 'Pacific Heights Park',
    description: 'Light debris',
    severity: 'light',
    distance: '900m away',
    latitude: 37.792,
    longitude: -122.435,
  },
  {
    id: '9',
    title: 'SOMA Warehouse Area',
    description: 'Extreme waste',
    severity: 'extreme',
    distance: '1.5km away',
    latitude: 37.778,
    longitude: -122.395,
  },
  {
    id: '10',
    title: "Fisherman's Wharf",
    description: 'Medium litter',
    severity: 'medium',
    distance: '1.1km away',
    latitude: 37.808,
    longitude: -122.4177,
  },
  {
    id: '11',
    title: 'North Beach Alley',
    description: 'Heavy waste',
    severity: 'heavy',
    distance: '750m away',
    latitude: 37.8,
    longitude: -122.41,
  },
  {
    id: '12',
    title: 'Union Square Path',
    description: 'Light debris',
    severity: 'light',
    distance: '300m away',
    latitude: 37.788,
    longitude: -122.4075,
  },
];

export const MAP_MARKERS: MapMarker[] = MOCK_REPORTS.map((r) => ({
  id: r.id,
  latitude: r.latitude,
  longitude: r.longitude,
  severity: r.severity,
  title: r.title,
}));

export const INITIAL_REGION = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const SEVERITY_FILTERS: { key: SeverityLevel; label: string }[] = [
  { key: 'light', label: 'Light' },
  { key: 'medium', label: 'Medium' },
  { key: 'heavy', label: 'Heavy' },
  { key: 'extreme', label: 'Extreme' },
];

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  latitude?: number;
  longitude?: number;
  participants: number;
  image: string;
  isOrganizer?: boolean;
  type?: string;
  description?: string;
  distance?: string;
  equipment?: { name: string; status: 'BRING OWN' | 'PROVIDED' }[];
  confirmedCount?: number;
}

export const MOCK_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Community Forest Replanting',
    date: 'Oct 24, 2023',
    time: '10:00 AM',
    location: 'Community Forest',
    participants: 12,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop',
    isOrganizer: true,
    type: 'Community Event',
    description: "Help us restore the natural beauty of the north bank. We'll be collecting plastic waste and clearing invasive ivy.",
    distance: '2.4 KM ROUTE',
    confirmedCount: 8,
    equipment: [
      { name: 'Work Gloves', status: 'BRING OWN' },
      { name: 'Waste Bags', status: 'PROVIDED' },
      { name: 'Water & Snacks', status: 'BRING OWN' },
    ],
  },
  {
    id: '2',
    title: 'Coastal Cleanup Drive',
    date: 'Oct 28, 2023',
    time: '08:30 AM',
    location: 'Coastal Beach',
    participants: 45,
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80fbea5?w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Urban Recycling Workshop',
    date: 'Nov 02, 2023',
    time: '02:00 PM',
    location: 'City Center',
    participants: 8,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop',
    isOrganizer: true,
  },
];
