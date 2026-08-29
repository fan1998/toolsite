import { SITE, tools, ICONS } from "../lib/tools";
import ToolGrid from "../components/ToolGrid";
import SearchHub from "../components/SearchHub";

const hotTools = tools.filter((t) => t.badge === "HOT").slice(0, 6);

export const metadata = {
  title:
    "免费在线工具大全 - JSON格式化、时间戳、二维码、PDF、图片处理，浏览器本地运行",
  description:
    "凡间工具箱提供76款免费在线工具：JSON格式化与校验、Unix时间戳转换、二维码生成器、Base64编解码、正则表达式测试、图片压缩、PDF合并、身份证校验、个人所得税计算等。所有工具均在浏览器本地运行，数据不上传、无需注册。",
  keywords: [
    "在线工具",
    "免费工具",
    "JSON格式化",
    "时间戳转换",
    "二维码生成器",
    "图片压缩",
    "PDF合并",
    "身份证校验",
    "个税计算器",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} - 免费在线工具，浏览器本地运行，数据不上传`,
    description: "76款免费在线工具，纯本地处理，数据不出你的浏览器。JSON、时间戳、二维码、PDF、图片工具齐全。",
    url: SITE.url,
    type: "website",
    siteName: SITE.name,
  },
};

const features = [
  {
    title: "隐私优先",
    desc: "所有工具完全在你的浏览器中运行，输入的数据永远不会上传到任何服务器，无追踪、无记录。",
    icon: "🔒",
  },
  {
    title: "即时响应",
    desc: "无需等待服务器往返，粘贴即出结果，毫秒级完成格式化、编码转换和文件处理。",
    icon: "⚡",
  },
  {
    title: "完全免费",
    desc: "每一款工具都永久免费，没有使用次数限制、没有注册墙、没有隐藏付费墙。",
    icon: "🎁",
  },
  {
    title: "全端适配",
    desc: "响应式设计完美支持手机、平板和电脑，随时随地打开即用。",
    icon: "📱",
  },
];

const homeFaq = [
  {
    q: "这些工具是免费的吗？需要注册吗？",
    a: "全部免费且无需注册。打开即用，没有任何使用次数限制或隐藏付费项目。",
  },
  {
    q: "我的数据安全吗？会被上传吗？",
    a: "绝对安全。所有工具均采用纯前端技术，在你的浏览器内完成全部计算，输入的内容不会离开你的设备。",
  },
  {
    q: "支持手机使用吗？",
    a: "支持。本站采用响应式设计，手机、平板、电脑均可获得完整的使用体验。",
  },
  {
    q: "工具会一直更新吗？",
    a: "会。我们持续根据用户需求新增工具，每周都会上线新的实用功能。",
  },
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.slogan,
    inLanguage: "zh-CN",
  };

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
              <span className="chip-icon">{ICONS[t.slug]}</span>
              {t.title.replace("工具", "").replace("在线", "")}
            </a>
          ))}
        </div>
      </section>

      <ToolGrid
        items={tools.map((t) => ({
          slug: t.slug,
          icon: ICONS[t.slug],
          title: t.title,
          description: t.description,
          category: t.category,
          badge: t.badge,
          keywords: t.keywords,
        }))}
      />

      <SearchHub />

      <section className="features">
        <h2>为什么选择{SITE.name}</h2>
        <div className="feature-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="seo-text">
        <h2>关于{SITE.name}</h2>
        <p>
          {SITE.name}（{SITE.url.replace("https://", "")}）是面向开发者、设计师、学生和职场人士的
          免费在线工具集合，提供{tools.map((t) => t.title).join("、")}
          等{tools.length}款实用工具。所有工具均基于浏览器本地运行：
          JSON格式化与校验帮助开发者快速调试接口数据；时间戳转换工具支持Unix时间戳与日期互转；
          二维码生成器可免费制作无水印二维码；密码生成器基于密码学随机数创建高强度账号密码；
          文本处理套件涵盖去重、排序、批量查找替换与字数统计。
          无需安装软件、无需注册登录，打开网页即可使用，是程序员和普通用户提高工作效率的得力助手。
        </p>
      </section>

      <section className="faq-section">
        <h2>常见问题</h2>
        {homeFaq.map((f) => (
          <div key={f.q} className="faq-item">
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
    </>
  );
}
