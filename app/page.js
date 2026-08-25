import { SITE, tools } from "../lib/tools";

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>{SITE.name}</h1>
        <p>{SITE.slogan}</p>
      </section>
      <section className="tool-grid">
        {tools.map((t) => (
          <a key={t.slug} className="tool-card" href={`/tools/${t.slug}`}>
            <h2>{t.title}</h2>
            <p>{t.description.slice(0, 60)}…</p>
          </a>
        ))}
      </section>
    </>
  );
}
