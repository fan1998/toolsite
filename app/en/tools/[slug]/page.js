import { notFound } from "next/navigation";
import { AdSlot } from "../../../../components/AdSlot";
import EnglishToolRenderer from "../../../../components/EnglishToolRenderer";
import { englishToolBySlug, englishTools } from "../../../../lib/english-tools";
import { SITE } from "../../../../lib/tools";

export function generateStaticParams() {
  return englishTools.map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({ params }) {
  const tool = englishToolBySlug[params.slug];
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: `/en/tools/${tool.slug}` },
    openGraph: {
      title: `${tool.title} — Fanjian Tools`,
      description: tool.description,
      url: `${SITE.url}/en/tools/${tool.slug}`,
      locale: "en_US",
      type: "website",
    },
  };
}

export default function EnglishToolPage({ params }) {
  const tool = englishToolBySlug[params.slug];
  if (!tool) notFound();
  const related = englishTools.filter((item) => item.slug !== tool.slug && item.category === tool.category).slice(0, 3);
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    url: `${SITE.url}/en/tools/${tool.slug}`,
    description: tool.description,
    applicationCategory: tool.category === "Finance" ? "FinanceApplication" : "UtilitiesApplication",
    operatingSystem: "Any modern web browser",
    browserRequirements: "JavaScript enabled",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  return (
    <article className="en-tool-page">
      <nav className="en-breadcrumb" aria-label="Breadcrumb"><a href="/en">Workbench</a><span>/</span><span>{tool.category}</span><span>/</span><b>{tool.code}</b></nav>
      <header className="en-tool-header">
        <span>{tool.code} · {tool.category}</span>
        <h1>{tool.title}</h1>
        <p>{tool.intro}</p>
        <div><i>LOCAL</i><span>Inputs are processed in this browser.</span></div>
      </header>

      <AdSlot className="en-ad-slot" />
      <EnglishToolRenderer slug={tool.slug} />
      <AdSlot className="en-ad-slot" />

      <section className="en-method">
        <div className="en-method-title"><span>METHOD</span><h2>Use it without guessing.</h2></div>
        <ol>{tool.steps.map((step, index) => <li key={step}><b>{String(index + 1).padStart(2, "0")}</b><span>{step}</span></li>)}</ol>
      </section>

      <section className="en-notes">
        <div><span>READ THE RESULT</span><h2>What the number means</h2></div>
        <div>{tool.notes.map((note) => <p key={note}>{note}</p>)}</div>
      </section>

      <section className="en-faq">
        <span>QUESTIONS</span><h2>Before you rely on the output</h2>
        <div>{tool.faq.map((item) => <details key={item.q}><summary>{item.q}<i>+</i></summary><p>{item.a}</p></details>)}</div>
      </section>

      <section className="en-related">
        <span>NEXT ON THE BENCH</span>
        <div>{(related.length ? related : englishTools.filter((item) => item.slug !== tool.slug).slice(0, 3)).map((item) => <a href={`/en/tools/${item.slug}`} key={item.slug}><small>{item.code}</small><b>{item.title}</b><span>Open ↗</span></a>)}</div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </article>
  );
}
