'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@components/Container';
import Card from '@components/Card';

interface FAQItem {
  question: string;
  answer: string;
}

type FAQBlockItem = {
  question?: string;
  title?: string;
  answer?: string;
  body?: unknown;
};

interface PremiumFAQProps {
  locale: string;
  faqBlock?: {
    items?: FAQBlockItem[];
  };
}

export default function PremiumFAQ({ locale, faqBlock }: PremiumFAQProps) {
  const items: FAQItem[] = useMemo(() => {
    const cmsItems = faqBlock?.items;
    if (Array.isArray(cmsItems) && cmsItems.length) {
      return cmsItems.map((item) => ({
        question: item.question || item.title || '',
        answer: typeof item.answer === 'string' ? item.answer : '',
      }));
    }
    // Fallback premium FAQs
    return [
      {
        question: locale === 'en' ? 'What properties do you shoot?' : 'ما أنواع العقارات التي نصورها؟',
        answer:
          locale === 'en'
            ? 'Residential, commercial, hospitality, retail and landmark spaces — from single rooms to large estates.'
            : 'سكنية، تجارية، ضيافة، تجزئة ومعالم — من غرف فردية إلى ممتلكات واسعة.',
      },
      {
        question: locale === 'en' ? 'Do you offer Matterport-style tours?' : 'هل تقدمون جولات على طراز Matterport؟',
        answer:
          locale === 'en'
            ? 'Yes — we produce Matterport-inspired walkthroughs with photogrammetry-grade panoramas and optional 3D deliverables.'
            : 'نعم — ننتج جولات تجريبية مستوحاة من Matterport مع بانورامات عالية الجودة وخيارات تسليم ثلاثية الأبعاد.',
      },
      {
        question: locale === 'en' ? 'How long does a typical capture take?' : 'كم يستغرق التصوير عادة؟',
        answer:
          locale === 'en'
            ? 'Small properties often finish within a few hours; larger sites and commercial interiors may take a day or more.'
            : 'المواقع الصغيرة عادة تنتهي خلال ساعات؛ المواقع الكبيرة قد تحتاج يوماً أو أكثر.',
      },
    ];
  }, [faqBlock, locale]);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  const container = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section aria-labelledby="faq-heading" className="py-16 md:py-24 bg-dark-980">
      <Container>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={container}>
          <div className="mx-auto max-w-4xl text-center">
            <motion.h2 variants={item} id="faq-heading" className="mb-3 text-3xl font-bold md:text-4xl">
              {locale === 'en' ? 'Frequently asked — Premium' : 'الأسئلة الشائعة — بريميوم'}
            </motion.h2>
            <motion.p variants={item} className="mx-auto max-w-2xl text-lg text-dark-300">
              {locale === 'en'
                ? 'Answers to the top questions we hear from clients — clear, fast, and focused on production and delivery.'
                : 'إجابات على أكثر الأسئلة شيوعاً من عملائنا — واضحة وسريعة ومركزة على التصوير والتسليم.'}
            </motion.p>
          </div>

          <motion.div className="mt-10 grid gap-4" variants={item}>
            {items.map((it, i) => (
              <motion.div key={i} variants={item}>
                <Card className="overflow-hidden rounded-2xl border border-white/6 bg-dark-950/50 backdrop-blur-md transition-shadow hover:shadow-neon-lg">
                  <div className="flex items-start justify-between gap-4 p-5 md:p-6">
                    <div className="flex-1">
                      <button
                        type="button"
                        aria-expanded={openIndex === i}
                        aria-controls={`faq-panel-${i}`}
                        onClick={() => toggle(i)}
                        className="w-full text-left"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-lg font-semibold">{it.question}</h3>
                          <div className="ml-4 flex-shrink-0 text-premium-accent">{openIndex === i ? '−' : '+'}</div>
                        </div>
                      </button>
                      <AnimatePresence initial={false} mode="wait">
                        {openIndex === i ? (
                          <motion.div
                            id={`faq-panel-${i}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="mt-4 text-sm leading-relaxed text-dark-300"
                          >
                            <div dangerouslySetInnerHTML={{ __html: it.answer }} />
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
