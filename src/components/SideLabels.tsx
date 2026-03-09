'use client';

import React from 'react';
import { useTranslation } from '@/i18n/LanguageContext';

const SideLabels: React.FC = () => {
  const { t } = useTranslation();
  const scrollText = t('common.scroll') as string;

  return (
    <>
      {/* Right side - Scroll indicator - vertical text */}
      <div className="fixed right-6 md:right-12 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-6 pointer-events-none">
        <div className="flex flex-col items-center gap-2">
          <div
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
            }}
          >
            <span className="text-white/60 text-xs font-bold tracking-widest">
              {scrollText}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-0.5 h-6 bg-white/30" />
            <div className="w-2 h-2 rounded-full bg-white/30" />
          </div>
        </div>
      </div>

      {/* Mobile version - Bottom */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 lg:hidden flex items-center gap-4 pointer-events-none">
        <div className="flex flex-col items-center gap-1">
          <div className="w-0.5 h-4 bg-white/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" />
        </div>
        <span className="text-white/60 text-xs font-bold tracking-widest">
          {scrollText}
        </span>
      </div>
    </>
  );
};

export default SideLabels;
