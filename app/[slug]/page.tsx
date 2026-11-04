
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Link2,
  Sparkles,
} from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

import { Shell, Eyebrow } from "@/components/Site";
import { sanityClient } from "@/lib/client";

export const revalidate = 60;

const SITE_URL = "https://www.rhytechglobalsolutions.ca";
const SITE_NAME = "Rhytech Global Solutions";

type SanityImage = {
  _type?: string;
  alt?: string;
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
};


type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  author?: string;
  publishedAt?: string;
  _updatedAt?: string;
  readTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  coverImage?: SanityImage;
  body?: Array<Record<string, unknown>>;
};

type RelatedArticle = Pick<
  Article,
  "_id" | "title" | "slug" | "excerpt" | "category" | "publishedAt" | "coverImage"
>;

const builder = imageUrlBuilder(sanityClient);

function imageUrl(image?: SanityImage, width = 1400) {
  if (!image?.asset) return undefined;

  try {
    return builder.image(image as never).width(width).auto("format").url();
  } catch {
    return image.asset.url;
  }
}

function formatDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function getReadTime(article: Article) {
  return article.readTime && article.readTime > 0
    ? `${article.readTime} min read`
    : "5 min read";
}


const articleQuery = `
  *[
    _type == "article" &&
    slug.current == $slug &&
    defined(title) &&
    (!defined(publishedAt) || publishedAt <= now())
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    author,
    publishedAt,
    "_updatedAt": _updatedAt,
    readTime,
    seoTitle,
    seoDescription,
    coverImage {
      _type,
      alt,
      asset->{
        _id,
        _ref,
        url
      }
    },
    body
  }
`;


const relatedQuery = `
  *[
    _type == "article" &&
    _id != $id &&
    defined(slug.current) &&
    defined(body) &&
    (!defined(publishedAt) || publishedAt <= now()) &&
    (!defined($category) || category == $category)
  ] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    coverImage {
      _type,
      alt,
      asset->{
        _id,
        _ref,
        url
      }
    }
  }
`;

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="my-3 text-[16px] leading-7 text-[#625B70] sm:text-[17px]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-14 scroll-mt-28 text-2xl font-semibold leading-tight text-[#211832] sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-xl font-semibold leading-snug text-[#211832] sm:text-2xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-9 border-l-[3px] border-violet-500 bg-violet-50/70 px-6 py-5 text-lg leading-7 text-[#352448] sm:px-8 sm:py-7 sm:text-xl">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#30243F]">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href =
        typeof value?.href === "string" ? value.href : undefined;

      if (!href) return <>{children}</>;

      const isExternal = /^https?:\/\//i.test(href);

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="font-medium text-violet-700 underline decoration-violet-300 underline-offset-4 transition-colors hover:text-violet-950"
        >
          {children}
        </a>
      );
    },
  },

  list: {
    bullet: ({ children }) => (
      <ul className="my-6 list-disc space-y-3 pl-6 text-[16px] leading-7 text-[#625B70] marker:text-violet-500 sm:text-[17px]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 list-decimal space-y-3 pl-6 text-[16px] leading-7 text-[#625B70] marker:font-semibold marker:text-violet-700 sm:text-[17px]">
        {children}
      </ol>
    ),
  },

  types: {
    image: ({ value }) => {
      const image = value as SanityImage;
      const src = imageUrl(image, 1200);

      if (!src) return null;

      return (
        <figure className="my-9">
          <img
            src={src}
            alt={image.alt || "Illustration for this article"}
            loading="lazy"
            decoding="async"
            className="w-full rounded-2xl border border-[#EAE6F1] object-cover"
          />
          {image.alt && (
            <figcaption className="mt-3 text-center text-xs leading-6 text-[#898196]">
              {image.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getArticle(slug: string): Promise<Article | null> {
  return sanityClient.fetch<Article | null>(
    articleQuery,
    { slug },
    { next: { revalidate: 60 } },
  );
}



export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await getArticle(slug);

    if (!article) {
      return {
        title: "Article Not Found",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    // The global layout automatically appends:
    // | Rhytech Global Solutions
    // Therefore, do not include the brand suffix here.
    const title =
      article.seoTitle?.replace(
        /\s*[|–-]\s*(Rhytech Global Solutions|Rhytech Insights)\s*$/i,
        ""
      ).trim() || article.title;

    const description =
      article.seoDescription ||
      article.excerpt ||
      `Read ${article.title} for practical perspectives on technology and digital growth.`;

    const canonical = `${SITE_URL}/${article.slug}`;
    const cover = imageUrl(article.coverImage, 1200);

    return {
      // Article titles render without the layout's brand suffix so they stay within 60 characters.
      title: { absolute: title },
      description,

      alternates: {
        canonical,
      },

      openGraph: {
        type: "article",
        siteName: SITE_NAME,
        url: canonical,
        title,
        description,

        ...(article.publishedAt
          ? { publishedTime: article.publishedAt }
          : {}),

        ...(article._updatedAt
          ? { modifiedTime: article._updatedAt }
          : {}),

        authors: [SITE_NAME],

        ...(cover
          ? {
              images: [
                {
                  url: cover,
                  width: 1200,
                  alt:
                    article.coverImage?.alt ||
                    article.title,
                },
              ],
            }
          : {}),
      },

      twitter: {
        card: cover ? "summary_large_image" : "summary",
        title,
        description,

        ...(cover
          ? {
              images: [
                {
                  url: cover,
                  alt:
                    article.coverImage?.alt ||
                    article.title,
                },
              ],
            }
          : {}),
      },

      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
        },
      },
    };
  } catch (error) {
    console.error(
      "Unable to generate article metadata:",
      error
    );

    return {
      title: "Rhytech Insights",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}



export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  let article: Article | null = null;

  try {
    article = await getArticle(slug);
  } catch (error) {
    console.error("Unable to load article from Sanity:", error);
    throw error;
  }

  if (!article) notFound();

  let relatedArticles: RelatedArticle[] = [];

  try {
    relatedArticles = await sanityClient.fetch<RelatedArticle[]>(
      relatedQuery,
      {
        id: article._id,
        category: article.category || null,
      },
      { next: { revalidate: 60 } },
    );
  } catch (error) {
    console.error("Unable to load related articles:", error);
  }

  const cover = imageUrl(article.coverImage, 1800);
  const canonical = `${SITE_URL}/${article.slug}`;
  const description =
    article.seoDescription ||
    article.excerpt ||
    `Explore ${article.title} from Rhytech Global Solutions.`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",

  headline: article.title,
  description,

  url: canonical,

  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": canonical,
  },

  ...(article.publishedAt
    ? { datePublished: article.publishedAt }
    : {}),

  ...(article._updatedAt || article.publishedAt
    ? {
        dateModified:
          article._updatedAt || article.publishedAt,
      }
    : {}),

  author: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },

  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },

  ...(cover
    ? {
        image: [cover],
      }
    : {}),

  articleSection: article.category || "Insights",

  timeRequired: `PT${
    article.readTime && article.readTime > 0
      ? article.readTime
      : 5
  }M`,
};

const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <Shell>
      <main className="overflow-hidden bg-white text-[#211832]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd }}
        />

        {/* Article masthead */}
        <section className="relative isolate overflow-hidden bg-[#171126] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_5%,rgba(139,92,246,0.24),transparent_38%),radial-gradient(ellipse_at_5%_95%,rgba(109,40,217,0.16),transparent_38%)]"
          />
          <div className="container py-8 sm:py-12 lg:py-16">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs font-medium text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft size={15} />
              Back to Insights
            </Link>

            <div className="mt-12 sm:mt-16">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-violet-300/25 bg-violet-300/10 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-violet-200">
                  {article.category || "Insights"}
                </span>
                <span className="text-white/25">/</span>
                <span className="text-[11px] text-white/55">
                  Rhytech Journal
                </span>
              </div>

              <h1 className="mt-7 text-[clamp(2.5rem,6vw,5.25rem)] font-semibold leading">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="mt-6 max-w-3xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                  {article.excerpt}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-white/55">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={14} className="text-violet-300" />
                  {formatDate(article.publishedAt) || "Rhytech Insights"}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={14} className="text-violet-300" />
                  {getReadTime(article)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Sparkles size={14} className="text-violet-300" />
                  {article.author || "Rhytech Editorial Team"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Cover image */}
        {cover && (
          <section className="container pt-8 sm:pt-12">
            <figure className="group relative overflow-hidden rounded-[1.25rem] bg-[#171126] sm:rounded-[1.75rem]">
              <img
                src={cover}
                alt={article.coverImage?.alt || article.title}
                fetchPriority="high"
                decoding="async"
                className="max-h-[480px] min-h-[240px] w-full object-cover sm:min-h-[360px] lg:min-h-[360px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </figure>
          </section>
        )}

        {/* Article body */}
        <section className="container py-12 sm:py-16 lg:py-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20">
            <article className="min-w-0">
              {article.body && article.body.length > 0 ? (
                <div className="article-content">
                  <PortableText
                    value={article.body as never}
                    components={portableTextComponents}
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-[#EAE6F1] bg-[#FAF9FC] p-6 text-sm leading-7 text-[#777084]">
                  The full article content has not been added yet. Please check
                  back soon.
                </div>
              )}

              <div className="mt-12 border-t border-[#EAE6F1] pt-7">
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition-colors hover:text-violet-950"
                >
                  <ArrowLeft size={16} />
                  Explore more insights
                </Link>
              </div>
            </article>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[1.35rem] border border-[#EAE6F1] bg-[#FAF9FC] p-6">
                <Eyebrow>About this article</Eyebrow>
                <h2 className="mt-4 text-xl font-semibold leading-snug tracking-[-0.04em]">
                  Ideas worth putting into practice.
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#777084]">
                  Explore thoughtful perspectives from Rhytech Global
                  Solutions on technology, search, and digital growth.
                </p>
                <div className="mt-5 flex items-center gap-2 border-t border-[#EAE6F1] pt-4 text-xs text-[#777084]">
                  <Clock3 size={14} className="text-violet-700" />
                  {getReadTime(article)}
                </div>
              </div>

              <div className="rounded-[1.35rem] bg-[#211832] p-6 text-white">
                <Sparkles size={21} className="text-violet-300" />
                <h2 className="mt-4 text-xl font-semibold leading-snug tracking-[-0.04em]">
                  Building something ambitious?
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  Let&apos;s discuss your goals and find the right digital
                  direction for your business.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-violet-200"
                >
                  Talk to our team
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-[#F8F7FB] py-14 sm:py-20">
            <div className="container">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <Eyebrow>Continue exploring</Eyebrow>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">
                    More to discover.
                  </h2>
                </div>
                <Link
                  href="/insights"
                  className="hidden items-center gap-2 text-xs font-semibold text-violet-700 transition-colors hover:text-violet-950 sm:inline-flex"
                >
                  All insights
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((related) => {
                  const relatedCover = imageUrl(related.coverImage, 700);

                  return (
                    <article
                      key={related._id}
                      className="group overflow-hidden rounded-[1.25rem] border border-[#EAE6F1] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(43,25,78,0.08)]"
                    >
                      <Link
                        href={`/${related.slug}`}
                        className="block"
                      >
                        <div className="relative aspect-[1.7/1] overflow-hidden bg-[#211735]">
                          {relatedCover ? (
                            <img
                              src={relatedCover}
                              alt={
                                related.coverImage?.alt || related.title
                              }
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                          ) : (
                            <div className="grid h-full place-items-center bg-[radial-gradient(ellipse_at_75%_20%,rgba(167,139,250,0.36),transparent_38%),linear-gradient(135deg,#171126,#4C3471)]">
                              <Sparkles
                                size={28}
                                className="text-violet-200"
                              />
                            </div>
                          )}
                        </div>

                        <div className="p-5 sm:p-6">
                          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-violet-700">
                            {related.category || "Insights"}
                          </p>
                          <h3 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.04em] transition-colors group-hover:text-violet-800">
                            {related.title}
                          </h3>
                          {related.excerpt && (
                            <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#777084]">
                              {related.excerpt}
                            </p>
                          )}
                          <p className="mt-5 text-[11px] text-[#898196]">
                            {formatDate(related.publishedAt)}
                          </p>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>

              <Link
                href="/insights"
                className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-violet-700 sm:hidden"
              >
                Explore all insights
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>
        )}
      </main>
    </Shell>
  );
}
