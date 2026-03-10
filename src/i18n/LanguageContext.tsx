'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import cs from './translations/cs.json';
import en from './translations/en.json';
import vi from './translations/vi.json';
import ru from './translations/ru.json';

export type Language = 'cs' | 'en' | 'vi' | 'ru';

const translations: Record<Language, Record<string, unknown>> = { cs, en, vi, ru };
const LOCALE_PREFIXES: Language[] = ['en', 'vi', 'ru'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string) => any;
  getLocalizedHref: (href: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'cs',
  setLanguage: () => {},
  t: (key: string) => key,
  getLocalizedHref: (href: string) => href,
});

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current: unknown, key: string) => {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/** Extract language from a URL pathname: /en/reference -> 'en', /reference -> 'cs' */
function getLanguageFromPathname(pathname: string): Language {
  const match = pathname.match(/^\/(en|vi|ru)(\/|$)/);
  return match ? (match[1] as Language) : 'cs';
}

/** Strip locale prefix: /en/reference -> /reference, /vi -> / */
function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|vi|ru)(\/|$)/, '/$2');
  return stripped || '/';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const nextPathname = usePathname();

  const [language, setLanguageState] = useState<Language>('cs');
  const [mounted, setMounted] = useState(false);
  const languageRef = useRef<Language>('cs');

  // 1) On INITIAL MOUNT only: read language from the actual browser URL
  useEffect(() => {
    const browserPath = window.location.pathname;
    const urlLang = getLanguageFromPathname(browserPath);
    setLanguageState(urlLang);
    languageRef.current = urlLang;
    document.documentElement.lang = urlLang;
    setMounted(true);

    // Handle browser back/forward — re-read language from URL
    const handlePopState = () => {
      const path = window.location.pathname;
      const lang = getLanguageFromPathname(path);
      setLanguageState(lang);
      languageRef.current = lang;
      document.documentElement.lang = lang;
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Switch language = navigate to new URL
  const setLanguage = useCallback((lang: Language) => {
    if (lang === languageRef.current) return;

    const browserPath = window.location.pathname;
    const cleanPath = stripLocalePrefix(browserPath);

    let newPath: string;
    if (lang === 'cs') {
      newPath = cleanPath;
    } else {
      newPath = `/${lang}${cleanPath === '/' ? '' : cleanPath}`;
    }

    setLanguageState(lang);
    languageRef.current = lang;
    document.documentElement.lang = lang;

    // Use hard navigation when switching to/from localized paths
    // to avoid stale rewrites from middleware
    if (lang === 'cs' && LOCALE_PREFIXES.some(l => browserPath.startsWith(`/${l}/`) || browserPath === `/${l}`)) {
      window.location.href = newPath;
    } else {
      router.push(newPath);
    }
  }, [router]);

  /** Prefix href with current language for Link components */
  const getLocalizedHref = useCallback((href: string): string => {
    const lang = languageRef.current;
    if (lang === 'cs') return href;
    // Don't double-prefix if href already has a locale
    if (LOCALE_PREFIXES.some(l => href.startsWith(`/${l}/`) || href === `/${l}`)) {
      return href;
    }
    return `/${lang}${href === '/' ? '' : href}`;
  }, []); // stable — reads from ref

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = useCallback((key: string): any => {
    const value = getNestedValue(translations[language], key);
    if (value !== undefined) return value;
    const fallback = getNestedValue(translations.cs, key);
    if (fallback !== undefined) return fallback;
    return key;
  }, [language]);

  const contextValue = useMemo(() => ({
    language, setLanguage, t, getLocalizedHref,
  }), [language, setLanguage, t, getLocalizedHref]);

  // Hydration guard: render Czech on first server render
  if (!mounted) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const csT = (key: string): any => {
      const value = getNestedValue(translations.cs, key);
      return value !== undefined ? value : key;
    };
    return (
      <LanguageContext.Provider value={{ language: 'cs', setLanguage, t: csT, getLocalizedHref: (h) => h }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  return { t: ctx.t, language: ctx.language, setLanguage: ctx.setLanguage, getLocalizedHref: ctx.getLocalizedHref };
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  return { language: ctx.language, setLanguage: ctx.setLanguage, getLocalizedHref: ctx.getLocalizedHref };
}
