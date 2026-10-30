
import type { MetadataRoute } from "next";

import { site, services, products } from "@/lib/content";
import { sanityClient } from "@/lib/client";

const BASE_URL = site.url.replace(/\/+$/, "");

const SITEMAP_REVALIDATE = 3600;

type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: string;
  images?: string[];
};

type SanityArticle = {
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
  imageUrl?: string;
};

// Fetch all published articles from Sanity.
// Draft documents are explicitly excluded.
const ARTICLE_SITEMAP_QUERY = `*[
  _type == "article" &&
  !(_id in path("drafts.**")) &&
  defined(slug.current)
] | order(publishedAt desc) {
  "slug": slug.current,
  publishedAt,
  "updatedAt": _updatedAt,
  "imageUrl": mainImage.asset->url
}`;

const staticRoutes: SitemapEntry[] = [
  {
    path: "/",
    priority: 1.0,
    changeFrequency: "weekly",
  },
  {
    path: "/about",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/services",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/contact",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/insights",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/faqs",
    priority: 0.7,
    changeFrequency: "monthly",
  },
];

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";

  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

function isValidDate(value?: string): boolean {
  return Boolean(value && !Number.isNaN(Date.parse(value)));
}

async function getArticleRoutes(): Promise<SitemapEntry[]> {
  try {
    const articles = await sanityClient.fetch<SanityArticle[]>(
      ARTICLE_SITEMAP_QUERY,
      {},
      {
        next: {
          revalidate: SITEMAP_REVALIDATE,
        },
      }
    );

    return articles
      .filter((article) => {
        return (
          typeof article.slug === "string" &&
          article.slug.trim().length > 0
        );
      })
      .map((article) => {
        const lastModified = isValidDate(article.updatedAt)
          ? article.updatedAt
          : isValidDate(article.publishedAt)
            ? article.publishedAt
            : undefined;

        return {
        
          path: normalizePath(article.slug),
          priority: 0.7,
          changeFrequency: "monthly" as const,
          ...(lastModified ? { lastModified } : {}),
          ...(article.imageUrl
            ? { images: [article.imageUrl] }
            : {}),
        };
      });
  } catch (error) {
    console.error(
      "Sitemap: Unable to fetch published Sanity articles.",
      error
    );

    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Service detail pages.
  const serviceRoutes: SitemapEntry[] = services.map((service) => ({
    path: normalizePath(`/services/${service.slug}`),
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  // Product detail pages.
  const productRoutes: SitemapEntry[] = products.map((product) => ({
    path: normalizePath(`/products/${product.slug}`),
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  // Dynamically retrieve published Sanity articles.
  const articleRoutes = await getArticleRoutes();

  // Combine all website routes.
  const allRoutes: SitemapEntry[] = [
    ...staticRoutes,
    ...serviceRoutes,
    ...productRoutes,
    ...articleRoutes,
  ];

  // Deduplicate URLs.
  // Earlier entries take priority if two routes share a path.
  const uniqueRoutes = new Map<string, SitemapEntry>();

  for (const route of allRoutes) {
    const path = normalizePath(route.path);

    if (!uniqueRoutes.has(path)) {
      uniqueRoutes.set(path, {
        ...route,
        path,
      });
    }
  }

  // Convert routes into Next.js sitemap format.
  return Array.from(uniqueRoutes.values()).map((route) => ({
    url: `${BASE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,

    ...(isValidDate(route.lastModified)
      ? { lastModified: new Date(route.lastModified!) }
      : {}),

    ...(route.images?.length
      ? { images: route.images }
      : {}),
  }));
}
