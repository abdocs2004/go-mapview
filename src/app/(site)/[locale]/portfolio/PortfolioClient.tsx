'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@components/Container';
import type { Locale } from '@lib/i18n';
import { absoluteMediaUrl } from '@lib/media-url';

interface PortfolioClientProps {
  locale: Locale;
  projects: Array<Record<string, unknown>>;
}

const categoryLabels: Record<string, Record<Locale, string>> = {
  'real-estate': { en: 'Real Estate', ar: 'العقارات' },
  hospitality: { en: 'Hospitality', ar: 'الفنادق' },
  commercial: { en: 'Commercial', ar: 'تجاري' },
  photography: { en: 'Photography', ar: 'تصوير' },
  '360-tour': { en: '360 Tour', ar: 'جولة 360' },
};

export default function PortfolioClient({
  locale,
  projects,
}: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = [
      { id: 'all', label: locale === 'en' ? 'All Projects' : 'جميع المشاريع' },
    ];
    const uniqueCats = new Set<string>();
    projects.forEach((p) => {
      const cat = (p && typeof p === 'object' && 'category' in p ? p.category : null) as string | null;
      if (cat && typeof cat === 'string') uniqueCats.add(cat);
    });
    uniqueCats.forEach((cat) => {
      cats.push({
        id: cat,
        label: categoryLabels[cat]?.[locale] || cat,
      });
    });
    return cats;
  }, [locale, projects]);

  const filteredProjects = useMemo(() => {
    return selectedCategory === 'all'
      ? projects
      : projects.filter((p) => {
          const cat = (p && typeof p === 'object' && 'category' in p ? p.category : null) as string | null;
          return cat === selectedCategory;
        });
  }, [selectedCategory, projects]);

  return (
    <section className="py-20 md:py-32 bg-dark-950">
      <Container>
        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-premium-accent text-dark-950 shadow-neon'
                  : 'bg-dark-800 text-white hover:border-premium-accent/50 border border-dark-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-dark-400">
              {locale === 'en'
                ? 'No projects in this category yet.'
                : 'لا توجد مشاريع في هذه الفئة حتى الآن.'}
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => {
                const title = (project && typeof project === 'object' && 'title' in project ? String(project.title) : 'Project');
                const slug = (project && typeof project === 'object' && 'slug' in project ? String(project.slug) : 'unknown');                
                const category = (project && typeof project === 'object' && 'category' in project ? String(project.category) : null);
                const thumbnail = (project && typeof project === 'object' && 'thumbnail' in project ? project.thumbnail : null);

                const thumbUrl =
                  thumbnail && typeof thumbnail === 'object' && 'url' in thumbnail
                    ? absoluteMediaUrl((thumbnail as { url?: string }).url)
                    : '';

                return (
                  <Link key={slug} href={`/${locale}/portfolio/${slug}`}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group cursor-pointer h-full"
                    >
                      <div className="relative h-64 rounded-xl overflow-hidden bg-dark-800 border border-dark-700 group-hover:border-premium-accent/50 transition-all duration-300">
                        {/* Image Background */}
                        {thumbUrl ? (
                          <Image
                            src={thumbUrl}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-premium-accent/10 to-blue-500/10 group-hover:from-premium-accent/20 group-hover:to-blue-500/20 transition-all duration-300 flex items-center justify-center">
                            <span className="text-6xl group-hover:scale-110 transition-transform duration-300">🎬</span>
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-between p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <div />
                          <div className="space-y-3">
                            {category ? (
                              <p className="text-sm text-premium-accent font-semibold uppercase">
                                {categoryLabels[category]?.[locale] || category}
                              </p>
                            ) : null}
                            <h3 className="text-xl font-bold">{title}</h3>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
