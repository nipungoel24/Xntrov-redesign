import { CORE_SERVICES } from "@/data/xntrova-data";

export default function sitemap() {
  const now = new Date();
  return [
    {
      url: "https://www.xntrova.com/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...CORE_SERVICES.map((service) => ({
      url: service.href,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
