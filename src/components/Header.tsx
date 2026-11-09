'use client';

import React, { useState, useEffect } from 'react';
import LocalizedLink from './LocalizedLink';
import { useTranslation, Language } from '@/i18n/LanguageContext';

const languages: { code: Language; label: string; name: string }[] = [
  { code: 'cs', label: 'CZ', name: 'Čeština' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'vi', label: 'VI', name: 'Tiếng Việt' },
  { code: 'ru', label: 'RU', name: 'Русский' },
];

function LanguageSwitcher({ stretch = false }: { stretch?: boolean }) {
  const { t, language, setLanguage } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t('header.languageLabel') as string}
      className={
        stretch
          ? 'flex md:hidden w-full border-t border-white/10'
          : 'hidden md:flex items-center'
      }
    >
      {languages.map((lang) => {
        const active = language === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            aria-pressed={active}
            aria-label={lang.name}
            className={`inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-2 text-sm font-semibold tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              stretch ? 'flex-1' : ''
            } ${
              active
                ? 'text-white underline decoration-[#ED0D32] decoration-2 underline-offset-4'
                : 'text-[#e6e6e6] hover:text-white'
            }`}
          >
            {lang.label}
          </button>
        );
      })}
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
            <LanguageSwitcher />

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
        <LanguageSwitcher stretch />
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
          <nav aria-label={servicesLabel} className="pt-6 flex flex-col items-center gap-2">
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
    </>
  );
};

export default Header;
