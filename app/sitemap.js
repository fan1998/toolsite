import { SITE, tools } from "../lib/tools";
import { posts } from "../lib/posts";
import { englishTools } from "../lib/english-tools";

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now },
    { url: `${SITE.url}/blog`, lastModified: now },
    { url: `${SITE.url}/play`, lastModified: now },
    { url: `${SITE.url}/en`, lastModified: now },
    { url: `${SITE.url}/about`, lastModified: now },
    { url: `${SITE.url}/contact`, lastModified: now },
    { url: `${SITE.url}/privacy`, lastModified: now },
    { url: `${SITE.url}/terms`, lastModified: now },
    ...tools.map((t) => ({
      url: `${SITE.url}/tools/${t.slug}`,
      lastModified: now,
    })),
    ...posts.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
    })),
    ...englishTools.map((t) => ({
      url: `${SITE.url}/en/tools/${t.slug}`,
      lastModified: now,
    })),
  ];
}
