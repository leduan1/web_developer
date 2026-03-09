'use client';

import React, { useState, useEffect } from 'react';
import LocalizedLink from './LocalizedLink';
import { useTranslation, Language } from '@/i18n/LanguageContext';

const languages: { code: Language; label: string }[] = [
  { code: 'cs', label: 'CZ' },
  { code: 'en', label: 'EN' },
  { code: 'vi', label: 'VI' },
  { code: 'ru', label: 'RU' },
];

const Header: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
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
            {/* Language switcher */}
            <div className="flex items-center gap-1">
              {languages.map((lang, i) => (
                <React.Fragment key={lang.code}>
                  <button
                    onClick={() => setLanguage(lang.code)}
                    className={`text-[10px] md:text-xs font-medium tracking-wider transition-colors ${
                      language === lang.code
                        ? 'text-red-500'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    {lang.label}
                  </button>
                  {i < languages.length - 1 && (
                    <span className="text-white/20 text-[10px]">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

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
              className="flex items-center gap-3 text-white"
              aria-label="Toggle menu"
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
        className={`fixed inset-0 z-40 bg-black transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 md:gap-8">
          {menuItems.map((item, i) => (
            <LocalizedLink
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`font-condensed text-5xl md:text-7xl lg:text-8xl text-white/60 hover:text-white transition-all duration-500 uppercase tracking-wider transform ${
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
      </div>
    </>
  );
};

export default Header;
