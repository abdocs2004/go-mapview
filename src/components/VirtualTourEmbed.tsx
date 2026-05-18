'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@lib/utils';

interface VirtualTourEmbedProps {
  src: string;
  title?: string;
  locale: 'en' | 'ar';
  thumbnailUrl?: string;
  className?: string;
}

export default function VirtualTourEmbed({
  src,
  title = 'Virtual Tour',
  locale,
  thumbnailUrl,
  className,
}: VirtualTourEmbedProps) {
  const [isActivated, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isRTL = locale === 'ar';

  const t = {
    en: {
      badge: '3D IMMERSIVE',
      title: 'Interactive Virtual Tour',
      desc: 'Experience this space in fully immersive 3D Matterport-grade walkthrough.',
      btn: 'Activate 3D Experience',
      loading: 'Loading Immersive Scene...',
    },
    ar: {
      badge: 'ثلاثي الأبعاد تفاعلي',
      title: 'جولة افتراضية تفاعلية',
      desc: 'اختبر هذه المساحة في تجربة غامرة بالكامل ثلاثية الأبعاد بدقة Matterport عالية الجودة.',
      btn: 'تفعيل الجولة ثلاثية الأبعاد',
      loading: 'جاري تحميل المشهد الافتراضي...',
    },
  }[locale];

  return (
    <div
      className={cn(
        'relative w-full aspect-video rounded-2xl overflow-hidden bg-dark-950 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
        'hover:border-premium-accent/30 hover:shadow-[0_30px_60px_rgba(14,165,233,0.15)] transition-all duration-500',
        className
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <AnimatePresence mode="wait">
        {!isActivated ? (
          <motion.div
            key="placeholder"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
            onClick={() => setIsActivated(true)}
          >
            {/* Background Image or stylized grid */}
            {thumbnailUrl ? (
              <>
                <img
                  src={thumbnailUrl}
                  alt={title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105 opacity-40 group-hover:opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-dark-950/30" />
              </>
            ) : (
              <>
                {/* Space-age tech grid background */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-blue-950/20 to-dark-950" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                {/* Glowing neon spots */}
                <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500" />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-premium-accent/10 blur-3xl group-hover:bg-premium-accent/20 transition-all duration-500" />
              </>
            )}

            {/* Premium Interactive Overlay Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center max-w-lg select-none space-y-6">
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-premium-accent/40 bg-premium-accent/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-premium-accent shadow-[0_0_15px_rgba(14,165,233,0.15)] group-hover:shadow-[0_0_25px_rgba(14,165,233,0.3)] transition-all duration-500">
                <span className="h-1.5 w-1.5 rounded-full bg-premium-accent animate-pulse" />
                {t.badge}
              </span>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h3 className="text-xl md:text-3xl font-bold text-white group-hover:text-premium-accent transition-colors duration-300">
                  {t.title}
                </h3>
                <p className="text-sm md:text-base text-dark-300 max-w-sm">
                  {t.desc}
                </p>
              </div>

              {/* Activation Play Button */}
              <div className="relative flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-premium-accent/50 group-hover:bg-premium-accent/10 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.25)]">
                {/* Pulsing ring */}
                <div className="absolute -inset-2 rounded-full border border-premium-accent/20 scale-100 group-hover:scale-105 animate-[ping_2s_infinite] opacity-50 pointer-events-none" />
                
                {/* 3D VR Icon or play button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7 md:h-9 md:w-9 text-white group-hover:text-premium-accent transition-colors duration-300 animate-[pulse_3s_infinite]"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>

              {/* Button text CTA */}
              <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-300 border-b border-white/10 group-hover:border-premium-accent/50 pb-1">
                {t.btn}
              </span>
            </div>

            {/* Corner glow accents */}
            <div className="absolute top-0 left-0 w-1.5 h-16 bg-gradient-to-b from-cyan-500/30 to-transparent rounded-full blur-xs pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-1.5 h-16 bg-gradient-to-t from-premium-accent/30 to-transparent rounded-full blur-xs pointer-events-none" />
          </motion.div>
        ) : (
          <motion.div
            key="frame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-950 z-20 space-y-4">
                <div className="relative flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full border-2 border-dark-700" />
                  <div className="absolute h-12 w-12 rounded-full border-2 border-t-premium-accent border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                </div>
                <p className="text-sm text-dark-300 tracking-wide animate-pulse">
                  {t.loading}
                </p>
              </div>
            )}

            {/* The Actual Virtual Tour Iframe */}
            <iframe
              src={src}
              title={title}
              allowFullScreen
              allow="xr-spatial-tracking"
              onLoad={() => setIsLoading(false)}
              className={cn(
                'w-full h-full border-0 transition-opacity duration-700',
                isLoading ? 'opacity-0' : 'opacity-100'
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
