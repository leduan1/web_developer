'use client';

import React from 'react';
import {
  Header,
  Hero,
  Testimonials,
  Services,
  References,
  AboutMe,
  Footer,
  SideLabels,
} from '@/components';
import PageTitle from '@/components/PageTitle';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white" style={{ overflowX: 'clip' }}>
      <PageTitle translationKey="meta.title" />
      <Header />
      <SideLabels />

      {/* Main content sections */}
      <Hero />
      <Testimonials />
      <Services />
      <References />
      <AboutMe />

      {/* Footer with contact button */}
      <Footer />
    </main>
  );
}
