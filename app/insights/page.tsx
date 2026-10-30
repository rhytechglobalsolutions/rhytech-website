import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Compass,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
  Cpu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";

import { Shell, Eyebrow } from "@/components/Site";
import { sanityClient } from "@/lib/client";

export const revalidate = 60;

const SITE_URL = "https://www.rhytechglobalsolutions.ca";

export const metadata: Metadata = {
  title: "Technology, SEO & Digital Growth Insights | Rhytech",
  description:
    "Explore expert insights on SEO, AI-powered search, web development, cybersecurity, and digital transformation from Rhytech Global Solutions.",

  alternates: {
    canonical: `${SITE_URL}/insights`,
  },

  openGraph: {
    title: "Insights | Rhytech Global Solutions",
    description:
      "Practical perspectives on SEO, AI-powered search, digital experiences, and business growth.",
    url: `${SITE_URL}/insights`,
    siteName: "Rhytech Global Solutions",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Insights | Rhytech Global Solutions",
    description:
      "Practical perspectives on SEO, AI-powered search, digital experiences, and business growth.",
  },
};

const imageBuilder = imageUrlBuilder(sanityClient);

type SanityImage = {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
  alt?: string;
};

type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  author?: string;
  publishedAt?: string;
  readTime?: number;
  featured?: boolean;
  coverImage?: SanityImage;
  seoTitle?: string;
  seoDescription?: string;
};

const articlesQuery = `
  *[
  _type == "article" &&
  defined(slug.current) &&
  defined(title) &&
  defined(body) &&
  defined(publishedAt) &&
  publishedAt <= now()
] | order(featured desc, publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  author,
  publishedAt,
  readTime,
  featured,
  coverImage {
    asset->{
      _id,
      url
    },
    alt
  },
  seoTitle,
  seoDescription
}
`;

const categoryIcons: Record<string, LucideIcon> = {
  Technology: Cpu,
  Cybersecurity: ShieldCheck,
  "Digital Transformation": Layers3,
  "Software Development": Compass,
  "Digital Marketing": Search,
  "AI and Innovation": Sparkles,
};

const principles = [
  {
    number: "01",
    title: "Practical by design",
    description:
      "Ideas focused on decisions, implementation, and outcomes—not jargon for its own sake.",
  },
  {
    number: "02",
    title: "Built around clarity",
    description:
      "Complex digital topics explained in a way that helps teams identify their next step.",
  },
  {
    number: "03",
    title: "Focused on what lasts",
    description:
      "Evergreen principles for stronger digital foundations, sustainable visibility, and growth.",
  },
];

function getCategoryIcon(category?: string): LucideIcon {
  return categoryIcons[category ?? ""] ?? BookOpen;
}

function getImageUrl(image: SanityImage | undefined, width = 1200) {
  if (!image?.asset) return null;

  return imageBuilder.image(image).width(width).auto("format").fit("max").url();
}

function formatDate(date?: string) {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return null;

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
}

function getReadTime(article: Article) {
  const minutes = article.readTime;

  return `${minutes && minutes > 0 ? minutes : 5} min read`;
}

function ArticleImage({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  const imageUrl = getImageUrl(article.coverImage, featured ? 1200 : 800);

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={article.coverImage?.alt || article.title}
        loading={featured ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    );
  }

  const Icon = getCategoryIcon(article.category);

  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-gradient-to-br from-[#19132F] via-[#302052] to-[#6244A0]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(196,181,253,0.22),transparent_45%)]"
      />
      <div className="relative grid h-24 w-24 place-items-center rounded-3xl border border-white/20 bg-white/[0.08] text-violet-100 shadow-[0_0_60px_rgba(167,139,250,0.15)]">
        <Icon size={38} strokeWidth={1.3} />
      </div>
    </div>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const Icon = getCategoryIcon(article.category);
  const date = formatDate(article.publishedAt);

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-violet-950/[0.08] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-[0_24px_55px_rgba(39,25,77,0.09)]">
      <Link
        href={`/${article.slug}`}
        aria-label={`Read ${article.title}`}
        className="relative block h-56 overflow-hidden bg-[#211735] sm:h-64"
      >
        <ArticleImage article={article} />

        <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#19132F]/70 px-3 py-1.5 text-[10px] font-medium tracking-wide text-white backdrop-blur-md">
          {article.category || "Insights"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-[#827B91]">
          {date && <span>{date}</span>}
          <span className="h-1 w-1 rounded-full bg-violet-300" />
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={13} />
            {getReadTime(article)}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold leading-snug tracking-[-0.04em] text-[#19152B] sm:text-2xl">
          <Link
            href={`/${article.slug}`}
            className="transition-colors hover:text-violet-700"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#716B80]">
          {article.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-violet-950/10 pt-5 mt-6 text-xs">
          <span className="inline-flex items-center gap-2 font-medium text-[#716B80]">
            <Icon size={15} className="text-violet-600" />
            {article.author || "Rhytech Editorial Team"}
          </span>

          <span className="inline-flex items-center gap-1.5 font-semibold text-violet-700 transition-all group-hover:gap-2.5">
            Read article
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </article>
  );
}

export default async function InsightsPage() {
  let articles: Article[] = [];

  try {
    articles = await sanityClient.fetch<Article[]>(
      articlesQuery,
      {},
      { next: { revalidate: 60 } },
    );
  } catch (error) {
    console.error("Failed to fetch Sanity insights:", error);
  }

  const featured = articles.find((article) => article.featured) ?? articles[0];

  const remainingArticles = featured
    ? articles.filter((article) => article._id !== featured._id)
    : [];

  const FeaturedIcon = getCategoryIcon(featured?.category);

  return (
    <Shell>
      <main className="overflow-hidden bg-white text-[#19152B]">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-violet-950/[0.07] bg-[#FAF9FD]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_25%,rgba(139,92,246,0.15),transparent_38%),radial-gradient(ellipse_at_5%_100%,rgba(196,181,253,0.18),transparent_36%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(98,76,151,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(98,76,151,0.055)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
          />

          <div className="container flex flex-col pt-7 lg:min-h-[590px]">
            <div className="my-auto max-w-4xl py-20 sm:py-24">
              <Eyebrow>Ideas for what’s next</Eyebrow>

              <h1 className="mt-6 text-[clamp(2.7rem,6.5vw,5.2rem)] font-semibold leading-[1.04] tracking-[-0.075em] text-[#19152B]">
                Better thinking.
                <br />
                <span className="bg-gradient-to-r from-violet-600 via-violet-500 to-[#A78BFA] bg-clip-text text-transparent">
                  Better digital decisions.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[#716B80] sm:text-lg">
                Explore practical insights on SEO, AI-powered search,
                cybersecurity, web development, and digital transformation.
                Ideas to help your business make smarter digital decisions and
                build for long-term growth.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-[#777084]">
                <span className="inline-flex items-center gap-2">
                  <Sparkles size={15} className="text-violet-600" />
                  Technology &amp; digital growth
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-violet-300 sm:block" />
                <span>Ontario, Canada · Worldwide</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-violet-950/10 py-5 text-[10px] tracking-[0.15em] text-[#827B91]">
              <span>THE RHYTECH JOURNAL</span>
              <span className="inline-flex items-center gap-3 tracking-normal">
                Thoughtful perspectives for the digital age
                <ArrowDownRight size={16} />
              </span>
            </div>
          </div>
        </section>

        {/* Featured article */}
        {featured && (
          <section className="py-16 sm:py-20 lg:py-24">
            <div className="container">
              <div className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
                <div>
                  <Eyebrow>Start with an idea</Eyebrow>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
                    Featured perspective
                  </h2>
                </div>

                <span className="pb-1 text-[10px] tracking-[0.14em] text-[#898296]">
                  EDITOR&apos;S PICK
                </span>
              </div>

              <article className="grid overflow-hidden rounded-2xl border border-violet-950/[0.09] bg-white shadow-[0_24px_70px_rgba(39,25,77,0.055)] md:grid-cols-2 md:rounded-3xl">
                <Link
                  href={`/${featured.slug}`}
                  aria-label={`Read ${featured.title}`}
                  className="group relative block min-h-[300px] overflow-hidden bg-[#211735] sm:min-h-[370px] lg:min-h-[440px]"
                >
                  <ArticleImage article={featured} featured />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#19132F]/90 via-[#19132F]/30 to-transparent p-6 sm:p-8">
                    <span className="text-[10px] tracking-[0.15em] text-white/80">
                      RHYTECH / INSIGHTS
                    </span>
                  </div>
                </Link>

                <div className="flex flex-col items-start p-6 sm:p-9 lg:p-12">
                  <div className="flex w-full flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-violet-700">
                      {featured.category || "Insights"}
                    </span>
                    <span className="inline-flex items-center gap-2 text-[10px] text-[#827B91]">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                      Featured article
                    </span>
                  </div>

                  <h3 className="mt-7 text-3xl font-semibold leading-[1.18] tracking-[-0.055em] sm:text-4xl">
                    <Link
                      href={`/${featured.slug}`}
                      className="transition-colors hover:text-violet-700"
                    >
                      {featured.title}
                    </Link>
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-[#716B80]">
                    {featured.excerpt}
                  </p>

                  <div className="mt-auto flex w-full flex-wrap items-center justify-between gap-3 pt-8 text-[11px] text-[#827B91]">
                    <span className="inline-flex items-center gap-2">
                      <Clock3 size={15} />
                      {getReadTime(featured)}
                    </span>

                    <span>{formatDate(featured.publishedAt)}</span>
                  </div>

                  <Link
                    href={`/${featured.slug}`}
                    className="mt-5 flex w-full items-center justify-between border-t border-violet-950/10 pt-5 text-xs font-semibold text-[#493477] transition-colors hover:text-violet-700"
                  >
                    Read the full article
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* Article collection */}
        <section className="bg-[#F8F7FB] py-16 sm:py-20 lg:py-24">
          <div className="container">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5 sm:mb-11">
              <div>
                <Eyebrow>Explore our thinking</Eyebrow>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
                  Perspectives worth exploring.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#716B80]">
                  Practical ideas and guides for building a stronger digital
                  foundation.
                </p>
              </div>

              <span className="text-[10px] tracking-[0.14em] text-[#898296]">
                {articles.length}{" "}
                {articles.length === 1 ? "ARTICLE" : "ARTICLES"}
              </span>
            </div>

            {remainingArticles.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {remainingArticles.map((article, index) => (
                  <ArticleCard
                    key={article._id}
                    article={article}
                    index={index}
                  />
                ))}
              </div>
            ) : articles.length > 0 ? (
              <div className="rounded-2xl border border-violet-950/[0.08] bg-white px-6 py-10 text-center sm:px-10">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet-50 text-violet-700">
                  <BookOpen size={25} strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  More perspectives are on the way
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#716B80]">
                  Explore our featured article while we prepare more practical
                  insights for your business.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-violet-950/[0.08] bg-white px-6 py-12 text-center sm:px-10">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet-50 text-violet-700">
                  <BookOpen size={25} strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  Fresh perspectives are coming soon
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#716B80]">
                  We&apos;re preparing practical guides on SEO, AI, web
                  development, and digital growth. Please check back soon.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Editorial philosophy */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div>
              <Eyebrow>Our editorial approach</Eyebrow>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.06em] sm:text-4xl">
                Substance over noise.
                <br />
                <span className="text-violet-600">
                  Clarity over complexity.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-8 text-[#716B80]">
                Digital trends move quickly. Good decisions come from
                understanding the fundamentals, asking better questions, and
                choosing what actually serves your business.
              </p>

              <Link
                href="/services"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition-colors hover:text-violet-900"
              >
                Explore our services
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="border-t border-violet-950/10">
              {principles.map((principle) => (
                <div
                  key={principle.number}
                  className="grid grid-cols-[28px_1fr_20px] items-start gap-4 border-b border-violet-950/10 py-6 sm:grid-cols-[34px_1fr_20px] sm:gap-5"
                >
                  <span className="pt-1 text-[11px] text-violet-600">
                    {principle.number}
                  </span>

                  <div>
                    <h3 className="text-base font-semibold tracking-tight">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-[#716B80] sm:text-sm">
                      {principle.description}
                    </p>
                  </div>

                  <CheckCircle2
                    size={19}
                    className="mt-0.5 text-violet-500"
                    strokeWidth={1.5}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
