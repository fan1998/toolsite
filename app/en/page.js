import { SITE } from "../../lib/tools";
import { englishTools } from "../../lib/english-tools";

export const metadata = {
  title: "Free Browser Tools for Marketing, Finance, Data & Files",
  description: "Ten focused browser tools for ROAS, marketing metrics, margin, markup, compound interest, mortgage payments, business days, CSV/JSON, images and PDFs.",
  keywords: ["free online tools", "browser tools", "ROAS calculator", "profit margin calculator", "private PDF merger"],
  alternates: { canonical: "/en", languages: { "en-US": "/en", "zh-CN": "/" } },
  openGraph: {
    title: "Fanjian Tools — the browser-side workbench",
    description: "Focused calculators and file tools. Useful inputs stay on your device.",
    url: `${SITE.url}/en`,
    locale: "en_US",
    type: "website",
  },
};

const categoryOrder = ["Marketing", "Business", "Finance", "Operations", "Developer", "Media", "Documents"];

export default function EnglishHome() {
  const grouped = categoryOrder.map((category) => ({ category, items: englishTools.filter((tool) => tool.category === category) })).filter((group) => group.items.length);
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fanjian Tools",
    url: `${SITE.url}/en`,
    description: "A browser-side workbench for marketing, finance, data and private file tasks.",
    inLanguage: "en-US",
  };
  return (
    <>
      <section className="en-hero">
        <div className="en-hero-copy">
          <span className="en-docket">WORKBENCH / 10 CALIBRATED UTILITIES</span>
          <h1>Finish the calculation.<br /><em>Keep the raw input.</em></h1>
          <p>Focused calculators and file tools that run where the work already is: in your browser.</p>
          <div className="en-hero-actions">
            <a href="#tool-index">Open the workbench <span>↓</span></a>
            <span>No sign-up · no tool-input upload</span>
          </div>
        </div>
        <div className="en-data-path" aria-label="How tool data is processed">
          <span className="en-path-label">DATA PATH / THIS TAB</span>
          <div><b>01</b><strong>Your input</strong><small>numbers, text or files</small></div>
          <i>→</i>
          <div><b>02</b><strong>Browser compute</strong><small>no conversion server</small></div>
          <i>→</i>
          <div><b>03</b><strong>Your result</strong><small>copy or download</small></div>
          <span className="en-path-seal">STAYS ON DEVICE</span>
        </div>
      </section>

      <section className="en-index" id="tool-index">
        <div className="en-section-title"><span>INDEX</span><h2>Pick the job, not a category maze.</h2><p>Every page contains a working tool, the formula or processing rule, and its limits.</p></div>
        {grouped.map((group) => (
          <div className="en-tool-row" key={group.category}>
            <h3>{group.category}</h3>
            <div className="en-tool-cards">
              {group.items.map((tool) => (
                <a href={`/en/tools/${tool.slug}`} className="en-tool-card" key={tool.slug}>
                  <span>{tool.code}</span>
                  <h4>{tool.title}</h4>
                  <p>{tool.short}</p>
                  <b>Open tool ↗</b>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="en-manifesto">
        <span>OPERATING NOTES</span>
        <div><h2>Small tools should be exact.</h2><p>We document assumptions, keep core actions available without registration, and do not disguise advertisements as results or download buttons. Finance tools are mathematical scenarios, not professional advice.</p></div>
        <a href="/about">How this site works →</a>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </>
  );
}
