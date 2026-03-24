import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import vi from './locales/vi.json';

const LANGUAGE_KEY = '@ecopick_language';

export const resources = {
  en: { translation: en },
  vi: { translation: vi },
} as const;

/**
 * Detect the best initial language:
 * 1. Previously saved language from AsyncStorage
 * 2. Device locale from expo-localization
 * 3. Fallback to 'en'
 */
async function getInitialLanguage(): Promise<string> {
  try {
    const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (saved && (saved === 'en' || saved === 'vi')) return saved;
  } catch {}

  // Detect from device locale
  const locales = Localization.getLocales();
  if (locales && locales.length > 0) {
    const deviceLang = locales[0].languageCode;
    if (deviceLang === 'vi') return 'vi';
  }

  return 'en';
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default, will be overridden by loadSavedLanguage
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

/**
 * Load saved language from storage and apply it.
 * Call this in your root layout's useEffect.
 */
export async function loadSavedLanguage(): Promise<void> {
  const lang = await getInitialLanguage();
  if (lang !== i18n.language) {
    await i18n.changeLanguage(lang);
  }
}

/**
 * Change language and persist the choice.
 * The entire app re-renders automatically via react-i18next.
 */
export async function setLanguage(lang: string): Promise<void> {
  await i18n.changeLanguage(lang);
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  } catch {}
}

export default i18n;
