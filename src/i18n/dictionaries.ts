import cs from './translations/cs.json';
import en from './translations/en.json';
import vi from './translations/vi.json';
import ru from './translations/ru.json';
import type { Locale } from '@/config/site';

const dictionaries = { cs, en, vi, ru };

export type Dictionary = typeof cs;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.cs;
}
