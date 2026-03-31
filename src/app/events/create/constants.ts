import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons';

export const createEventSchema = z.object({
  title: z.string().min(1, 'common.required'),
  description: z.string().optional(),
  location: z.string().min(1, 'common.required'),
  maxParticipants: z.number().min(1).default(30),
  ecoPointReward: z.number().min(0).default(50),
});

export type CreateEventFormData = z.infer<typeof createEventSchema>;

export const STEPS = [
  { key: 'details', labelKey: 'createEvent.steps.details', icon: 'document-text' as keyof typeof Ionicons.glyphMap },
  { key: 'schedule', labelKey: 'createEvent.steps.schedule', icon: 'calendar' as keyof typeof Ionicons.glyphMap },
  { key: 'settings', labelKey: 'createEvent.steps.settings', icon: 'settings' as keyof typeof Ionicons.glyphMap }
];

export const EVENT_TYPES = [
  { id: 'cleanup', icon: 'trash-bin', label: 'createEvent.types.cleanup' },
  { id: 'education', icon: 'book', label: 'createEvent.types.education' },
  { id: 'planting', icon: 'leaf', label: 'createEvent.types.planting' },
] as const;

export const DIFFICULTIES = [
  { id: 'easy', label: 'createEvent.difficulty.easy' },
  { id: 'medium', label: 'createEvent.difficulty.medium' },
  { id: 'hard', label: 'createEvent.difficulty.hard' }
] as const;

export const EQUIPMENT_OPTIONS = [
  'Gloves',
  'Trash bags',
  'Pickers',
  'Water',
  'Sunscreen',
  'First aid kit'
] as const;
