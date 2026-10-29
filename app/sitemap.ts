import { MetadataRoute } from "next";
import { listedProducts } from "@/lib/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://velayembotu.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: siteUrl, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/koleksiyon`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/atolye`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/sss`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/iletisim`, priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const productPages = listedProducts().map((p) => ({
    url: `${siteUrl}/koleksiyon/${p.slug}`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...productPages].map((page) => ({
    ...page,
    lastModified: new Date(),
  }));
}
