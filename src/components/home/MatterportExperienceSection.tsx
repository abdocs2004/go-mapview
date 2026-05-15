'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '@components/Container';
import Button from '@components/Button';
import { cn } from '@lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface MatterportExperienceSectionProps {
  locale: 'en' | 'ar';
  sectionTitle: string;
  sectionDescription: string;
  matterportUrl: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function MatterportExperienceSection({
  locale,
  sectionTitle,
  sectionDescription,
  matterportUrl,
  ctaLabel = 'Explore More Tours',
  ctaHref = '/services',
}: MatterportExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isRTL = locale === 'ar';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      if (reduceMotion) {
        gsap.set(q('[data-matterport-frame]'), { opacity: 1, scale: 1, filter: 'blur(0px)' });
        return;
      }

      // Animate the frame in on scroll
      gsap.fromTo(
        q('[data-matterport-frame]'),
        { opacity: 0, scale: 0.97, filter: 'blur(8px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Subtle glow animation
      gsap.to(q('[data-matterport-glow]'), {
        opacity: 0.6,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-dark-900 via-blue-950/30 to-dark-950"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          data-matterport-glow
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-3xl"
          initial={{ opacity: 0.3 }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-orange-500/10 to-red-500/10 blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{sectionTitle}</h2>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto">{sectionDescription}</p>
        </motion.div>

        {/* Matterport Frame */}
        <motion.div
          data-matterport-frame
          className={cn(
            'relative isolate rounded-2xl overflow-hidden border border-white/10',
            'bg-white/5 backdrop-blur-md shadow-[0_30px_90px_rgba(5,10,25,0.65)]',
            'before:pointer-events-none before:absolute before:inset-0',
            'before:bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0.06)_100%)]',
            'hover:border-white/20 hover:shadow-[0_40px_120px_rgba(14,165,233,0.1)]',
            'transition-all duration-500'
          )}
          initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Aspect ratio container for responsive iframe */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={matterportUrl}
              title="Matterport Virtual Tour"
              allowFullScreen={true}
              allow="xr-spatial-tracking"
              className="absolute inset-0 w-full h-full rounded-xl"
              style={{ border: 'none' }}
            />
          </div>

          {/* Corner glow accents */}
          <div className="absolute top-0 left-0 w-1 h-20 bg-gradient-to-b from-cyan-500/40 to-transparent rounded-full blur-sm pointer-events-none" />
          <div className="absolute top-0 right-0 w-1 h-20 bg-gradient-to-b from-blue-500/40 to-transparent rounded-full blur-sm pointer-events-none" />
        </motion.div>

        {/* CTA Section */}
        {ctaLabel && ctaHref && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href={ctaHref}>
              <Button size="lg" className="gap-2">
                {ctaLabel}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
