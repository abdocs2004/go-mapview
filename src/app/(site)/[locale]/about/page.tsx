import type { Metadata } from 'next';
import * as React from 'react';
import type { Locale } from '@lib/i18n';
// framer-motion must only be used in client components; avoid importing here
import Container from '@components/Container';
import Card from '@components/Card';
import Button from '@components/Button';
import { Zap, Target, Award, Users } from 'lucide-react';
import Link from 'next/link';
import AboutSection from '@components/AboutSection';
import WhatWeDoSection, { type WhatWeDoData } from '@components/WhatWeDoSection';
import SeoJsonLd from '@components/SeoJsonLd';
import { buildBreadcrumbSchema, buildPageMetadata, loadSeoContext, resolveMediaUrl } from '@lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (raw as Locale) || 'en';
  const seo = await loadSeoContext(locale);
  const title = locale === 'en' ? 'About GoMapView | Digital Twin Services & Matterport Experts Saudi Arabia' : 'عن GoMapView | خبراء ماتربورت والتوائم الرقمية في السعودية';
  const description =
    locale === 'en'
      ? 'Discover GoMapView, the premier provider of Matterport 3D virtual tours and digital twin services for B2B clients across Saudi Arabia and the UAE.'
      : 'تعرف على GoMapView، المزود الرائد لخدمات ماتربورت والتوائم الرقمية والجولات الافتراضية ثلاثية الأبعاد للشركات في السعودية والإمارات.';

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/about`,
    title,
    description,
    siteName: typeof seo.site?.siteName === 'string' ? seo.site.siteName : 'GoMapView',
    ogImage: resolveMediaUrl(seo.site?.logo),
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: raw } = await params;
  const locale = (raw as Locale) || 'en';
  // Static What We Do section — not editable from the dashboard
  const enCards = [
    {
      title: '360 Tours',
      description: 'Immersive 360° virtual tours for properties and venues.',
      href: `/${locale}/services`,
      isPublished: true,
      order: 0,
    },
    {
      title: 'Matterport',
      description: 'High-fidelity Matterport captures and immersive walkthroughs.',
      href: `/${locale}/services/matterport`,
      isPublished: true,
      order: 1,
    },
    {
      title: 'Professional Photography',
      description: 'Premium photography to showcase spaces with cinematic quality.',
      href: `/${locale}/services/photography`,
      isPublished: true,
      order: 2,
    },
    {
      title: 'SEO Visibility',
      description: 'Improve search visibility to attract more clients and listings.',
      href: `/${locale}/services/seo`,
      isPublished: true,
      order: 3,
    },
  ];

  const arCards = enCards.map((c) => ({
    ...c,
    title:
      c.title === '360 Tours'
        ? 'جولات 360'
        : c.title === 'Matterport'
        ? 'ماتربورت'
        : c.title === 'Professional Photography'
        ? 'التصوير الاحترافي'
        : 'ظهور في محركات البحث',
    description:
      c.title === '360 Tours'
        ? 'جولات افتراضية بزاوية 360° للعقارات والأماكن.'
        : c.title === 'Matterport'
        ? 'التقاطات عالية الدقة ومشاهد غامرة.'
        : c.title === 'Professional Photography'
        ? 'تصوير احترافي لعرض المساحات بجودة سينمائية.'
        : 'تحسين الظهور في نتائج البحث لجذب المزيد من العملاء.',
  }));

  const whatWeDo: WhatWeDoData = {
    sectionTitle: locale === 'en' ? 'What We Do' : 'ماذا نفعل',
    sectionSubtitle:
      locale === 'en'
        ? 'Premium services to showcase spaces, capture leads, and boost visibility.'
        : 'خدمات مميزة لعرض المساحات، جذب العملاء، وزيادة الظهور.',
    cards: locale === 'en' ? enCards : arCards,
  } satisfies WhatWeDoData;

  const values = [
    {
      icon: Target,
      title: locale === 'en' ? 'Our Mission' : 'مهمتنا',
      description:
        locale === 'en'
          ? 'To revolutionize how people explore and discover spaces through innovative virtual tour technology.'
          : 'إحداث ثورة في طريقة استكشاف الناس للأماكن من خلال تقنية الجولات الافتراضية المبتكرة.',
    },
    {
      icon: Zap,
      title: locale === 'en' ? 'Our Vision' : 'رؤيتنا',
      description:
        locale === 'en'
          ? 'To become the leading platform for immersive digital experiences globally.'
          : 'أن نصبح المنصة الرائدة للتجارب الرقمية الغامرة عالميًا.',
    },
    {
      icon: Award,
      title: locale === 'en' ? 'Our Excellence' : 'تميزنا',
      description:
        locale === 'en'
          ? 'Consistently delivering premium quality virtual tours with cutting-edge technology.'
          : 'تقديم جولات افتراضية عالية الجودة باستمرار.',
    },
    {
      icon: Users,
      title: locale === 'en' ? 'Our Team' : 'فريقنا',
      description:
        locale === 'en'
          ? 'Expert professionals with years of experience in photography, technology, and digital marketing.'
          : 'متخصصون ذوو خبرة في التصوير والتكنولوجيا والتسويق الرقمي.',
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: locale === 'en' ? 'Home' : 'الرئيسية', item: `/${locale}` },
    { name: locale === 'en' ? 'About' : 'من نحن', item: `/${locale}/about` },
  ]);

  return (
    <>
      <SeoJsonLd schemas={[breadcrumbSchema]} />
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background video from public/about-bg.mp4 */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/about-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* overlay removed so background video is fully visible */}

        <Container>
          <div className="relative z-10 text-center space-y-8">
            {/* Intentionally empty hero content per request (no h or p) */}
          </div>
        </Container>
      </section>

      <AboutSection locale={locale} />

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-dark-950">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index}>
                  <Card>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-premium-accent/10 w-fit">
                        <IconComponent className="w-6 h-6 text-premium-accent" />
                      </div>
                      <h3 className="text-xl font-semibold">{value.title}</h3>
                      <p className="text-dark-400 text-sm">{value.description}</p>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* What We Do Section (CMS-driven) */}
      {whatWeDo && <WhatWeDoSection data={whatWeDo} locale={locale} />}


      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-dark-950">
        <Container>
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-premium-accent/20 to-blue-500/20" />
            <div className="relative px-8 md:px-16 py-16 md:py-24 text-center space-y-6 border border-premium-accent/30 rounded-2xl">
              <h2 className="text-4xl md:text-5xl font-bold">
                {locale === 'en'
                  ? 'Join Hundreds of Satisfied Clients'
                  : 'انضم إلى مئات العملاء الراضين'}
              </h2>
              <p className="text-xl text-dark-300 max-w-2xl mx-auto">
                {locale === 'en'
                  ? 'Experience the GoMapView difference today.'
                  : 'اختبر الفارق اليوم.'}
              </p>
              <Link href={`/${locale}/contact`}>
                <Button size="lg">
                  {locale === 'en' ? 'Get Started' : 'ابدأ الآن'}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
