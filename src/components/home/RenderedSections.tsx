'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MatterportShowcase from '@components/MatterportShowcase';
import { motion } from 'framer-motion';
import type { Locale } from '@lib/i18n';
import Container from '@components/Container';
import Button from '@components/Button';
import Card from '@components/Card';
import { CMSRichText } from '@components/CMSRichText';
import CinematicAboutSection from '@components/home/CinematicAboutSection';
import { absoluteMediaUrl } from '@lib/media-url';
import { getSectionStyle } from '@lib/section-styles';
import { cn } from '@lib/utils';
import type { LucideIcon } from 'lucide-react';
import {
  Camera,
  MapPin,
  Eye,
  Globe,
  Zap,
  TrendingUp,
  ScanLine,
} from 'lucide-react';

type CMSMedia = unknown;

function resolvePoster(u?: CMSMedia): string | undefined {
  if (!u) return undefined;
  if (typeof u === 'object' && 'url' in u) {
    const url = (u as { url?: unknown }).url;
    if (typeof url === 'string' && url) return absoluteMediaUrl(url);
  }
  return undefined;
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : undefined;
}

function iconForName(name?: string | null): LucideIcon {
  switch ((name || '').toLowerCase()) {
    case 'map-pin':
    case 'mappin':
      return MapPin;
    case 'eye':
      return Eye;
    case 'globe':
      return Globe;
    case 'zap':
      return Zap;
    case 'trending-up':
    case 'trendingup':
      return TrendingUp;
    case 'scan-line':
    case 'scanline':
      return ScanLine;
    default:
      return Camera;
  }
}

export interface ServiceCardModel {
  slug?: string;
  title?: string;
  shortDescription?: string;
  icon?: string | null;
  heroImage?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

interface RenderedSectionsProps {
  locale: Locale;
  sections: Array<Record<string, unknown>>;
  cmsServices?: ServiceCardModel[];
}

export default function RenderedSections({ locale, sections, cmsServices }: RenderedSectionsProps) {
  if (!sections?.length) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {sections.map((block, idx) => {
        const type = block.blockType as string;
        const key = `${type}-${idx}`;
        const sectionStyle = getSectionStyle(block);

        if (!sectionStyle.isVisible) {
          return null;
        }

        if (type === 'heroImmersive') {
          const videoUrl = String(block.videoUrl || '');
          const poster = resolvePoster(block.poster);
          const eyebrow = String(block.eyebrow || '');
          const title = String(block.title || '');
          const subtitle = String(block.subtitle || '');
          
          const primaryHref = String(block.primaryCtaHref || '').startsWith('/') 
            ? String(block.primaryCtaHref) 
            : `/${locale}/${String(block.primaryCtaHref || 'services').replace(/^\//, '')}`;
            
          const secondaryHref = String(block.secondaryCtaHref || '').startsWith('/') 
            ? String(block.secondaryCtaHref) 
            : `/${locale}/${String(block.secondaryCtaHref || 'portfolio').replace(/^\//, '')}`;

          return (
            <section key={key} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
              {videoUrl ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover opacity-55"
                  src={videoUrl}
                  poster={poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : poster ? (
                <div className="absolute inset-0 bg-cover bg-center opacity-55" style={{ backgroundImage: `url(${poster})` }} />
              ) : null}
              
              <div className="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-dark-950/75 to-dark-950" />
              
              <Container>
                <motion.div
                  className="relative z-10 mx-auto max-w-5xl text-center space-y-8 py-20"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  {eyebrow && (
                    <div className="inline-flex">
                      <span className="rounded-full border border-premium-accent/35 bg-premium-accent/10 px-4 py-2 text-sm font-semibold text-premium-accent">
                        {eyebrow}
                      </span>
                    </div>
                  )}
                  <h1 className="hero-brand-gradient hero-brand-gradient-glow text-5xl font-bold leading-[1.05] md:text-7xl lg:text-8xl">
                    {title}
                  </h1>
                  {subtitle && <p className="mx-auto max-w-3xl text-xl text-dark-200 md:text-2xl leading-relaxed">{subtitle}</p>}
                  
                  <div className="flex flex-wrap justify-center gap-4 pt-4">
                    {typeof block.primaryCtaLabel === 'string' && block.primaryCtaLabel && (
                      <Link href={primaryHref}>
                        <Button size="lg">{block.primaryCtaLabel}</Button>
                      </Link>
                    )}
                    {typeof block.secondaryCtaLabel === 'string' && block.secondaryCtaLabel && (
                      <Link href={secondaryHref}>
                        <Button size="lg" variant="outline">
                          {block.secondaryCtaLabel}
                        </Button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              </Container>
            </section>
          );
        }

        if (type === 'contentBand') {
          return (
            <section key={key} className={cn(sectionStyle.sectionClass, 'border-y border-dark-800/60')}>
              <Container className={sectionStyle.containerClass}>
                <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  {block.heading ? (
                    <h2 className={cn('mb-6', sectionStyle.headingClass)}>{String(block.heading)}</h2>
                  ) : null}
                  <CMSRichText data={block.body} className={cn('prose prose-invert max-w-none text-dark-300', sectionStyle.textClass, sectionStyle.contentClass)} />
                </motion.div>
              </Container>
            </section>
          );
        }

        if (type === 'servicesStrip') {
          return (
            <section key={key} className={sectionStyle.sectionClass}>
              <Container className={sectionStyle.containerClass}>
                <div className="text-center mb-12 space-y-4">
                  <h2 className={sectionStyle.headingClass}>{String(block.heading || '')}</h2>
                  {block.subheading ? (
                    <p className={cn('text-dark-400 max-w-2xl mx-auto', sectionStyle.textClass)}>{String(block.subheading)}</p>
                  ) : null}
                </div>
                {cmsServices && cmsServices.length > 0 ? (
                  <motion.div
                    className={cn('grid gap-8', sectionStyle.gridClass)}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {cmsServices.map((svc) => {
                      const Icon = iconForName(svc.icon);
                      const slug = svc.slug || '';
                      const poster = svc.heroImage ? absoluteMediaUrl(String(svc.heroImage)) : undefined;
                      const inner = (
                        <Card className={cn('h-full hover:border-premium-accent/40 transition-colors overflow-hidden', sectionStyle.cardClass)}>
                          {poster ? (
                            <div className="relative h-40 w-full">
                              <Image src={poster} alt={svc.title || ''} fill className={sectionStyle.mediaClass} />
                            </div>
                          ) : null}
                          <div className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-premium-accent/10 text-premium-accent flex-shrink-0">
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1 space-y-2">
                                <h3 className="text-xl font-semibold">{svc.title}</h3>
                                <p className="text-dark-400 text-sm">{svc.shortDescription}</p>
                              </div>
                            </div>
                            {svc.ctaLabel ? (
                              <div className="mt-4">
                                <Link href={svc.ctaHref && svc.ctaHref.startsWith('/') ? svc.ctaHref : `/${locale}${svc.ctaHref || ''}`}>
                                  <Button size="sm" variant={sectionStyle.buttonVariant}>{svc.ctaLabel}</Button>
                                </Link>
                              </div>
                            ) : null}
                          </div>
                        </Card>
                      );
                      return slug ? (
                        <motion.div key={slug} variants={itemVariants}>
                          <Link href={`/${locale}/services/${slug}`}>{inner}</Link>
                        </motion.div>
                      ) : (
                        <motion.div key={svc.title} variants={itemVariants}>
                          {inner}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : null}
              </Container>
            </section>
          );
        }

        if (type === 'visionExpertise') {
          return (
            <section key={key} className={sectionStyle.sectionClass}>
              <Container className={sectionStyle.containerClass}>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <h2 className={cn('mb-6', sectionStyle.headingClass)}>{String(block.heading || '')}</h2>
                    <CMSRichText data={block.body} className={cn('text-dark-400 space-y-4 leading-relaxed', sectionStyle.textClass, sectionStyle.contentClass)} />
                  </motion.div>
                  <motion.div
                    className="relative rounded-2xl overflow-hidden border border-premium-accent/20 aspect-video bg-dark-900"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-premium-accent/15 via-transparent to-blue-500/15" />
                    <div className="absolute inset-0 flex items-center justify-center text-dark-500 text-sm tracking-widest uppercase">
                      Matterport · Street View · Drones · 360°
                    </div>
                  </motion.div>
                </div>
              </Container>
            </section>
          );
        }

        if (type === 'statsGrid') {
          const items = (block.items as Array<{ value?: string; label?: string }>) || [];
          return (
            <section key={key} className={sectionStyle.sectionClass}>
              <Container className={sectionStyle.containerClass}>
                <motion.div
                  className={cn('grid gap-8', sectionStyle.gridClass)}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {items.map((s, i) => (
                    <motion.div key={i} variants={itemVariants} className="text-center">
                      <div className="text-3xl md:text-5xl font-bold text-gradient mb-2">{s.value}</div>
                      <p className="text-dark-400 text-sm md:text-base">{s.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </Container>
            </section>
          );
        }

        if (type === 'featuredTours') {
          const tours =
            (block.tours as Array<{ title?: string; embedUrl?: string; poster?: CMSMedia }>) || [];
          return (
            <section key={key} className={sectionStyle.sectionClass}>
              <Container className={sectionStyle.containerClass}>
                <h2 className={cn('mb-10 text-center', sectionStyle.headingClass)}>{String(block.heading || '')}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {tours.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="rounded-2xl overflow-hidden border border-dark-700 bg-dark-900"
                    >
                      <div className="relative aspect-video bg-black">
                        {t.embedUrl ? (
                          <iframe src={t.embedUrl} className="absolute inset-0 h-full w-full border-0" title={t.title || 'Tour'} />
                        ) : resolvePoster(t.poster) ? (
                          <Image src={resolvePoster(t.poster)!} alt="" fill className="object-cover" />
                        ) : null}
                      </div>
                      <div className="p-4 border-t border-dark-800">
                        <p className="font-semibold">{t.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Container>
            </section>
          );
        }

        if (type === 'showcase') {
          return (
            <section key={key} className={sectionStyle.sectionClass}>
              <Container className={sectionStyle.containerClass}>
                <h2 className={cn('mb-8', sectionStyle.headingClass)}>{String(block.heading || '')}</h2>
                <CMSRichText data={block.body} className={cn('max-w-4xl text-dark-300', sectionStyle.textClass, sectionStyle.contentClass)} />
              </Container>
            </section>
          );
        }

        if (type === 'ctaBanner') {
          const href = String(block.buttonHref || `/${locale}/contact`);
          return (
            <section key={key} className={sectionStyle.sectionClass}>
              <Container className={sectionStyle.containerClass}>
                <motion.div
                  className="relative rounded-2xl overflow-hidden border border-premium-accent/30 px-8 md:px-16 py-14 md:py-20 text-center space-y-6 bg-gradient-to-r from-premium-accent/10 to-blue-500/10"
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <h2 className={sectionStyle.headingClass}>{String(block.heading || '')}</h2>
                  {block.text ? <p className={cn('text-dark-300 max-w-2xl mx-auto', sectionStyle.textClass)}>{String(block.text)}</p> : null}
                  <Link href={href.startsWith('/') ? href : `/${locale}${href}`}>
                    <Button size="lg" variant={sectionStyle.buttonVariant}>{String(block.buttonLabel || '')}</Button>
                  </Link>
                </motion.div>
              </Container>
            </section>
          );
        }

        // Additional dynamic blocks introduced via Payload page builder
        if (type === 'aboutBlock') {
          const image = resolvePoster(block.image) || '/en/matterport.png';
          const eyebrow = String(block.eyebrow || (locale === 'en' ? 'About GoMapView' : 'من نحن'));
          const title = String(
            block.title ||
              (locale === 'en'
                ? 'Cinematic scanning stories with Matterport-level precision'
                : 'قصص مسح سينمائية بدقة على مستوى Matterport')
          );

          return (
            <CinematicAboutSection
              key={key}
              locale={locale}
              eyebrow={eyebrow}
              title={title}
              body={block.body}
              plainBody={locale === 'en'
                ? 'We craft immersive walkthroughs with luxury composition, smooth transitions, and precise digital spatial storytelling for hospitality, retail, and landmark destinations.'
                : 'نصنع جولات غامرة بتكوين فاخر وانتقالات سلسة وسرد بصري مكاني دقيق لقطاع الضيافة والتجزئة والوجهات المميزة.'}
              imageSrc={image}
              imageAlt={locale === 'en' ? 'GoMapView immersive about preview' : 'معاينة قسم من نحن من GoMapView'}
            />
          );
        }

        if (type === 'portfolioBlock') {
          const items = Array.isArray(block.items) ? (block.items as Array<Record<string, unknown>>) : [];
          return (
            <section key={key} className="py-16 md:py-24 bg-dark-900">
              <Container>
                {block.heading ? <h2 className="text-4xl font-bold mb-8">{String(block.heading)}</h2> : null}
                <div className="grid md:grid-cols-3 gap-6">
                  {block.displayMode === 'manual' ? (
                    items.map((it, i) => {
                      const p = asRecord(it.project);
                      const slug = String(p?.slug || `p-${i}`);
                      const poster = resolvePoster(p?.heroImage);
                      return (
                        <div key={slug} className="rounded-xl overflow-hidden border border-dark-700 bg-dark-950">
                          {poster ? <Image src={poster} alt={String(p?.title || '')} width={800} height={500} className="object-cover w-full h-56" /> : null}
                          <div className="p-4">
                            <h3 className="font-semibold">{String(p?.title || '')}</h3>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-dark-400">Showing latest portfolio items (configured in Portfolio collection).</p>
                  )}
                </div>
              </Container>
            </section>
          );
        }

        if (type === 'teamBlock') {
          const members = Array.isArray(block.members) ? (block.members as Array<Record<string, unknown>>) : [];
          return (
            <section key={key} className="py-16 md:py-24 bg-dark-950">
              <Container>
                {block.heading ? <h2 className="text-4xl font-bold mb-8">{String(block.heading)}</h2> : null}
                <div className="grid md:grid-cols-3 gap-6">
                  {members.map((m, i) => {
                    const member = asRecord(m.member);
                    const avatar = resolvePoster(member?.photo);
                    return (
                      <div key={String(member?.slug || i)} className="p-4 text-center border border-dark-700 rounded-lg bg-dark-900">
                        {avatar ? <Image src={avatar} alt={String(member?.name || '')} width={120} height={120} className="rounded-full mx-auto" /> : null}
                        <h4 className="mt-4 font-semibold">{String(member?.name || '')}</h4>
                        <p className="text-dark-400">{String(member?.role || '')}</p>
                      </div>
                    );
                  })}
                </div>
              </Container>
            </section>
          );
        }

        if (type === 'testimonialsBlock') {
          const items = Array.isArray(block.testimonials) ? (block.testimonials as Array<Record<string, unknown>>) : [];
          return (
            <section key={key} className="py-16 md:py-24 bg-dark-900">
              <Container>
                {block.heading ? <h2 className="text-4xl font-bold mb-8">{String(block.heading)}</h2> : null}
                <div className="grid md:grid-cols-2 gap-6">
                  {items.map((it, i) => {
                    const t = asRecord(it.testimonial);
                    return (
                      <div key={String(t?.id || i)} className="p-6 border border-dark-700 rounded-lg bg-dark-950">
                        <p className="text-dark-300">{String(t?.quote || '')}</p>
                        <p className="mt-4 font-semibold">{String(t?.author || '')}</p>
                      </div>
                    );
                  })}
                </div>
              </Container>
            </section>
          );
        }

        if (type === 'galleryBlock') {
          const imgs = Array.isArray(block.images) ? (block.images as Array<Record<string, unknown>>) : [];
          return (
            <section key={key} className="py-16 md:py-24 bg-dark-950">
              <Container>
                {block.heading ? <h2 className="text-4xl font-bold mb-8">{String(block.heading)}</h2> : null}
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {imgs.map((it, i) => {
                    const url = resolvePoster(it.image);
                    return (
                      <div key={i} className="relative h-48 rounded-lg overflow-hidden border border-dark-700 bg-dark-900">
                        {url ? <Image src={url} alt="" fill className="object-cover" /> : null}
                      </div>
                    );
                  })}
                </div>
              </Container>
            </section>
          );
        }

        if (type === 'contactBlock') {
          return (
            <section key={key} className="py-16 md:py-24 bg-gradient-to-b from-dark-900 to-dark-950">
              <Container>
                {block.heading ? <h2 className="text-4xl font-bold mb-4">{String(block.heading)}</h2> : null}
                {block.subheading ? <p className="text-dark-400 mb-6">{String(block.subheading)}</p> : null}
                {block.showForm ? (
                  <Link href={`/${locale}/contact`}>
                    <Button size="lg">{locale === 'en' ? 'Contact Us' : 'اتصل بنا'}</Button>
                  </Link>
                ) : null}
                {block.mapEmbedUrl ? (
                  <div className="mt-8 rounded-lg overflow-hidden border border-dark-700">
                    <iframe src={String(block.mapEmbedUrl)} className="w-full h-80 border-0" />
                  </div>
                ) : null}
              </Container>
            </section>
          );
        }

        if (type === 'videoBlock') {
          return (
            <section key={key} className="py-16 md:py-24 bg-dark-950">
              <Container>
                {block.title ? <h2 className="text-4xl font-bold mb-6">{String(block.title)}</h2> : null}
                <div className="relative aspect-video rounded-xl overflow-hidden border border-dark-700 bg-black">
                  {block.videoUrl ? <iframe src={String(block.videoUrl)} className="absolute inset-0 w-full h-full border-0" /> : null}
                </div>
              </Container>
            </section>
          );
        }

        if (type === 'featuresBlock') {
          const items = Array.isArray(block.items) ? (block.items as Array<Record<string, unknown>>) : [];
          return (
            <section key={key} className="py-16 md:py-24 bg-dark-900">
              <Container>
                {block.heading ? <h2 className="text-4xl font-bold mb-8">{String(block.heading)}</h2> : null}
                <div className="grid md:grid-cols-3 gap-6">
                  {items.map((it, i) => (
                    <div key={i} className="p-6 border border-dark-700 rounded-lg bg-dark-950">
                      {it.icon ? <div className="mb-3 text-premium-accent">{String(it.icon)}</div> : null}
                      <h4 className="font-semibold mb-2">{String(it.title || '')}</h4>
                      <p className="text-dark-400">{String(it.description || '')}</p>
                    </div>
                  ))}
                </div>
              </Container>
            </section>
          );
        }

        if (type === 'timelineBlock') {
          const events = Array.isArray(block.events) ? (block.events as Array<Record<string, unknown>>) : [];
          return (
            <section key={key} className="py-16 md:py-24 bg-dark-950">
              <Container>
                {block.heading ? <h2 className="text-4xl font-bold mb-8">{String(block.heading)}</h2> : null}
                <div className="space-y-6">
                  {events.map((e, i) => (
                    <div key={i} className="p-4 border border-dark-700 rounded-lg bg-dark-900">
                      <div className="text-dark-400">{String(e.date || '')}</div>
                      <h4 className="font-semibold">{String(e.title || '')}</h4>
                      <p className="text-dark-400">{String(e.description || '')}</p>
                    </div>
                  ))}
                </div>
              </Container>
            </section>
          );
        }

        if (type === 'faqBlock') {
          const items = Array.isArray(block.items) ? (block.items as Array<Record<string, unknown>>) : [];
          return (
            <section key={key} className="py-16 md:py-24 bg-dark-900">
              <Container>
                {block.heading ? <h2 className="text-4xl font-bold mb-8">{String(block.heading)}</h2> : null}
                <div className="space-y-4">
                  {items.map((q, i) => (
                    <details key={i} className="p-4 border border-dark-700 rounded-lg bg-dark-950">
                      <summary className="font-semibold">{String(q.question || '')}</summary>
                      <div className="mt-2 text-dark-400">
                        <CMSRichText data={q.answer} />
                      </div>
                    </details>
                  ))}
                </div>
              </Container>
            </section>
          );
        }

        return null;
      })}
    </>
  );
}

