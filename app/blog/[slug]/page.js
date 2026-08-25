import { notFound } from "next/navigation";
import { marked } from "marked";
import Link from "next/link";
import { posts } from "../../../lib/posts";
import { SITE } from "../../../lib/tools";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = posts.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.description,
      type: "article",
      publishedTime: p.date,
      url: `${SITE.url}/blog/${p.slug}`,
    },
  };
}

export default function BlogPost({ params }) {
  const p = posts.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const html = marked.parse(p.content);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    keywords: p.keywords.join(","),
    author: { "@type": "Organization", name: SITE.name },
  };

  return (
    <article className="tool-page">
      <h1>{p.title}</h1>
      <p className="blog-meta">{p.date}</p>
      <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="blog-back">
        <Link href="/blog">← 返回全部教程</Link>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </article>
  );
}
