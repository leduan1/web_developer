'use client';

import React, { useRef, useState } from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const testimonials = t('testimonials.testimonials') as { text: string; author: string; company: string }[];

  return (
    <section className="w-full py-16 md:py-24 bg-black overflow-hidden">
      <ScrollReveal animation="left">
      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex gap-8 md:gap-16 px-6 md:px-12 lg:px-24 overflow-x-auto cursor-grab active:cursor-grabbing no-scrollbar"
        style={{
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {testimonials.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[38vw] py-4"
          >
            <p className="text-white/50 italic text-lg md:text-xl lg:text-2xl leading-relaxed mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              {item.text}
            </p>
            <div>
              <p className="text-white/70 font-bold text-[11px] tracking-[0.2em] uppercase">
                {item.author}, {item.company}
              </p>
            </div>
          </div>
        ))}
      </div>
      </ScrollReveal>
    </section>
  );
};

export default Testimonials;
