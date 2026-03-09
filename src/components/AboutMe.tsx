'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

const AboutMe: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = t('aboutMe.faqItems') as { question: string; answer: string }[];
  const stats = t('aboutMe.stats') as { number: string; label: string }[];
  const heading = t('aboutMe.heading') as string;
  const greeting = t('aboutMe.greeting') as string;
  const bio = t('aboutMe.bio') as string;
  const faqHeading = t('aboutMe.faqHeading') as string;

  return (
    <section
      className="relative w-full py-20 px-4 overflow-hidden"
      style={{
        backgroundColor: '#0a0a0a',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header with outline text */}
        <ScrollReveal animation="up" className="mb-16 text-right">
          <h2
            className="text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none"
            style={{
              WebkitTextStroke: '2px white',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            {heading}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left side - Photo */}
          <ScrollReveal animation="left" className="flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/me.jpg"
                alt="Duy - Web Designer"
                className="w-full h-auto"
              />
            </div>
          </ScrollReveal>

          {/* Right side - Content */}
          <ScrollReveal animation="right" delay={1}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 uppercase">
              {greeting}
            </h3>

            <p className="text-white/70 mb-12 leading-relaxed text-sm md:text-base">
              {bio}
            </p>

            {/* FAQ Section */}
            <div className="mb-12">
              <div className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-6">
                {faqHeading}
              </div>

              <div className="divide-y divide-white/10">
                {faqItems.map((item, index) => (
                  <div key={index}>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      className="w-full text-left flex items-start justify-between py-5 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <span className="text-white font-medium text-sm pr-4 flex-1">
                        {item.question}
                      </span>
                      <span className="text-white text-xl flex-shrink-0 select-none leading-none">
                        {openIndex === index ? '−' : '+'}
                      </span>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: openIndex === index ? '500px' : '0px',
                        opacity: openIndex === index ? 1 : 0,
                      }}
                    >
                      <p className="text-white/60 text-xs md:text-sm leading-relaxed pb-5">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className="text-5xl md:text-6xl font-black mb-1 leading-none font-condensed"
                    style={{
                      background: 'linear-gradient(180deg, #F5A623 0%, #D4841A 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="w-16 h-[2px] mx-auto mb-2"
                    style={{
                      background: 'linear-gradient(90deg, #F5A623, transparent)',
                    }}
                  />
                  <p className="text-white/60 text-xs uppercase tracking-wider font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
