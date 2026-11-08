'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/i18n/LanguageContext';
import LocalizedLink from './LocalizedLink';
import ScrollReveal from './ScrollReveal';

function useDesktopMotionVideo() {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setPlayVideo(!mobile.matches && !reduce.matches);
    };
    update();
    mobile.addEventListener('change', update);
    reduce.addEventListener('change', update);
    return () => {
      mobile.removeEventListener('change', update);
      reduce.removeEventListener('change', update);
    };
  }, []);

  return playVideo;
}

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const playVideo = useDesktopMotionVideo();
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
    <section className="relative w-full min-h-[85vh] bg-black flex flex-col items-center justify-center pt-36 md:pt-20">
      <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto">
        <ScrollReveal animation="up" delay={1}>
          <h1 className="text-white text-sm md:text-base font-bold uppercase tracking-[0.16em] mb-5">
            {t('hero.seoTitle') as string}
          </h1>
          <p
            className="font-condensed text-stroke tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', lineHeight: '1.05' }}
          >
            {t('hero.outline') as string}
          </p>
        </ScrollReveal>

        <ScrollReveal animation="up" delay={2}>
          <div style={{ marginTop: '0.15em' }}>
            <p
              className="font-condensed text-red-500 uppercase"
              style={{ fontSize: 'clamp(2rem, 6.5vw, 6rem)', lineHeight: '1.15' }}
            >
              {t('hero.main') as string}
            </p>
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

        <ScrollReveal animation="up" delay={2}>
          <LocalizedLink
            href="/kontakt"
            className="mt-8 inline-flex items-center justify-center min-h-[44px] bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold uppercase text-sm tracking-wider"
          >
            {t('hero.cta') as string}
          </LocalizedLink>
        </ScrollReveal>

        <ScrollReveal animation="scale" delay={3}>
          <div className="mt-16 md:mt-24 w-full max-w-3xl mx-auto">
            <div className="relative aspect-video bg-[#1a1a1a] rounded overflow-hidden border border-white/5">
              <Image
                src="/images/hero-poster.webp"
                alt={t('hero.posterAlt') as string}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              {playVideo && (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                >
                  <source src="/images/yt-bg-min.mp4" type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Hero;
