export type SeverityLevel = 'light' | 'medium' | 'heavy' | 'extreme';

export interface WasteReport {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  /** Computed distance string, e.g. "1.2 km • ~4 phút" */
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
    title: 'Hẻm Nguyễn Trãi, Q.1',
    description: 'Rác thải sinh hoạt chất đống',
    severity: 'heavy',
    distance: 'Đang tính...',
    latitude: 10.7626,
    longitude: 106.6865,
  },
  {
    id: '2',
    title: 'Công viên Tao Đàn',
    description: 'Rác vứt bừa bãi sau sự kiện',
    severity: 'medium',
    distance: 'Đang tính...',
    latitude: 10.774,
    longitude: 106.692,
  },
  {
    id: '3',
    title: 'Bến Bạch Đằng, Q.1',
    description: 'Rác nhựa trôi dạt ven sông',
    severity: 'light',
    distance: 'Đang tính...',
    latitude: 10.787,
    longitude: 106.705,
  },
  {
    id: '4',
    title: 'Kênh Nhiêu Lộc - Thị Nghè',
    description: 'Ô nhiễm nghiêm trọng trên kênh',
    severity: 'extreme',
    distance: 'Đang tính...',
    latitude: 10.785,
    longitude: 106.675,
  },
  {
    id: '5',
    title: 'Chợ Bến Thành, Q.1',
    description: 'Rác thải nhẹ quanh khu chợ',
    severity: 'light',
    distance: 'Đang tính...',
    latitude: 10.7725,
    longitude: 106.698,
  },
  {
    id: '6',
    title: 'Kênh Tàu Hủ, Q.8',
    description: 'Rác thải công nghiệp đổ trộm',
    severity: 'heavy',
    distance: 'Đang tính...',
    latitude: 10.748,
    longitude: 106.663,
  },
  {
    id: '7',
    title: 'Chợ Bình Tây, Q.6',
    description: 'Rác chợ tràn ra đường',
    severity: 'medium',
    distance: 'Đang tính...',
    latitude: 10.749,
    longitude: 106.647,
  },
  {
    id: '8',
    title: 'Công viên Gia Định, Gò Vấp',
    description: 'Rác nhẹ rải rác trong công viên',
    severity: 'light',
    distance: 'Đang tính...',
    latitude: 10.813,
    longitude: 106.683,
  },
  {
    id: '9',
    title: 'Khu vực Đa Phước, Bình Chánh',
    description: 'Bãi rác quá tải, ô nhiễm nặng',
    severity: 'extreme',
    distance: 'Đang tính...',
    latitude: 10.665,
    longitude: 106.61,
  },
  {
    id: '10',
    title: 'Khu đô thị Thủ Thiêm, Q.2',
    description: 'Rác xây dựng vứt bỏ',
    severity: 'medium',
    distance: 'Đang tính...',
    latitude: 10.787,
    longitude: 106.723,
  },
  {
    id: '11',
    title: 'Phố Bùi Viện, Q.1',
    description: 'Rác thải sau giờ kinh doanh đêm',
    severity: 'heavy',
    distance: 'Đang tính...',
    latitude: 10.768,
    longitude: 106.694,
  },
  {
    id: '12',
    title: 'Công viên Lê Văn Tám, Q.1',
    description: 'Rác nhẹ quanh khu vực tập thể dục',
    severity: 'light',
    distance: 'Đang tính...',
    latitude: 10.787,
    longitude: 106.696,
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
  latitude: 10.7626,
  longitude: 106.6865,
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
