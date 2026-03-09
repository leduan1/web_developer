'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type AnimationType = 'up' | 'left' | 'right' | 'scale';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  threshold?: number;
}

const animationClassMap: Record<AnimationType, string> = {
  up: 'scroll-hidden',
  left: 'scroll-hidden-left',
  right: 'scroll-hidden-right',
  scale: 'scroll-hidden-scale',
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'up',
  delay = 0,
  className = '',
  threshold = 0.15,
}) => {
  const { ref, isVisible, mounted } = useScrollAnimation<HTMLDivElement>({ threshold });

  const hiddenClass = mounted ? animationClassMap[animation] : '';
  const delayClass = mounted && delay > 0 && delay <= 5 ? `scroll-delay-${delay}` : '';
  const visibleClass = isVisible ? 'scroll-visible' : '';

  return (
    <div
      ref={ref}
      className={`${hiddenClass} ${delayClass} ${visibleClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
