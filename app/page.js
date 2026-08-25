import { SITE, tools } from "../lib/tools";
import ToolGrid from "../components/ToolGrid";

const hotTools = tools.filter((t) => t.badge === "HOT").slice(0, 6);

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-badges">
          <span>{tools.length} 款工具</span>
          <span>浏览器端运行</span>
          <span>免费无需注册</span>
        </div>
        <h1>
          实用工具，让工作
          <span className="gradient-text">更高效</span>
        </h1>
        <p>{SITE.slogan}</p>
        <div className="hot-chips">
          {hotTools.map((t) => (
            <a key={t.slug} href={`/tools/${t.slug}`}>
              {t.title.replace("工具", "").replace("在线", "")}
            </a>
          ))}
        </div>
      </section>
      <ToolGrid
        items={tools.map((t) => ({
          slug: t.slug,
          title: t.title,
          description: t.description,
          category: t.category,
          badge: t.badge,
          keywords: t.keywords,
        }))}
      />
    </>
  );
}
