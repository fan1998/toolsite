import "./globals.css";
import { SITE, tools } from "../lib/tools";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - ${SITE.slogan}`,
    template: `%s - ${SITE.name}`,
  },
  description: SITE.slogan,
  verification: {
    google: "vHCc-8w154O8Tes98Uda6-K1I80SnIixpK6spRhNSyg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <a href="/" className="logo">
              {SITE.name}
            </a>
            <nav className="nav">
              {tools
                .filter((t) => t.badge === "HOT")
                .map((t) => (
                  <a key={t.slug} href={`/tools/${t.slug}`}>
                    {t.title.replace("工具", "").replace("在线", "").replace("生成器", "")}
                  </a>
                ))}
              <a href="/blog">教程</a>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>{SITE.name} · 所有工具均在浏览器本地运行，不上传任何数据</p>
            <p>
              {tools.map((t, i) => (
                <span key={t.slug}>
                  {i > 0 && " · "}
                  <a href={`/tools/${t.slug}`}>{t.title}</a>
                </span>
              ))}
            </p>
            <p>
              <a href="/blog">技术教程</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
