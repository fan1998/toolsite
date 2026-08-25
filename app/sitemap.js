import { SITE, tools } from "../lib/tools";
import { posts } from "../lib/posts";

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now },
    { url: `${SITE.url}/blog`, lastModified: now },
    ...tools.map((t) => ({
      url: `${SITE.url}/tools/${t.slug}`,
      lastModified: now,
    })),
    ...posts.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
    })),
  ];
}
