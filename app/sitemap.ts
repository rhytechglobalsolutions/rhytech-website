
import type { MetadataRoute } from "next";
import { site, services, products } from "@/lib/content";

const BASE_URL = site.url.replace(/\/+$/, "");

type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: SitemapEntry[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
    { path: "/faqs", priority: 0.7, changeFrequency: "monthly" },
  ];

  const serviceRoutes: SitemapEntry[] = services.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const productRoutes: SitemapEntry[] = products.map((product) => ({
    path: `/products/${product.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  // Deduplicate paths and exclude malformed entries.
  const uniqueRoutes = new Map<string, SitemapEntry>();

  for (const route of [
    ...staticRoutes,
    ...serviceRoutes,
    ...productRoutes,
  ]) {
    const path = route.path === ""
      ? "/"
      : `/${route.path.replace(/^\/+|\/+$/g, "")}`;

    if (!uniqueRoutes.has(path)) {
      uniqueRoutes.set(path, { ...route, path });
    }
  }

  return Array.from(uniqueRoutes.values()).map((route) => ({
    url: route.path === "/"
      ? `${BASE_URL}/`
      : `${BASE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
