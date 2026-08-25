import { notFound } from "next/navigation";
import { SITE, tools } from "../../../lib/tools";
import { AdSlot } from "../../../components/AdSlot";
import JsonFormat from "../../../tools/JsonFormat";
import TimestampConverter from "../../../tools/TimestampConverter";
import ColorConverter from "../../../tools/ColorConverter";
import MarkdownEditor from "../../../tools/MarkdownEditor";
import QrCodeGenerator from "../../../tools/QrCodeGenerator";
import Base64Tool from "../../../tools/Base64Tool";
import UrlCodec from "../../../tools/UrlCodec";
import UuidGenerator from "../../../tools/UuidGenerator";
import TextDedup from "../../../tools/TextDedup";
import WordCounter from "../../../tools/WordCounter";
import PasswordGenerator from "../../../tools/PasswordGenerator";
import NumberBase from "../../../tools/NumberBase";
import CaseConvert from "../../../tools/CaseConvert";
import TextSort from "../../../tools/TextSort";
import TextReplace from "../../../tools/TextReplace";
import BmiCalculator from "../../../tools/BmiCalculator";

const registry = {
  JsonFormat,
  TimestampConverter,
  ColorConverter,
  MarkdownEditor,
  QrCodeGenerator,
  Base64Tool,
  UrlCodec,
  UuidGenerator,
  TextDedup,
  WordCounter,
  PasswordGenerator,
  NumberBase,
  CaseConvert,
  TextSort,
  TextReplace,
  BmiCalculator,
};

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }) {
  const t = tools.find((x) => x.slug === params.slug);
  if (!t) return {};
  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    alternates: { canonical: `/tools/${t.slug}` },
    openGraph: {
      title: `${t.title} - ${SITE.name}`,
      description: t.description,
      url: `${SITE.url}/tools/${t.slug}`,
    },
  };
}

export default function ToolPage({ params }) {
  const t = tools.find((x) => x.slug === params.slug);
  if (!t) notFound();
  const Tool = registry[t.component];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="tool-page">
      <h1>{t.title}</h1>
      <p className="intro">{t.intro}</p>
      <AdSlot />
      <Tool />
      <AdSlot />
      <section className="faq-section">
        <h2>常见问题</h2>
        {t.faq.map((f) => (
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
    </article>
  );
}
