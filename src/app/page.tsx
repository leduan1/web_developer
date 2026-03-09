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

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white" style={{ overflowX: 'clip' }}>
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
