
import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

const BASE_URL = site.url.replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
