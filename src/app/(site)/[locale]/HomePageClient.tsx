'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Locale } from '@lib/i18n';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '@components/Container';
import Button from '@components/Button';
import Card from '@components/Card';
import RenderedSections, { type ServiceCardModel } from '@components/home/RenderedSections';
import CinematicAboutSection from '@components/home/CinematicAboutSection';
import MatterportExperienceSection from '@components/home/MatterportExperienceSection';
import OurClients from '@components/OurClients';
import PremiumFAQ from '@components/home/PremiumFAQ';
import { absoluteMediaUrl } from '@lib/media-url';
import TestimonialsSlider, { type Testimonial } from '@components/TestimonialsSlider';
import {
  Camera,
  MapPin,
  Eye,
  Globe,
  Zap,
  TrendingUp,
  ArrowRight,
  Building2,
  UtensilsCrossed,
  Satellite,
} from 'lucide-react';

const STOCK_HERO_VIDEO =
  'https://videos.pexels.com/video-files/2499611/2499611-hd_1920_1080_25fps.mp4';

function posterSrc(poster: unknown): string | undefined {
  if (!poster || typeof poster !== 'object') return undefined;
  const u = (poster as { url?: string }).url;
  return u ? absoluteMediaUrl(u) : undefined;
}

function defaultServices(locale: Locale): ServiceCardModel[] {
  const en = locale === 'en';
  return [
    {
      slug: '360-virtual-tours',
      icon: 'camera',
      title: en ? '360 Virtual Tours' : 'جولات افتراضية 360',
      shortDescription: en
        ? 'Capture stunning 360° immersive experiences for any property'
        : 'التقط تجارب افتراضية غامرة بزاوية 360 درجة',
    },
    {
      slug: 'matterport-style-tours',
      icon: 'map-pin',
      title: en ? 'Matterport-style Tours' : 'جولات على طراز Matterport',
      shortDescription: en
        ? 'Professional Matterport-style virtual tours with 3D mapping'
        : 'جولات افتراضية احترافية مع خرائط ثلاثية الأبعاد',
    },
    {
      slug: 'real-estate-photography',
      icon: 'eye',
      title: en ? 'Real Estate Photography' : 'تصوير العقارات',
      shortDescription: en
        ? 'High-quality drone and professional property photography'
        : 'تصوير احترافي بالمناظير الجوية وبالاستوديو',
    },
    {
      slug: 'google-maps-integration',
      icon: 'globe',
      title: en ? 'Google Maps Integration' : 'تكامل خرائط جوجل',
      shortDescription: en
        ? 'Seamless integration with Google Business Profile'
        : 'تكامل سلس مع ملف الأعمال على جوجل',
    },
    {
      slug: 'local-seo',
      icon: 'zap',
      title: en ? 'Local SEO' : 'تحسين محلي SEO',
      shortDescription: en
        ? 'Boost your online visibility in local search results'
        : 'عزز ظهورك في نتائج البحث المحلي',
    },
    {
      slug: 'google-business-optimization',
      icon: 'map-pin',
      title: en ? 'Google Business Optimization' : 'تحسين ملف جوجل للأعمال',
      shortDescription: en
        ? 'Profiles, posts, imagery & insights tuned for conversions'
        : 'ملفات، منشورات، صور وتحليلات للتحويلات',
    },
    {
      slug: 'marketing-solutions',
      icon: 'trending-up',
      title: en ? 'Marketing Solutions' : 'حلول تسويقية',
      shortDescription: en
        ? 'Campaign creative and distribution across paid & organic channels'
        : 'إبداع الحملات وتوزيعها على القنوات المدفوعة والعضوية',
    },
  ];
}

interface HeroFields {
  videoUrl?: string;
  poster?: unknown;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

interface HomePageClientProps {
  locale: Locale;
  heroBlock?: Record<string, unknown>;
  sections: Array<Record<string, unknown>>;
  cmsServices: ServiceCardModel[];
  testimonials?: Testimonial[];
  matterportData?: Record<string, unknown> | null;
}

export default function HomePageClient({ locale, heroBlock, sections, cmsServices, testimonials, matterportData }: HomePageClientProps) {
  const hero = heroBlock as HeroFields | undefined;
  const hasServicesStrip = sections.some((s) => s.blockType === 'servicesStrip');
  
  const videoUrl = hero?.videoUrl || STOCK_HERO_VIDEO;
  const poster = posterSrc(hero?.poster);

  const eyebrow =
    hero?.eyebrow || (locale === 'en' ? 'Immersive capture · Matterport-grade delivery' : 'التقاط غامر · جودة Matterport');
  const title =
    hero?.title ||
    (locale === 'en' ? 'Turn buildings into navigable worlds' : 'حوّل المباني إلى عوالم قابلة للاستكشاف');
  const subtitle =
    hero?.subtitle ||
    (locale === 'en'
      ? '360°, drones, Google Maps & editorial-grade photography for real estate, hospitality, retail & landmarks.'
      : '360°، طائرات بدون طيار، خرائط جوجل وتصوير تحريري للعقارات والضيافة والتجزئة والمعالم.');

  const servicesList = cmsServices.length ? cmsServices : defaultServices(locale);

  const hasAboutBlock = sections.some((s) => s.blockType === 'aboutBlock');

  const stats =
    hero && sections.some((s) => s.blockType === 'statsGrid')
      ? []
      : [
          { number: '500+', label: locale === 'en' ? 'Spaces digitized' : 'مساحات رُقمت' },
          { number: '40+', label: locale === 'en' ? 'Cities covered' : 'مدن مغطاة' },
          { number: '12+', label: locale === 'en' ? 'Years capture ops' : 'سنوات تشغيل التصوير' },
          { number: '4.9', label: locale === 'en' ? 'Avg. partner rating' : 'متوسط تقييم الشركاء' },
        ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const servicesRef = useRef<HTMLDivElement | null>(null);
console.log("matterportData",matterportData);

  useEffect(() => {
    if (!servicesRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = servicesRef.current;
    const items = section.querySelectorAll('.service-bubble-item');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (reduceMotion || isMobile) {
      gsap.set(items, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 88%',
        end: 'top 35%',
        scrub: 0.8,
      },
    });

    tl.fromTo(
      items,
      { opacity: 0, y: 28, scale: 0.96, filter: 'blur(6px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', stagger: 0.22, ease: 'power3.out' }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  const primaryHref =
    hero?.primaryCtaHref?.startsWith('http') || hero?.primaryCtaHref?.startsWith('/')
      ? hero?.primaryCtaHref || `/${locale}/services`
      : `/${locale}/${hero?.primaryCtaHref ? hero.primaryCtaHref.replace(/^\//, '') : 'services'}`;

  const secondaryHref =
    hero?.secondaryCtaHref?.startsWith('http') || hero?.secondaryCtaHref?.startsWith('/')
      ? hero?.secondaryCtaHref || `/${locale}/portfolio`
      : `/${locale}/${hero?.secondaryCtaHref ? hero.secondaryCtaHref.replace(/^\//, '') : 'portfolio'}`;


      
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <video
          className="absolute inset-0 hidden h-full w-full object-cover opacity-55 lg:block"
          src={videoUrl}
          poster={poster}
          preload="none"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-cover bg-center opacity-55 lg:hidden" style={poster ? { backgroundImage: `url(${poster})` } : undefined} />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-dark-950/75 to-dark-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,217,255,0.14),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.12),transparent_40%)]" />

        {/* Floating HUD */}
        <motion.div
          className="pointer-events-none absolute left-[8%] top-[22%] hidden lg:block rounded-2xl border border-white/10 bg-dark-950/40 px-4 py-3 backdrop-blur-md shadow-neon-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center gap-3 text-xs text-dark-200">
            <Building2 className="h-5 w-5 text-premium-accent" />
            <span>{locale === 'en' ? 'Commercial · LOD-ready meshes' : 'تجاري · شبكات جاهزة LOD'}</span>
          </div>
        </motion.div>
        <motion.div
          className="pointer-events-none absolute right-[10%] bottom-[28%] hidden lg:block rounded-2xl border border-white/10 bg-dark-950/40 px-4 py-3 backdrop-blur-md"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center gap-3 text-xs text-dark-200">
            <UtensilsCrossed className="h-5 w-5 text-premium-accent" />
            <span>{locale === 'en' ? 'Hospitality · Night interiors' : 'ضيافة · تصوير ليلي داخلي'}</span>
          </div>
        </motion.div>
        <motion.div
          className="pointer-events-none absolute right-[18%] top-[18%] hidden xl:block rounded-full border border-premium-accent/30 bg-premium-accent/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-premium-accent"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          360° · HDR · LiDAR-friendly
        </motion.div>
        <motion.div
          className="pointer-events-none absolute left-[15%] bottom-[20%] hidden xl:flex items-center gap-2 rounded-full border border-dark-700 bg-dark-950/60 px-3 py-2 text-[11px] text-dark-300"
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Satellite className="h-4 w-4 text-premium-accent" />
          Google Maps · Street View · Tours
        </motion.div>

        <Container>
          <motion.div
            className="relative z-10 mx-auto max-w-5xl text-center space-y-8 py-24"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
          >
            <div className="inline-flex">
              <span className="rounded-full border border-premium-accent/35 bg-premium-accent/10 px-4 py-2 text-sm font-semibold text-premium-accent">
                {eyebrow}
              </span>
            </div>
            <h1 className="hero-brand-gradient hero-brand-gradient-glow text-5xl font-bold leading-[1.05] md:text-7xl lg:text-8xl">
              {title}
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-dark-200 md:text-2xl leading-relaxed">{subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href={primaryHref}>
                <Button size="lg">{hero?.primaryCtaLabel || (locale === 'en' ? 'Explore Services' : 'استكشف الخدمات')}</Button>
              </Link>
              <Link href={secondaryHref}>
                <Button size="lg" variant="outline">
                  {hero?.secondaryCtaLabel || (locale === 'en' ? 'Immersive reel' : 'عرض غامر')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

  <OurClients />

  {/* Fallback About Preview: render a cinematic showcase on the right when the CMS doesn't provide an aboutBlock */}
  {!hasAboutBlock ? (
    <CinematicAboutSection
      locale={locale}
      eyebrow={locale === 'en' ? 'About GoMapView' : 'من نحن'}
      title={locale === 'en' ? 'Immersive stories with cinematic capture depth' : 'قصص غامرة بعمق تصوير سينمائي'}
      plainBody={locale === 'en'
        ? 'From 360 tours to Matterport-inspired walkthroughs, we combine visual elegance, technical precision, and smooth interaction design to make every space unforgettable.'
        : 'من الجولات 360 إلى التجارب المستوحاة من Matterport، نمزج بين الأناقة البصرية والدقة التقنية والتفاعل السلس لجعل كل مساحة لا تُنسى.'}
      imageSrc="/en/matterport.png"
      imageAlt={locale === 'en' ? 'About preview' : 'معاينة قسم من نحن'}
      actions={[
        {
          label: hero?.primaryCtaLabel || (locale === 'en' ? 'Explore Services' : 'استكشف الخدمات'),
          href: primaryHref,
          variant: 'primary',
        },
        {
          label: hero?.secondaryCtaLabel || (locale === 'en' ? 'Immersive reel' : 'عرض غامر'),
          href: secondaryHref,
          variant: 'outline',
        },
      ]}
    />
  ) : null}

  {/* Matterport Experience Section */}
  {matterportData?.isEnabled !== false && matterportData?.matterportUrl && (
    <MatterportExperienceSection
      locale={locale}
      sectionTitle={ (locale === 'en' ? 'Step Inside the Experience' : 'ادخل إلى قلب التجربة')}
      sectionDescription={(locale === 'en' ? 'Explore immersive Matterport virtual tours and navigate spaces as if you were physically there.' : 'استكشف جولات Matterport الافتراضية الغامرة وتنقل داخل المساحات كما لو كنت موجوداً هناك بنفسك.')}
      matterportUrl={matterportData?.matterportUrl as string}
      ctaLabel={(locale === 'en' ? 'Explore Services' : 'استكشف الخدمات')}
      ctaHref={(matterportData?.ctaHref as string) || undefined}
    />
  )}

  <RenderedSections locale={locale} sections={sections} cmsServices={servicesList} />

  {/* Testimonials section inserted before final CTA */}
  {testimonials && testimonials.length ? <TestimonialsSlider testimonials={testimonials} /> : null}

      {!hasServicesStrip ? (
        <section className="py-20 md:py-32 bg-dark-950">
          <Container>
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                {locale === 'en' ? 'Studio-grade capture stack' : 'استوديو التقاط احترافي'}
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-dark-400">
                {locale === 'en'
                  ? 'Everything from scanning to publishing — tuned for velocity and polish.'
                  : 'من المسح إلى النشر — سرعة وجودة تشبه Matterport.'}
              </p>
            </motion.div>

            <motion.div
              ref={servicesRef}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {servicesList.map((service, idx) => {
                const iconKey = (service.icon || 'camera').toLowerCase().replace(/-/g, '');
                const IconComponent =
                  iconKey === 'mappin'
                    ? MapPin
                    : iconKey === 'eye'
                      ? Eye
                      : iconKey === 'globe'
                        ? Globe
                        : iconKey === 'zap'
                          ? Zap
                          : iconKey === 'trendingup'
                            ? TrendingUp
                            : Camera;
                const inner = (
                  <Card className="h-full transition-colors hover:border-premium-accent/40 service-bubble">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 rounded-lg bg-premium-accent/10 p-3 text-premium-accent">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-semibold">{service.title}</h3>
                        <p className="text-sm text-dark-400">{service.shortDescription}</p>
                      </div>
                    </div>
                  </Card>
                );
                return (
                  <motion.div key={service.slug || idx} variants={itemVariants} className="service-bubble-item">
                    {service.slug ? <Link href={`/${locale}/services/${service.slug}`}>{inner}</Link> : inner}
                  </motion.div>
                );
              })}
            </motion.div>
          </Container>
        </section>
      ) : null}

      {stats.length > 0 ? (
        <section className="bg-gradient-to-b from-dark-900 to-dark-950 py-20 md:py-32">
          <Container>
            <motion.div
              className="grid grid-cols-2 gap-8 md:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div key={index} variants={itemVariants} className="text-center">
                  <div className="mb-2 text-3xl font-bold text-gradient md:text-5xl">{stat.number}</div>
                  <p className="text-sm text-dark-400 md:text-base">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      ) : null}

      <PremiumFAQ locale={locale} faqBlock={sections.find((s) => s.blockType === 'faqBlock')} />

      <section className="bg-dark-950 py-20 md:py-32">
        <Container>
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-premium-accent/30 bg-gradient-to-r from-premium-accent/15 to-blue-500/15 px-8 py-16 text-center md:px-16 md:py-24"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold md:text-5xl">
              {locale === 'en' ? 'Schedule a walkthrough of your space' : 'جدولة جولة افتراضية لمساحتك'}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-dark-200">
              {locale === 'en'
                ? 'From laser-aligned panoramas to cinematic drone reveals — we ship assets ready for Maps, MLS & paid media.'
                : 'من البانوراما المعايرة إلى اللقطات الجوية السينمائية — أصول جاهزة للخرائط والإعلان.'}
            </p>
            <Link href={`/${locale}/contact`} className="mt-8 inline-block">
              <Button size="lg" className="gap-2">
                {locale === 'en' ? 'Book a capture window' : 'احجز موعد التصوير'}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
