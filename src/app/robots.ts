import type { MetadataRoute } from "next";
import { verifiedSite } from "@/lib/verified-site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/cms/", "/*/cms-preview/"],
    },
    sitemap: `${verifiedSite.url}/sitemap.xml`,
  };
}
