import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@components/Container';
import Button from '@components/Button';
import SeoJsonLd from '@components/SeoJsonLd';
import { blogArticles } from '@lib/blog-data';
import { buildBreadcrumbSchema, buildStandalonePageMetadata, loadSeoContext, resolveMediaUrl } from '@lib/seo';
import { Locale, messages } from '@lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;
  const seo = await loadSeoContext(locale);
  return buildStandalonePageMetadata({
    pathname: `/${locale}/blog`,
    title: locale === 'ar' ? 'المدونة | رؤى ماتربورت والتوائم الرقمية في السعودية | GoMapView' : 'Blog | Matterport & Digital Twin Insights Saudi Arabia | GoMapView',
    description:
      locale === 'ar'
        ? 'استكشف رؤى GoMapView للشركات حول جولات ماتربورت الافتراضية، والتصوير العقاري، وإنشاء التوائم الرقمية للفنادق والمساحات التجارية في السعودية والإمارات.'
        : 'Explore B2B insights from GoMapView on Matterport 3D virtual tours, commercial real estate photography, and digital twin creation for hotels in Saudi Arabia and the UAE.',
    siteName: typeof seo.site?.siteName === 'string' ? seo.site.siteName : 'GoMapView',
    ogImage: resolveMediaUrl(seo.site?.logo) || '/logo.png',
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;
  const m = messages[locale];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: m.nav.home, item: `/${locale}` },
    { name: locale === 'ar' ? 'المدونة' : 'Blog', item: `/${locale}/blog` },
  ]);

  return (
    <>
      <SeoJsonLd schemas={[breadcrumbSchema]} />

      <main className="bg-dark-950 text-white">
        <section className="relative overflow-hidden border-b border-white/10 pt-28 pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.24),_transparent_35%),radial-gradient(circle_at_right,_rgba(59,130,246,0.18),_transparent_30%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.15)_0%,rgba(10,10,12,0.85)_100%)]" />
          <Container className="relative z-10">
            <div className="max-w-4xl space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-premium-accent">
                {locale === 'ar' ? 'مدونة GoMapView' : 'GoMapView Journal'}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                {locale === 'ar'
                  ? 'رؤى مميزة حول التجارب الرقمية الغامرة'
                  : 'Premium insights on immersive digital experiences'}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-dark-300">
                {locale === 'ar'
                  ? 'اكتشف كيف تساعد الجولات الافتراضية، وتجارب Matterport، ورواية القصص المرئية المميزة العقارات والضيافة والشركات المحلية على جذب المزيد من الاهتمام والتحويل بشكل أسرع.'
                  : 'Explore how virtual tours, Matterport-style experiences, and premium visual storytelling help real estate, hospitality, and local businesses attract more attention and convert faster.'}
              </p>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-20">
          <Container>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {blogArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${locale}/blog/${article.slug}`}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-premium-accent/40 hover:bg-white/8"
                >
                  <article className="flex h-full flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={article.coverImage}
                        alt={article.coverAlt[locale]}
                        loading="eager"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="duration-700 group-hover:scale-105 absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/10 to-transparent" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-dark-950/70 px-3 py-1 text-xs uppercase tracking-[0.3em] text-premium-accent backdrop-blur-md">
                        {article.category[locale]}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
                      <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.28em] text-dark-400">
                        <span>{new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(article.publishedAt))}</span>
                        <span>{article.readTime[locale]}</span>
                      </div>
                      <h2 className="text-2xl font-semibold leading-tight text-white transition-colors duration-200 group-hover:text-premium-accent">
                        {article.title[locale]}
                      </h2>
                      <p className="text-sm leading-7 text-dark-300">{article.excerpt[locale]}</p>
                      <div className="mt-auto flex items-center justify-between gap-4 pt-2">
                        <span className="text-sm text-dark-400 transition-colors duration-200 group-hover:text-white">
                          {locale === 'ar' ? 'اقرأ المقال كاملاً' : 'Read the full article'}
                        </span>
                        <span>
                          <Button variant="outline" size="sm">
                            {locale === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                          </Button>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section className="pb-20 md:pb-28">
          <Container>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(13,148,136,0.18)_0%,rgba(15,23,42,0.92)_50%,rgba(37,99,235,0.2)_100%)] px-8 py-14 md:px-16 md:py-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_24%)]" />
              <div className="relative mx-auto max-w-3xl text-center">
                <p className="text-sm uppercase tracking-[0.4em] text-premium-accent">
                  {locale === 'ar' ? 'اتصل بـ GoMapView' : 'Contact GoMapView'}
                </p>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
                  {locale === 'ar' ? 'جاهز لتحويل تجربة عملك؟' : 'Ready to Transform Your Business Experience?'}
                </h2>
                <p className="mt-5 text-lg leading-8 text-dark-300">
                  {locale === 'ar'
                    ? 'دع GoMapView تساعدك في إنشاء تجارب افتراضية غامرة تجذب المزيد من العملاء وترفع مستوى حضورك عبر الإنترنت.'
                    : 'Let GoMapView help you create immersive virtual experiences that attract more customers and elevate your online presence.'}
                </p>
                <div className="mt-10 flex justify-center">
                  <Link href={`/${locale}/contact`}>
                    <Button size="lg">{locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
