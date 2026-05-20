import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack";
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-05-20"),
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}

