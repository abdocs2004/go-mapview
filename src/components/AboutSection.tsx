'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Locale } from '@lib/i18n';
import { localeConfig, messages } from '@lib/i18n';
import { Camera, MapPin, Globe, Sparkles } from 'lucide-react';

const featureIcons = [Camera, MapPin, Globe];

interface AboutSectionProps {
  locale: Locale;
}

export default function AboutSection({ locale }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState(false);

  const copy = messages[locale].aboutSection;
  const isRtl = localeConfig[locale].rtl;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextVisible = entry.isIntersecting;
        setVisible(nextVisible);

        const video = videoRef.current;
        if (!video) return;

        if (nextVisible) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => undefined);
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.28 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const featureCards = useMemo(
    () =>
      copy.features.map((feature, index) => ({
        ...feature,
        Icon: featureIcons[index] ?? Sparkles,
      })),
    [copy.features]
  );

  return (
    <section
      ref={sectionRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`about-section relative overflow-hidden bg-[#0a0f1e] text-white ${visible ? 'visible' : ''}`}
    >
      <div className="absolute inset-0 about-grid" />
      <div className="absolute inset-0 about-glow about-glow-left" />
      <div className="absolute inset-0 about-glow about-glow-right" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <header className="mx-auto max-w-3xl text-center">
          <span className="reveal reveal-down inline-flex items-center rounded-full border border-[#00c47e]/30 bg-[#00c47e]/10 px-4 py-2 text-sm font-semibold tracking-[0.24em] text-[#00c47e] uppercase">
            {copy.badge}
          </span>
          <h2 className="reveal reveal-up mt-6 text-4xl font-bold leading-tight md:text-6xl">
            {copy.headline} <span className="text-[#00c47e]">{copy.headlineAccent}</span>
          </h2>
          <p className="reveal reveal-up mt-5 text-base leading-8 text-white/68 md:text-lg">
            {copy.subtitle}
          </p>
        </header>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={`reveal ${isRtl ? 'reveal-left' : 'reveal-right'} order-2 lg:order-1`}>
            <div className="relative h-[280px] overflow-hidden rounded-[28px] border border-white/10 bg-black/30 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:h-[340px] md:h-[400px] lg:h-[440px]">
              <video
                ref={videoRef}
                className="block h-full w-full object-cover"
                src="/en/videos/3D-about.mp4"
                autoPlay={false}
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/8" />
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-[#00c47e]/25 bg-[#07130f]/85 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md">
                <span className="h-2.5 w-2.5 rounded-full bg-[#00c47e] shadow-[0_0_12px_rgba(0,196,126,0.9)]" />
                <span>{copy.videoLabel}</span>
              </div>
            </div>
          </div>

          <div className={`reveal ${isRtl ? 'reveal-right' : 'reveal-left'} order-1 lg:order-2`}>
            <span className="inline-flex items-center text-xs font-semibold tracking-[0.32em] text-[#00c47e] uppercase">
              {copy.eyebrow}
            </span>
            <h3 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">{copy.sectionTitle}</h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/68 md:text-lg">{copy.sectionDescription}</p>

            <div className="mt-8 grid gap-4">
              {featureCards.map(({ Icon, title, description }) => (
                <article key={title} className="feature-card rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-300 hover:border-[#00c47e]/40 hover:shadow-[0_0_0_1px_rgba(0,196,126,0.15),0_20px_60px_rgba(0,196,126,0.08)]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00c47e]/12 text-[#00c47e] ring-1 ring-inset ring-[#00c47e]/20">
                      <Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">{title}</h4>
                      <p className="mt-2 text-sm leading-7 text-white/62">{description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className={`reveal reveal-up stats-shell mt-14 rounded-[28px] border border-white/10 bg-white/[0.03] p-4 sm:p-5`}>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {copy.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/6 bg-black/20 px-4 py-5 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-[#00c47e] md:text-3xl">{stat.value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.22em] text-white/62">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-grid {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.95) 65%, rgba(0, 0, 0, 0.2));
          opacity: 0.45;
        }

        .about-glow {
          pointer-events: none;
          opacity: 0.65;
        }

        .about-glow-left {
          background:
            radial-gradient(circle at 18% 28%, rgba(0, 196, 126, 0.16), transparent 26%),
            radial-gradient(circle at 40% 42%, rgba(59, 130, 246, 0.12), transparent 35%);
        }

        .about-glow-right {
          background:
            radial-gradient(circle at 82% 24%, rgba(59, 130, 246, 0.16), transparent 24%),
            radial-gradient(circle at 70% 60%, rgba(0, 196, 126, 0.12), transparent 30%);
        }

        .reveal {
          opacity: 0;
          transition-property: opacity, transform;
          transition-duration: 800ms;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }

        .reveal-up {
          transform: translate3d(0, 28px, 0);
        }

        .reveal-down {
          transform: translate3d(0, -16px, 0);
        }

        .reveal-left {
          transform: translate3d(-36px, 0, 0);
        }

        .reveal-right {
          transform: translate3d(36px, 0, 0);
        }

        .about-section.visible .reveal {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .about-section.visible .reveal-left,
        .about-section.visible .reveal-right,
        .about-section.visible .reveal-up,
        .about-section.visible .reveal-down {
          transform: translate3d(0, 0, 0);
        }

        .about-section.visible .stats-shell {
          transition-delay: 180ms;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .about-section.visible .reveal,
          .about-section.visible .reveal-left,
          .about-section.visible .reveal-right,
          .about-section.visible .reveal-up,
          .about-section.visible .reveal-down {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
