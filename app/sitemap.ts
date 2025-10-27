import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dyariali.com",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,  
    },
  ];
}
