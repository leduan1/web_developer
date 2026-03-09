'use client';

import React from 'react';
import Image from 'next/image';
import { Header, SideLabels, Footer } from '@/components';
import PageTitle from '@/components/PageTitle';
import { useTranslation } from '@/i18n/LanguageContext';

export default function AboutPage() {
  const { t } = useTranslation();
  const po = t('pages.oMne') as Record<string, unknown>;
  const bio = po.bio as string[];
  const values = po.values as { title: string; description: string }[];

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <PageTitle translationKey="pages.oMne.title" />
      <Header />
      <SideLabels />

      {/* Hero section */}
      <div className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/60 text-sm uppercase tracking-wider mb-4">{po.briefHeading as string}</p>
          <h1 className="font-condensed text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-none mb-4">
            {po.subheading1 as string}
          </h1>
          <h2 className="font-condensed text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-none mb-12">
            {po.subheading2 as string}
          </h2>
        </div>
      </div>

      {/* About content */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Photo */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <Image
                  src="https://ledu.cz/wp-content/uploads/me.jpg"
                  alt="Duy - Web Developer"
                  width={500}
                  height={600}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Text content */}
            <div>
              <h3
                className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8"
                style={{
                  WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.33)',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              >
                {po.heading as string}
              </h3>

              {bio.map((paragraph, i) => (
                <p key={i} className={`text-white/70 leading-relaxed ${i < bio.length - 1 ? 'mb-6' : 'mb-8'}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-condensed text-3xl md:text-4xl text-white uppercase mb-12">
            {po.valuesHeading as string}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-6 hover:border-red-500/50 transition">
                <h4 className="text-white font-bold text-lg mb-3">{value.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
