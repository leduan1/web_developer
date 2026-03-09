'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [wordIndex, setWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const words = (t('hero.rotatingWords') as string[]) || [];

  useEffect(() => {
    if (words.length === 0) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative w-full min-h-[85vh] bg-black flex flex-col items-center justify-center pt-20">
      <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto">
        {/* POSOUVÁM HRANICE - outline text */}
        <ScrollReveal animation="up" delay={1}>
          <h2
            className="font-condensed text-stroke tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', lineHeight: '1.05' }}
          >
            {t('hero.outline') as string}
          </h2>
        </ScrollReveal>

        {/* PŘI TVORBĚ (red) + rotating word (white) - consistent line spacing */}
        <ScrollReveal animation="up" delay={2}>
          <div style={{ marginTop: '0.15em' }}>
            <h1
              className="font-condensed text-red-500 uppercase relative inline-block"
              style={{ fontSize: 'clamp(2rem, 6.5vw, 6rem)', lineHeight: '1.15' }}
            >
              {t('hero.main') as string}
            </h1>
            <br />
            <span
              className="font-condensed text-white uppercase inline-block"
              style={{
                fontSize: 'clamp(2rem, 6.5vw, 6rem)',
                lineHeight: '1.15',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              {words[wordIndex]}
            </span>
          </div>
        </ScrollReveal>

        {/* Video player */}
        <ScrollReveal animation="scale" delay={3}>
          <div className="mt-16 md:mt-24 w-full max-w-3xl mx-auto">
            <div className="relative aspect-video bg-[#1a1a1a] rounded overflow-hidden border border-white/5">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="https://ledu.cz/wp-content/uploads/yt-bg-min.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Hero;
