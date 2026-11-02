import type { MetadataRoute } from "next";
import { absolute, IDENTITY_PATH, IDENTITY_UPDATED } from "@/lib/identity";

// Required for prerendering under `output: "export"`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absolute("/"), priority: 1 },
    { url: absolute(IDENTITY_PATH), lastModified: IDENTITY_UPDATED, priority: 0.8 },
    { url: absolute("/whats-new/"), priority: 0.6 },
    { url: absolute("/privacy/"), priority: 0.4 },
    { url: absolute("/contact/"), priority: 0.4 },
  ];
}
