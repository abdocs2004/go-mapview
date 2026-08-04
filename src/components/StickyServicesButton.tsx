'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { useLocale } from '@hooks/useLocale';

export default function StickyServicesButton() {
  const locale = useLocale();
  const text = locale === 'ar' ? 'تفاصيل الخدمات' : 'Services Details';

  const handleClick = () => {
    const pdfPath = locale === 'ar' ? '/GoMapView profile Arabic 2026.pdf' : '/GoMapView English profile 2026.pdf';
    window.open(pdfPath, '_blank');
  };

  return (
    <div className="fixed z-[99] top-1/3 -translate-y-1/2 right-0 group transition-all duration-500 hover:-translate-x-3">
      <div className="relative flex items-center justify-end">
        <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 rounded-l-[3rem] blur-md opacity-10 group-hover:opacity-30 animate-pulse transition duration-500"></div>

        {/* Single button for mobile */}
        <div className="md:hidden relative">
          <button
            onClick={handleClick}
            className="flex items-center bg-gradient-to-b from-cyan-600 to-blue-700 border-[3px] border-r-0 border-white/20 p-3 rounded-l-full shadow-[0_5px_15px_rgba(6,182,212,0.15)] backdrop-blur-sm"
            aria-label={text}
          >
            <FileText className="w-5 h-5 text-white drop-shadow-md" />
          </button>
        </div>

        {/* Single button for desktop */}
        <button
          onClick={handleClick}
          className="hidden md:flex relative bg-gradient-to-b from-cyan-600 to-blue-700 border-4 border-r-0 border-white/20 p-3 py-6 rounded-tl-[2rem] rounded-bl-[4rem] shadow-[0_5px_15px_rgba(6,182,212,0.15)] flex-col items-center gap-4 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-2 origin-right"
          aria-label={text}
        >
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm animate-bounce">
            <FileText className="w-6 h-6 text-white drop-shadow-md" />
          </div>
          <div
            className="text-white text-sm font-black uppercase tracking-[0.2em] flex flex-col items-center justify-center gap-1 drop-shadow-md"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {text}
          </div>
        </button>
      </div>
    </div>
  );
}
