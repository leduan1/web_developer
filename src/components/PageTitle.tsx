'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/i18n/LanguageContext';

/**
 * Sets the document title based on the current language translation.
 * Usage: <PageTitle translationKey="pages.kontakt.title" />
 */
export default function PageTitle({ translationKey }: { translationKey: string }) {
  const { t } = useTranslation();
  const title = t(translationKey) as string;

  useEffect(() => {
    if (title && title !== translationKey) {
      document.title = title;
    }
  }, [title, translationKey]);

  return null;
}
