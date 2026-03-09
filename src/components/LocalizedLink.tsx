'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';

type LinkProps = React.ComponentProps<typeof Link>;

/**
 * A wrapper around Next.js Link that automatically adds the current language prefix.
 * Czech (cs) = no prefix, others get /en, /vi, /ru prefix.
 */
const LocalizedLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function LocalizedLink({ href, ...props }, ref) {
    const { getLocalizedHref } = useLanguage();

    const localizedHref = typeof href === 'string'
      ? getLocalizedHref(href)
      : href;

    return <Link ref={ref} href={localizedHref} {...props} />;
  }
);

export default LocalizedLink;
