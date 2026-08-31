import "./globals.css";
import { SITE, tools } from "../lib/tools";
import { posts } from "../lib/posts";
import { AdScript } from "../components/AdSlot";

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - ${SITE.slogan}`,
    template: `%s - ${SITE.name}`,
  },
  description: SITE.slogan,
  verification: {
    google: "vHCc-8w154O8Tes98Uda6-K1I80SnIixpK6spRhNSyg",
    other: {
      "baidu-site-verification": "codeva-I4yjIHoTnV",
    },
  },
  ...(adsenseClientId
    ? { other: { "google-adsense-account": adsenseClientId } }
    : {}),
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <AdScript />
        <header className="site-header">
          <div className="container header-inner">
            <a href="/" className="logo">
              {SITE.name}
            </a>
            <nav className="nav">
              <a href="/blog">教程</a>
              <a href="/en" lang="en">English</a>
              <a href="/services">定制服务</a>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <p className="footer-logo">{SITE.name}</p>
                <p className="footer-desc">{SITE.slogan}</p>
              </div>
              <div>
                <p className="footer-title">热门工具</p>
                {tools
                  .filter((t) => t.badge === "HOT")
                  .slice(0, 6)
                  .map((t) => (
                    <a key={t.slug} href={`/tools/${t.slug}`}>
                      {t.title}
                    </a>
                  ))}
              </div>
              <div>
                <p className="footer-title">全部分类</p>
                {[...new Set(tools.map((t) => t.category))].map((c) => (
                  <a key={c} href={`/?cat=${encodeURIComponent(c)}`}>
                    {c}
                  </a>
                ))}
              </div>
              <div>
                <p className="footer-title">最新教程</p>
                {[...posts]
                  .slice(-4)
                  .reverse()
                  .map((p) => (
                    <a key={p.slug} href={`/blog/${p.slug}`}>
                      {p.title.length > 18 ? p.title.slice(0, 18) + "…" : p.title}
                    </a>
                  ))}
                <a href="/blog">全部教程 →</a>
              </div>
              <div>
                <p className="footer-title">本站</p>
                <a href="/en" lang="en">English tools →</a>
                <a href="/about">关于本站</a>
                <a href="/contact">联系方式</a>
                <a href="/privacy">隐私政策</a>
                <a href="/terms">使用条款</a>
                <a href="/services">定制开发服务 →</a>
              </div>
            </div>
            <div className="footer-bottom">
              <span>
                © {new Date().getFullYear()} {SITE.name} · 工具输入在浏览器本地处理，不作为广告数据上传
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
