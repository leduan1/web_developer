'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

const tabImages: Record<string, string> = {
  vyvoj: 'Coding_SVG.svg',
  eshop: 'Online_shopping_SVG.svg',
  design: 'Web_design_SVG.svg',
  sprava: 'working-in-office.svg',
  marketing: 'SEO_SVG.svg',
};

const Services: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('vyvoj');

  const tabs = t('services.tabs') as { id: string; label: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content = t(`services.${activeTab}`) as any;
  const heading = t('services.heading') as string;
  const ctaButton = t('services.ctaButton') as string;

  return (
    <section className="relative w-full bg-black py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* SLUŽBY - large outline text */}
        <ScrollReveal animation="up">
          <h2
            className="font-condensed leading-[0.9] mb-12"
            style={{
              fontSize: 'clamp(4rem, 9vmax, 12rem)',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.15)',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              fontWeight: 900,
            }}
          >
            {heading}
          </h2>
        </ScrollReveal>

        {/* Tab navigation */}
        <ScrollReveal animation="up" delay={1}>
        <div className="flex flex-wrap gap-4 md:gap-8 mb-16 border-b border-white/10 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`font-bold text-xs md:text-sm uppercase tracking-wider pb-2 transition-colors relative ${
                activeTab === tab.id ? 'text-red-500' : 'text-white/50 hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500" />
              )}
            </button>
          ))}
        </div>
        </ScrollReveal>

        {/* Tab content - no framer motion, use key to force re-render */}
        <div key={activeTab} className="animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Text content - left */}
            <div>
              <h3 className="font-condensed text-4xl md:text-5xl lg:text-6xl text-white uppercase mb-3">
                {content.title}
              </h3>
              {content.subtitle && (
                <p className="text-white/50 text-base mb-6 italic">{content.subtitle}</p>
              )}
              <p className="text-white/60 mb-8 leading-relaxed text-base md:text-lg">
                {content.description}
              </p>

              {/* Features grid */}
              {(content.features as { title: string; description: string }[] | undefined) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {(content.features as { title: string; description: string }[]).map((f, i) => (
                    <div key={i} className="border-l-2 border-red-500/40 pl-4">
                      <h4 className="text-white font-bold mb-1 text-base">{f.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* List */}
              {(content.listItems as string[] | undefined) && (
                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {(content.listItems as string[]).map((item, i) => (
                    <li key={i} className="text-white/60 text-base flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <a
                href="/kontakt"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold uppercase text-sm transition-colors rounded-none"
              >
                {ctaButton}
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>

            {/* SVG illustration - right */}
            <div className="hidden lg:flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/${tabImages[activeTab]}`}
                alt={content.title as string}
                className="w-full max-w-sm"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
