import type en from './locales/en.json';

// ─── Type-safe i18n ───
// This file provides full TypeScript autocomplete for translation keys.
// When you type t('settings.'), the IDE will suggest all available keys
// like 'settings.title', 'settings.language', 'settings.notifications', etc.
//
// The type is derived from en.json (source of truth).
// Structure: t('namespace.key') → e.g. t('settings.title'), t('common.cancel')
//
// Available namespaces:
// common | tabs | map | search | severity | report | permissions
// events | eventDetail | location | profile | badges | reportSuccess
// bottomSheet | reportCard | markerSheet | settings | duration

type TranslationResources = typeof en;

// Helper: flatten nested keys for deep autocomplete
// Converts { settings: { title: "..." } } → "settings.title"
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

// Export the flattened key type for external use
export type TranslationKey = NestedKeyOf<TranslationResources>;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: TranslationResources;
    };
  }
}
