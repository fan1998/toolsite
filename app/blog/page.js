import Link from "next/link";
import { posts } from "../../lib/posts";

export const metadata = {
  title: "技术教程与工具使用指南",
  description:
    "开发者技术教程博客：JSON、时间戳、正则表达式、密码安全、房贷计算、二维码原理等实用知识，配合免费在线工具即学即用。",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return (
    <div className="tool-page">
      <h1>技术教程</h1>
      <p className="intro">实用技术知识 + 免费在线工具，学完即用</p>
      <div className="blog-list">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
            <h2>{p.title}</h2>
            <p>{p.description}</p>
            <span className="blog-date">{p.date}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
