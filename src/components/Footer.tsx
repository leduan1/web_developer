'use client';

import React from 'react';
import LocalizedLink from './LocalizedLink';
import { useTranslation } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative w-full bg-[#0a0a0a] py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start mb-16">
          {/* Left - Heading, email, availability */}
          <ScrollReveal animation="left">
            <h2 className="font-condensed text-5xl md:text-7xl lg:text-8xl text-white uppercase mb-4 leading-none">
              {t('footer.heading') as string}
            </h2>

            {/* Email in giant outline text */}
            <div className="mb-8">
              <a
                href="mailto:info@ledu.cz"
                className="block group"
              >
                <span
                  className="font-condensed text-4xl md:text-6xl lg:text-8xl uppercase leading-none transition-all duration-300"
                  style={{
                    WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                >
                  INFO@LEDU.CZ
                </span>
              </a>
            </div>

            {/* Availability indicator */}
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <p className="text-green-400 text-sm">
                {t('footer.availability') as string}
              </p>
            </div>
          </ScrollReveal>

          {/* Right - NAPIŠTE MI circle */}
          <ScrollReveal animation="scale" delay={2} className="flex justify-center lg:justify-end">
            <LocalizedLink
              href="/kontakt"
              className="relative w-44 h-44 md:w-52 md:h-52 rounded-full border border-white/20 flex items-center justify-center text-white font-bold uppercase hover:border-white/60 hover:scale-105 transition-all duration-300"
            >
              <span className="font-condensed text-sm md:text-base tracking-widest">
                {t('footer.writeMe') as string}
              </span>
            </LocalizedLink>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            {t('footer.copyright') as string}
          </p>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/ledu.cz/" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white text-xs uppercase tracking-wider transition-colors">
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/ledu/" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white text-xs uppercase tracking-wider transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
