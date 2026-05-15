import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@components/Container';
import Button from '@components/Button';
import SeoJsonLd from '@components/SeoJsonLd';
import { blogArticles, getBlogArticleBySlug } from '@lib/blog-data';
import {
  buildArticleSchema,
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildStandalonePageMetadata,
  loadSeoContext,
} from '@lib/seo';

type BlogPageParams = {
  slug: string;
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function renderSection(section: (typeof blogArticles)[number]['sections'][number]) {
  switch (section.kind) {
    case 'heading':
      return section.level === 2 ? (
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{section.text.en}</h2>
      ) : (
        <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{section.text.en}</h3>
      );
    case 'paragraph':
      return <p className="text-base leading-8 text-dark-300 md:text-lg">{section.text.en}</p>;
    case 'list':
      return (
        <ul className="grid gap-3 md:grid-cols-2">
          {section.items.map((item) => (
            <li key={item.en} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-dark-200">
              <span className="mt-2 h-2 w-2 flex-none rounded-full bg-premium-accent" />
              <span className="leading-7">{item.en}</span>
            </li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <div className="rounded-3xl border border-premium-accent/30 bg-premium-accent/8 p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-premium-accent">{section.title?.en}</p>
          <p className="mt-4 text-base leading-8 text-dark-200 md:text-lg">{section.text.en}</p>
        </div>
      );
    case 'links':
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-premium-accent/40 hover:bg-white/10"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-premium-accent">Internal Link</p>
                  <p className="mt-2 text-lg font-medium text-white transition-colors group-hover:text-premium-accent">
                    {item.label.en}
                  </p>
                </div>
                <span className="text-2xl text-premium-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      );
    case 'quote':
      return (
        <blockquote className="rounded-3xl border-l-4 border-premium-accent bg-white/5 px-6 py-6 text-dark-200 md:px-8">
          <p className="text-lg leading-8 text-white">“{section.text.en}”</p>
          {section.cite ? <cite className="mt-3 block text-sm uppercase tracking-[0.28em] text-dark-400 not-italic">{section.cite}</cite> : null}
        </blockquote>
      );
  }
}

export async function generateStaticParams(): Promise<BlogPageParams[]> {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<BlogPageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);
  const seo = await loadSeoContext('en');

  if (!article) {
    return buildStandalonePageMetadata({
      pathname: `/blog/${slug}`,
      title: 'Blog | GoMapView',
      description: 'GoMapView blog article.',
      siteName: typeof seo.site?.siteName === 'string' ? seo.site.siteName : 'GoMapView',
      noindex: true,
    });
  }

  return buildStandalonePageMetadata({
    pathname: `/blog/${article.slug}`,
    title: `${article.title.en} | GoMapView`,
    description: article.seoDescription.en,
    siteName: typeof seo.site?.siteName === 'string' ? seo.site.siteName : 'GoMapView',
    ogImage: article.coverImage,
    type: 'article',
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<BlogPageParams> }) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
    { name: article.title.en, item: `/blog/${article.slug}` },
  ]);
  const faqSchema = buildFaqSchema(article.faq.map(f => ({ question: f.question.en, answer: f.answer.en })));
  const blogPostingSchema = buildBlogPostingSchema({
    url: `/blog/${article.slug}`,
    title: article.title.en,
    description: article.seoDescription.en,
    image: article.coverImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    keywords: article.keywords,
    articleSection: article.category.en,
  });
  const articleSchema = buildArticleSchema({
    url: `/blog/${article.slug}`,
    title: article.title.en,
    description: article.seoDescription.en,
    image: article.coverImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    keywords: article.keywords,
    articleSection: article.category.en,
  });
  const relatedArticles = blogArticles.filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <>
      <SeoJsonLd schemas={[breadcrumbSchema, blogPostingSchema, articleSchema, faqSchema].filter(Boolean)} />

      <main className="bg-dark-950 text-white">
        <section className="relative overflow-hidden border-b border-white/10 pt-24 md:pt-28">
          <div className="absolute inset-0">
            <img
              src={article.coverImage}
              alt={article.coverAlt.en}
              loading="eager"
              className="h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-dark-950/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(13,148,136,0.2),_transparent_32%)]" />
          </div>
          <Container className="relative z-10 py-16 md:py-24">
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.32em] text-premium-accent">
                <span className="rounded-full border border-white/15 bg-dark-950/70 px-3 py-1 backdrop-blur-md">{article.category.en}</span>
                <span className="rounded-full border border-white/15 bg-dark-950/70 px-3 py-1 backdrop-blur-md">{article.readTime.en}</span>
                <span className="rounded-full border border-white/15 bg-dark-950/70 px-3 py-1 backdrop-blur-md">{formatDate(article.publishedAt)}</span>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">{article.title.en}</h1>
              <p className="max-w-2xl text-lg leading-8 text-dark-200 md:text-xl">{article.excerpt.en}</p>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
              <article className="space-y-8">
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30">
                  <img
                    src={article.coverImage}
                    alt={article.coverAlt.en}
                    loading="eager"
                    className="h-auto w-full object-cover"
                  />
                </div>

                <div className="space-y-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur-xl">
                  {article.sections.map((section, index) => (
                    <section key={`${article.slug}-${index}`} className="space-y-4">
                      {renderSection(section)}
                    </section>
                  ))}
                </div>
              </article>

              <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.32em] text-premium-accent">Article</p>
                  <h2 className="mt-4 text-2xl font-semibold text-white">{article.title.en}</h2>
                  <dl className="mt-6 space-y-4 text-sm text-dark-300">
                    <div className="flex items-center justify-between gap-4">
                      <dt>Category</dt>
                      <dd className="text-white">{article.category.en}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt>Published</dt>
                      <dd className="text-white">{formatDate(article.publishedAt)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt>Updated</dt>
                      <dd className="text-white">{formatDate(article.updatedAt)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt>Reading Time</dt>
                      <dd className="text-white">{article.readTime.en}</dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-[2rem] border border-premium-accent/30 bg-premium-accent/8 p-6 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.32em] text-premium-accent">Need expert support?</p>
                  <p className="mt-4 leading-7 text-dark-200">
                    If you want a tailored virtual tour strategy for your business, GoMapView can help you turn attention into action.
                  </p>
                  <div className="mt-6 space-y-3">
                    <Link href="/services" className="block">
                      <Button variant="outline" className="w-full">
                        View Services
                      </Button>
                    </Link>
                    <Link href="/contact" className="block">
                      <Button className="w-full">Contact Us</Button>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </section>

        <section className="pb-20 md:pb-28">
          <Container>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur-xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl space-y-3">
                  <p className="text-sm uppercase tracking-[0.32em] text-premium-accent">FAQ</p>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Frequently Asked Questions</h2>
                </div>
              </div>
              <div className="mt-8 grid gap-4">
                {article.faq.map((item) => (
                  <details key={item.question.en} className="group rounded-2xl border border-white/10 bg-dark-950/60 px-5 py-5 transition-colors open:border-premium-accent/40">
                    <summary className="cursor-pointer list-none text-lg font-medium text-white transition-colors group-open:text-premium-accent">
                      {item.question.en}
                    </summary>
                    <p className="mt-4 leading-7 text-dark-300">{item.answer.en}</p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {relatedArticles.length ? (
          <section className="pb-20 md:pb-28">
            <Container>
              <div className="mb-8 flex items-end justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-premium-accent">Read Next</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight">More insights from GoMapView</h2>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedArticles.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-premium-accent/40"
                  >
                    <article>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={item.coverImage}
                          alt={item.coverAlt.en}
                          loading="eager"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/10 to-transparent" />
                      </div>
                      <div className="p-6">
                        <p className="text-xs uppercase tracking-[0.32em] text-premium-accent">{item.category.en}</p>
                        <h3 className="mt-3 text-2xl font-semibold text-white transition-colors group-hover:text-premium-accent">
                          {item.title.en}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-dark-300">{item.excerpt.en}</p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        <section className="pb-20 md:pb-28">
          <Container>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(13,148,136,0.18)_0%,rgba(15,23,42,0.92)_55%,rgba(37,99,235,0.18)_100%)] px-8 py-14 md:px-16 md:py-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_24%)]" />
              <div className="relative mx-auto max-w-3xl text-center">
                <p className="text-sm uppercase tracking-[0.4em] text-premium-accent">Contact GoMapView</p>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
                  Ready to Transform Your Business Experience?
                </h2>
                <p className="mt-5 text-lg leading-8 text-dark-300">
                  Let GoMapView help you create immersive virtual experiences that attract more customers and elevate your online presence.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link href="/contact">
                    <Button size="lg">Contact Us</Button>
                  </Link>
                  <Link href="/services">
                    <Button size="lg" variant="outline">
                      Explore Services
                    </Button>
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
