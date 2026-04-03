
export const PARTICIPANT_AVATARS = [
  'https://i.pravatar.cc/100?u=p1',
  'https://i.pravatar.cc/100?u=p2',
  'https://i.pravatar.cc/100?u=p3',
  'https://i.pravatar.cc/100?u=p4',
];

export const CHAT_AVATAR = 'https://i.pravatar.cc/100?u=sarah';

export const formatDate = (iso: string): string => {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};

export const formatTime = (iso: string): string => {
  try {
    return new Date(iso).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return '';
  }
};

export const formatEventType = (type: string | null | undefined): string => {
  if (!type) return '';
  return type
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

export const parseEquipment = (
  equip: string | null | undefined,
): { name: string; status: 'BRING OWN' | 'PROVIDED' }[] => {
  if (!equip) return [];
  return equip
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name, i) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      status: i % 2 === 0 ? ('BRING OWN' as const) : ('PROVIDED' as const),
    }));
};
export default {
  PARTICIPANT_AVATARS,
  CHAT_AVATAR,
  formatDate,
}