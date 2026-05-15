'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@components/Button';
import { absoluteMediaUrl } from '@lib/media-url';
import { Star } from 'lucide-react';

export type Testimonial = {
  id?: string | number;
  name?: string;
  position?: string;
  company?: string;
  rating?: number;
  googleReviewUrl?: string;
  image?: { url?: string } | string | null;
  content?:
    | string
    | {
        blocks?: Array<{
          children?: Array<{
            text?: string;
          }>;
        }>;
      };
};

function getContentText(content: Testimonial['content']): string {
  if (typeof content === 'string' || !content) return content || '';

  const firstBlock = content.blocks?.[0];
  const children = firstBlock?.children;
  if (!children?.length) return '';

  return children
    .map((child) => child.text || '')
    .join('')
    .trim();
}

export default function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const items = testimonials || [];
  const [index, setIndex] = useState(0);
  if (!items.length) return null;

  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }
  function next() {
    setIndex((i) => (i + 1) % items.length);
  }

  const t = items[index];
  const avatar = t?.image && typeof t.image === 'object' && 'url' in t.image ? absoluteMediaUrl(t.image.url) : undefined;

  return (
    <section className="py-16 md:py-24 bg-dark-900">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold">What partners say</h2>
          <p className="text-dark-400">Real reviews from our clients</p>
        </div>

        <div className="relative z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id || index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-dark-700 bg-dark-950 p-8 md:p-12"
            >
              <div className="flex items-start gap-6">
                {avatar ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-dark-900 flex-shrink-0">
                    <Image src={avatar} alt={t.name || ''} width={80} height={80} className="object-cover" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-dark-800 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm text-dark-400">{t.position}{t.company ? ` · ${t.company}` : ''}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.round(t.rating || 5) }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-premium-accent" />
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 text-dark-300 leading-relaxed">
                    {/* content may be rich-text; show plain text fallback if provided */}
                    {getContentText(t.content)}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <Button size="sm" variant="outline" onClick={prev}>Previous</Button>
                    <Button size="sm" onClick={next}>Next</Button>
                    {t.googleReviewUrl ? (
                      <a href={t.googleReviewUrl} target="_blank" rel="noreferrer" className="ml-auto">
                        <Button size="sm" variant="ghost">Read on Google</Button>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -left-6 top-1/2 -translate-y-1/2">
            <button aria-label="previous" onClick={prev} className="p-2 rounded-full border border-dark-700 bg-dark-900">
              ‹
            </button>
          </div>
          <div className="absolute -right-6 top-1/2 -translate-y-1/2">
            <button aria-label="next" onClick={next} className="p-2 rounded-full border border-dark-700 bg-dark-900">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
