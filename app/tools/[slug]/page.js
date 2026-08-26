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
import HtmlEntity from "../../../tools/HtmlEntity";
import ImageBase64 from "../../../tools/ImageBase64";
import JwtDecode from "../../../tools/JwtDecode";
import UnicodeConvert from "../../../tools/UnicodeConvert";
import MorseCode from "../../../tools/MorseCode";
import RegexTester from "../../../tools/RegexTester";
import HttpStatus from "../../../tools/HttpStatus";
import LoremGenerator from "../../../tools/LoremGenerator";
import SlugGenerator from "../../../tools/SlugGenerator";
import HashGenerator from "../../../tools/HashGenerator";
import TextEncrypt from "../../../tools/TextEncrypt";
import TextCleaner from "../../../tools/TextCleaner";
import LinePrefix from "../../../tools/LinePrefix";
import TextDiff from "../../../tools/TextDiff";
import RandomPicker from "../../../tools/RandomPicker";
import ImageCompressor from "../../../tools/ImageCompressor";
import ImageResize from "../../../tools/ImageResize";
import ImageFormat from "../../../tools/ImageFormat";
import FaviconGenerator from "../../../tools/FaviconGenerator";
import ColorPalette from "../../../tools/ColorPalette";
import BoxShadow from "../../../tools/BoxShadow";
import BorderRadius from "../../../tools/BorderRadius";
import CssGradient from "../../../tools/CssGradient";
import Calculator from "../../../tools/Calculator";
import UnitConverter from "../../../tools/UnitConverter";
import AgeCalculator from "../../../tools/AgeCalculator";
import DateDiff from "../../../tools/DateDiff";
import RandomNumber from "../../../tools/RandomNumber";
import AmountUpper from "../../../tools/AmountUpper";
import Mortgage from "../../../tools/Mortgage";
import JsonEscape from "../../../tools/JsonEscape";
import CountdownTimer from "../../../tools/CountdownTimer";
import Stopwatch from "../../../tools/Stopwatch";
import StorageConverter from "../../../tools/StorageConverter";
import CompoundInterest from "../../../tools/CompoundInterest";
import PlaceholderImage from "../../../tools/PlaceholderImage";
import RandomString from "../../../tools/RandomString";
import AsciiTable from "../../../tools/AsciiTable";
import PdfMerge from "../../../tools/PdfMerge";
import PdfExtract from "../../../tools/PdfExtract";
import PdfDelete from "../../../tools/PdfDelete";
import PdfReorder from "../../../tools/PdfReorder";
import PdfRotate from "../../../tools/PdfRotate";
import PdfEncrypt from "../../../tools/PdfEncrypt";
import PdfDecrypt from "../../../tools/PdfDecrypt";
import PdfMetadata from "../../../tools/PdfMetadata";
import PdfCrop from "../../../tools/PdfCrop";
import ImageToPdf from "../../../tools/ImageToPdf";
import PdfWatermark from "../../../tools/PdfWatermark";
import PdfPageNumbers from "../../../tools/PdfPageNumbers";

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
  HtmlEntity,
  ImageBase64,
  JwtDecode,
  UnicodeConvert,
  MorseCode,
  RegexTester,
  HttpStatus,
  LoremGenerator,
  SlugGenerator,
  HashGenerator,
  TextEncrypt,
  TextCleaner,
  LinePrefix,
  TextDiff,
  RandomPicker,
  ImageCompressor,
  ImageResize,
  ImageFormat,
  FaviconGenerator,
  ColorPalette,
  BoxShadow,
  BorderRadius,
  CssGradient,
  Calculator,
  UnitConverter,
  AgeCalculator,
  DateDiff,
  RandomNumber,
  AmountUpper,
  Mortgage,
  JsonEscape,
  CountdownTimer,
  Stopwatch,
  StorageConverter,
  CompoundInterest,
  PlaceholderImage,
  RandomString,
  AsciiTable,
  PdfMerge,
  PdfExtract,
  PdfDelete,
  PdfReorder,
  PdfRotate,
  PdfEncrypt,
  PdfDecrypt,
  PdfMetadata,
  PdfCrop,
  ImageToPdf,
  PdfWatermark,
  PdfPageNumbers,
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
