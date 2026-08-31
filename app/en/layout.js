export default function EnglishLayout({ children }) {
  return (
    <section className="en-root" lang="en">
      <div className="en-subnav">
        <a className="en-subbrand" href="/en"><b>FANJIAN</b><span>browser-side workbench</span></a>
        <nav aria-label="English tools navigation">
          <a href="/en">All tools</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
          <a href="/" lang="zh-CN">中文版</a>
        </nav>
      </div>
      {children}
    </section>
  );
}
