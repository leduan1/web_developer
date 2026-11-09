'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import LocalizedLink from './LocalizedLink';
import { useTranslation, Language } from '@/i18n/LanguageContext';

const languages: { code: Language; label: string; name: string }[] = [
  { code: 'cs', label: 'CZ', name: 'Čeština' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'vi', label: 'VI', name: 'Tiếng Việt' },
  { code: 'ru', label: 'RU', name: 'Русский' },
];

function LanguageSwitcher({
  inMenu = false,
  forceClose = false,
}: {
  inMenu?: boolean;
  forceClose?: boolean;
}) {
  const { t, language, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reactId = useId();
  const listId = `${reactId}-list`;
  const label = t('header.languageLabel') as string;
  const current = languages.find((lang) => lang.code === language) ?? languages[0];

  useEffect(() => {
    if (!forceClose) return;
    setOpen(false);
    setFocusIndex(null);
  }, [forceClose]);

  useEffect(() => {
    if (!open || focusIndex === null) return;
    optionRefs.current[focusIndex]?.focus();
  }, [open, focusIndex]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setFocusIndex(null);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setOpen(false);
      setFocusIndex(null);
      buttonRef.current?.focus();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const openAt = (index: number) => {
    setFocusIndex(index);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setFocusIndex(null);
  };

  const activeIndex = Math.max(
    0,
    languages.findIndex((lang) => lang.code === language)
  );

  const onButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      openAt(activeIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      openAt(languages.length - 1);
    }
  };

  const onOptionKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocusIndex((index + 1) % languages.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusIndex((index - 1 + languages.length) % languages.length);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setFocusIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setFocusIndex(languages.length - 1);
    } else if (event.key === 'Tab') {
      close();
    }
  };

  const choose = (code: Language) => {
    close();
    setLanguage(code);
  };

  return (
    <div ref={rootRef} className={`relative ${inMenu ? 'flex flex-col items-center' : ''}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label}: ${current.name}`}
        onClick={() => (open ? close() : openAt(activeIndex))}
        onKeyDown={onButtonKeyDown}
        className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-2 text-sm font-semibold tracking-wider text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span>{current.label}</span>
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M2.2 4.2 6 8l3.8-3.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-label={label}
          className={`absolute z-50 min-w-[220px] border border-white/15 bg-[#0a0a0a] py-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)] ${
            inMenu
              ? 'bottom-full left-1/2 mb-2 -translate-x-1/2'
              : 'right-0 top-full mt-1'
          }`}
        >
          {languages.map((lang, index) => {
            const active = language === lang.code;
            return (
              <button
                key={lang.code}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                type="button"
                role="option"
                aria-selected={active}
                aria-label={lang.name}
                lang={lang.code}
                tabIndex={-1}
                onClick={() => choose(lang.code)}
                onKeyDown={(event) => onOptionKeyDown(event, index)}
                className={`flex w-full items-center gap-3 min-h-[44px] border-l-2 px-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white ${
                  active
                    ? 'border-[#ED0D32] bg-white/[0.06] text-white'
                    : 'border-transparent text-[#e6e6e6] hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <span className="w-7 font-semibold tracking-wider">{lang.label}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const nav = t('header.navigation') as Record<string, string>;
  const menuItems = [
    { label: nav.uvod || 'Úvod', href: '/' },
    { label: nav.reference || 'Reference', href: '/reference' },
    { label: nav.oMne || 'O mně', href: '/o-mne' },
    { label: nav.blog || 'Blog', href: '/blog' },
    { label: nav.kontakt || 'Kontakt', href: '/kontakt' },
  ];
  const servicesLabel = t('header.servicesLabel') as string;
  const services = t('header.services') as { href: string; label: string }[];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
        style={isScrolled ? { backgroundColor: 'rgba(10, 10, 10, 0.75)' } : undefined}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5 w-full">
          {/* Logo */}
          <LocalizedLink href="/" className="flex items-center gap-3 hover:opacity-80 transition z-50 relative">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="15" y1="10" x2="85" y2="90" stroke="white" strokeWidth="1" opacity="0.6" />
                <line x1="85" y1="10" x2="15" y2="90" stroke="white" strokeWidth="1" opacity="0.6" />
                <text x="50" y="12" fontSize="18" fontWeight="700" fontFamily="'Inter', sans-serif" fill="white" textAnchor="middle" dominantBaseline="middle">L</text>
                <text x="90" y="50" fontSize="18" fontWeight="700" fontFamily="'Inter', sans-serif" fill="white" textAnchor="middle" dominantBaseline="middle">E</text>
                <text x="50" y="92" fontSize="18" fontWeight="700" fontFamily="'Inter', sans-serif" fill="white" textAnchor="middle" dominantBaseline="middle">D</text>
                <text x="10" y="50" fontSize="18" fontWeight="700" fontFamily="'Inter', sans-serif" fill="white" textAnchor="middle" dominantBaseline="middle">U</text>
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white text-[10px] font-medium tracking-widest uppercase">Web</span>
              <span className="text-white text-[10px] font-medium tracking-widest uppercase">developer</span>
            </div>
          </LocalizedLink>

          <div className="flex items-center gap-4 md:gap-6 z-50 relative">
            <LanguageSwitcher forceClose={isMenuOpen} />

            {/* Kontakt button */}
            <LocalizedLink
              href="/kontakt"
              className="hidden md:inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-white bg-red-600 hover:bg-red-700 px-5 py-2 transition-colors"
            >
              {t('header.kontaktButton') as string}
            </LocalizedLink>

            {/* Menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 text-white min-h-[44px] px-1"
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
            >
              <span className="text-sm font-medium tracking-wider uppercase">{t('header.menu') as string}</span>
              <div className="flex flex-col justify-center items-center w-7 h-7">
                <span
                  className={`block h-[2px] w-6 bg-white transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-[0px]' : '-translate-y-[4px]'
                  }`}
                />
                <span
                  className={`block h-[2px] w-6 bg-white transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-[2px] w-6 bg-white transition-all duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45 translate-y-[0px]' : 'translate-y-[4px]'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <div
        id="site-menu"
        className={`fixed inset-0 z-[45] bg-black transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6">
          <div className="flex-1 flex flex-col items-center justify-center gap-5 md:gap-7 overflow-y-auto">
            {menuItems.map((item, i) => (
              <LocalizedLink
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`font-condensed text-4xl md:text-6xl lg:text-7xl text-white/60 hover:text-white transition-all duration-500 uppercase tracking-wider transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${150 + i * 80}ms` : '0ms',
                }}
              >
                {item.label}
              </LocalizedLink>
            ))}
          </div>
          <div className="pt-6 flex flex-col items-center gap-2">
            {isMenuOpen && <LanguageSwitcher inMenu />}
            <nav aria-label={servicesLabel} className="flex flex-col items-center gap-2">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{servicesLabel}</p>
              <ul className="flex flex-wrap justify-center gap-x-5">
                {services.map((service) => (
                  <li key={service.href}>
                    <LocalizedLink
                      href={service.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="inline-flex items-center min-h-[44px] text-sm font-bold uppercase tracking-widest text-white/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {service.label}
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
