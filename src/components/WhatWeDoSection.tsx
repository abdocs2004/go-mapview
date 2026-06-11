"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export type WhatWeDoCard = {
  title?: string;
  description?: string;
  image?: { url?: string } | null;
  icon?: string;
  href?: string;
  isPublished?: boolean;
  order?: number;
};

export type WhatWeDoData = {
  sectionTitle?: string | null;
  sectionSubtitle?: string | null;
  cards?: WhatWeDoCard[];
};

type Props = {
  data?: WhatWeDoData | null;
  locale?: string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

export default function WhatWeDoSection({ data, locale = 'en' }: Props) {
  if (!data) return null;

  const title = data.sectionTitle ?? null;
  const subtitle = data.sectionSubtitle ?? null;
  const rawCards: WhatWeDoCard[] = Array.isArray(data.cards) ? data.cards : [];

  const cards = rawCards
    .filter((c) => c?.isPublished !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, 12);

  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-48 -top-32 w-96 h-96 bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-400 opacity-10 blur-3xl transform -rotate-12" />
        <div className="absolute -right-48 -bottom-32 w-96 h-96 bg-gradient-to-tr from-blue-400 via-cyan-300 to-emerald-300 opacity-5 blur-3xl transform rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          {title && <h2 className="text-4xl md:text-5xl font-extrabold">{title}</h2>}
          {subtitle && <p className="mt-4 text-lg text-dark-400 max-w-3xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/6 to-white/3 flex items-center justify-center text-white shadow-md">
                    {card.image?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={card.image.url} alt={card.title || 'icon'} className="w-10 h-10 object-contain" />
                    ) : (
                      <div className="w-8 h-8 rounded-sm bg-premium-accent/80" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm text-dark-400">{card.description}</p>
                  </div>
                </div>

                <div className="mt-6">
                  {card.href ? (
                    <Link href={card.href} className="inline-block">
                      <span className="inline-block px-4 py-2 rounded-md bg-gradient-to-r from-premium-accent to-blue-500 text-white text-sm backdrop-blur-sm">
                        {locale === 'en' ? 'Learn More' : 'المزيد'}
                      </span>
                    </Link>
                  ) : (
                    <div className="h-7" />
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
