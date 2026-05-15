"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import type { Locale } from '@lib/i18n';
import Container from '@components/Container';
import Button from '@components/Button';
import { CMSRichText } from '@components/CMSRichText';
import { absoluteMediaUrl } from '@lib/media-url';

interface ServicesClientProps {
  locale: Locale;
  services: Array<Record<string, unknown>>;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export default function ServicesClient({ locale, services }: ServicesClientProps) {
  const [selectedSlug, setSelectedSlug] = useState('all');

  const categories = useMemo(() => {
    const items = [{ id: 'all', label: locale === 'en' ? 'All Services' : 'كل الخدمات' }];
    services.forEach((service) => {
      const slug = getString(service.slug);
      const title = getString(service.title);
      if (slug) {
        items.push({ id: slug, label: title || slug });
      }
    });
    return items;
  }, [locale, services]);

  const filteredServices = useMemo(() => {
    if (selectedSlug === 'all') return services;
    return services.filter((service) => getString(service.slug) === selectedSlug);
  }, [selectedSlug, services]);

  return (
    <section className="py-20 md:py-32 bg-dark-950">
      <Container>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedSlug(category.id)}
              className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
                selectedSlug === category.id
                  ? 'bg-premium-accent text-dark-950 shadow-neon'
                  : 'bg-dark-800 text-white hover:border-premium-accent/50 border border-dark-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="space-y-20">
          {filteredServices.map((service, index) => {
            const slug = getString(service.slug) || `service-${index}`;
            const title = getString(service.title);
            const shortDescription = getString(service.shortDescription);
            const description = service.description;
                      // heroImage may be an object with .url or a string
                      const heroImageField = service.heroImage as unknown;
                      let heroImageUrl: string | undefined;
                      if (heroImageField) {
                        if (typeof heroImageField === 'object' && heroImageField && 'url' in (heroImageField as Record<string, unknown>)) {
                          const u = (heroImageField as Record<string, unknown>).url;
                          if (typeof u === 'string') heroImageUrl = absoluteMediaUrl(u);
                        } else if (typeof heroImageField === 'string') {
                          heroImageUrl = absoluteMediaUrl(heroImageField);
                        }
                      }
            const features = Array.isArray(service.features)
              ? (service.features as Array<{ feature?: string }>).map((f) => f.feature).filter(Boolean)
              : [];

            return (
              <motion.div
                key={slug}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-premium-accent">{slug}</p>
                  <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
                  <p className="text-lg text-dark-400 leading-relaxed">{shortDescription}</p>

                  {description ? <CMSRichText data={description} className="text-dark-300 leading-relaxed" /> : null}

                  {features.length > 0 ? (
                    <div className="space-y-3">
                      {features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-premium-accent flex-shrink-0" />
                          <span className="text-white">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <Link href={`/${locale}/services/${slug}`}>
                    <Button size="lg" className="gap-2">
                      {locale === 'en' ? 'View Details' : 'عرض التفاصيل'}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>

                <motion.div
                  className={`relative h-96 rounded-xl overflow-hidden bg-dark-800 border border-dark-700 ${index % 2 === 1 ? 'md:order-first' : ''}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  {heroImageUrl ? (
                    <Image src={heroImageUrl} alt={title} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-premium-accent/20 to-blue-500/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📸</div>
                        <p className="text-dark-400">{title}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}