'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '@components/Container';
import Button from '@components/Button';
import { CMSRichText } from '@components/CMSRichText';
import { cn } from '@lib/utils';

gsap.registerPlugin(ScrollTrigger);

type Action = {
  label: string;
  href: string;
  variant?: 'primary' | 'outline' | 'ghost';
};

type CinematicAboutSectionProps = {
  locale: 'en' | 'ar';
  eyebrow?: string;
  title: string;
  body?: unknown;
  plainBody?: string;
  imageSrc: string;
  imageAlt: string;
  actions?: Action[];
};

export default function CinematicAboutSection({
  locale,
  eyebrow,
  title,
  body,
  plainBody,
  imageSrc,
  imageAlt,
  actions,
}: CinematicAboutSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const words = useMemo(() => title.split(' ').filter(Boolean), [title]);
  const isRTL = locale === 'ar';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(section);

        // If reduced motion or mobile, skip heavy scroll-linked animations
        if (reduceMotion || isMobile) {
          // mobile & reduced motion: reveal content without heavy curtain animation
          gsap.set(q('[data-about-curtain-left]'), { xPercent: -110 });
          gsap.set(q('[data-about-curtain-right]'), { xPercent: 110 });
          gsap.set(q('[data-about-overlay]'), { opacity: 0.12 });
          gsap.set(q('[data-about-copy], [data-about-action], [data-about-media]'), { opacity: 1, y: 0, scale: 1 });
          return;
        }

        // Dual curtain timeline: left moves left, right moves right; scrubbed to scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 0.6,
          },
        });

        tl.to(q('[data-about-curtain-left]'), { xPercent: -110, ease: 'power2.inOut' }, 0)
          .to(q('[data-about-curtain-right]'), { xPercent: 110, ease: 'power2.inOut' }, 0)
          .to(q('[data-about-overlay]'), { opacity: 0.12, ease: 'power1.out' }, 0)
          .fromTo(
            q('[data-about-copy]'),
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, stagger: 0.12, ease: 'power3.out' },
            0.12
          )
          .fromTo(
            q('[data-about-media]'),
            { scale: 1.06, opacity: 0.7 },
            { scale: 1, opacity: 1, ease: 'power1.out' },
            0.22
          )
          .to(
            q('[data-about-action]'),
            { opacity: 1, y: 0, stagger: 0.08, ease: 'power3.out' },
            0.28
          );

        // Gentle parallax for glows
        gsap.to(q('[data-about-glow-left]'), {
          xPercent: 6,
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        });

        gsap.to(q('[data-about-glow-right]'), {
          xPercent: -5,
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      }, section);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050a16] py-20 md:py-28"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div data-about-curtain-left className="about-curtain-left pointer-events-none absolute inset-y-0 left-0 z-40" />
      <div data-about-curtain-right className="about-curtain-right pointer-events-none absolute inset-y-0 right-0 z-40" />
      <div
        data-about-overlay
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,22,0.92)_0%,rgba(6,10,22,0.45)_42%,rgba(4,8,18,0.96)_100%)]"
      />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.18),transparent_35%),radial-gradient(circle_at_76%_24%,rgba(59,130,246,0.2),transparent_34%),radial-gradient(circle_at_80%_78%,rgba(239,68,68,0.15),transparent_30%),radial-gradient(circle_at_18%_76%,rgba(249,115,22,0.16),transparent_30%)]" />
      <motion.div
        data-about-glow-left
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        data-about-glow-right
        className="pointer-events-none absolute -right-24 bottom-12 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl"
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr,1fr] lg:gap-14">
          <div className="space-y-6">
            {eyebrow ? (
              <motion.p
                data-about-copy
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65 }}
                className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300 backdrop-blur-md"
              >
                {eyebrow}
              </motion.p>
            ) : null}

            <h2 className="text-pretty text-4xl font-bold leading-[1.08] text-white md:text-5xl lg:text-6xl">
              {words.map((word, idx) => (
                <span key={`${word}-${idx}`} className="mr-3 inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '115%', opacity: 0 }}
                    whileInView={{ y: '0%', opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.72, delay: idx * 0.045, ease: [0.2, 0.65, 0.2, 1] }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>

            <div data-about-copy className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              {body ? <CMSRichText data={body} className="prose prose-invert max-w-none" /> : <p>{plainBody}</p>}
            </div>

            {actions?.length ? (
              <div data-about-action className="flex flex-wrap gap-3 pt-2">
                {actions.map((action) => (
                  <Link key={`${action.href}-${action.label}`} href={action.href}>
                    <Button size="lg" variant={action.variant || 'primary'}>
                      {action.label}
                    </Button>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <motion.div
            data-about-copy
            className={cn(
              'relative isolate overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-3 shadow-[0_30px_90px_rgba(5,10,25,0.65)] backdrop-blur-xl',
              'before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.13)_0%,rgba(255,255,255,0.02)_48%,rgba(255,255,255,0.1)_100%)]'
            )}
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative h-[320px] overflow-hidden rounded-2xl md:h-[460px]">
              <div
                data-about-media
                className="absolute inset-0 transform-gpu will-change-transform"
                style={{ transformOrigin: 'center center' }}
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                  priority={false}
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,9,20,0.12),rgba(4,9,20,0.68))]" />
            </div>
            <div className="pointer-events-none absolute inset-x-8 bottom-5 h-16 rounded-full bg-cyan-400/15 blur-2xl" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
