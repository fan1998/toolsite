import { SITE, tools } from "../lib/tools";

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now },
    ...tools.map((t) => ({
      url: `${SITE.url}/tools/${t.slug}`,
      lastModified: now,
    })),
  ];
}
