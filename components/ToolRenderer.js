"use client";

import { lazy, Suspense } from "react";

// 每个工具单独一个 chunk，只在对应工具页被打开时才加载。
const loaders = {
  JsonFormat: () => import("../tools/JsonFormat"),
  TimestampConverter: () => import("../tools/TimestampConverter"),
  ColorConverter: () => import("../tools/ColorConverter"),
  MarkdownEditor: () => import("../tools/MarkdownEditor"),
  QrCodeGenerator: () => import("../tools/QrCodeGenerator"),
  Base64Tool: () => import("../tools/Base64Tool"),
  UrlCodec: () => import("../tools/UrlCodec"),
  UuidGenerator: () => import("../tools/UuidGenerator"),
  TextDedup: () => import("../tools/TextDedup"),
  WordCounter: () => import("../tools/WordCounter"),
  PasswordGenerator: () => import("../tools/PasswordGenerator"),
  NumberBase: () => import("../tools/NumberBase"),
  CaseConvert: () => import("../tools/CaseConvert"),
  TextSort: () => import("../tools/TextSort"),
  TextReplace: () => import("../tools/TextReplace"),
  BmiCalculator: () => import("../tools/BmiCalculator"),
  HtmlEntity: () => import("../tools/HtmlEntity"),
  ImageBase64: () => import("../tools/ImageBase64"),
  JwtDecode: () => import("../tools/JwtDecode"),
  UnicodeConvert: () => import("../tools/UnicodeConvert"),
  MorseCode: () => import("../tools/MorseCode"),
  RegexTester: () => import("../tools/RegexTester"),
  HttpStatus: () => import("../tools/HttpStatus"),
  LoremGenerator: () => import("../tools/LoremGenerator"),
  SlugGenerator: () => import("../tools/SlugGenerator"),
  HashGenerator: () => import("../tools/HashGenerator"),
  TextEncrypt: () => import("../tools/TextEncrypt"),
  TextCleaner: () => import("../tools/TextCleaner"),
  LinePrefix: () => import("../tools/LinePrefix"),
  TextDiff: () => import("../tools/TextDiff"),
  RandomPicker: () => import("../tools/RandomPicker"),
  ImageCompressor: () => import("../tools/ImageCompressor"),
  ImageResize: () => import("../tools/ImageResize"),
  ImageFormat: () => import("../tools/ImageFormat"),
  FaviconGenerator: () => import("../tools/FaviconGenerator"),
  ColorPalette: () => import("../tools/ColorPalette"),
  BoxShadow: () => import("../tools/BoxShadow"),
  BorderRadius: () => import("../tools/BorderRadius"),
  CssGradient: () => import("../tools/CssGradient"),
  Calculator: () => import("../tools/Calculator"),
  UnitConverter: () => import("../tools/UnitConverter"),
  AgeCalculator: () => import("../tools/AgeCalculator"),
  DateDiff: () => import("../tools/DateDiff"),
  RandomNumber: () => import("../tools/RandomNumber"),
  AmountUpper: () => import("../tools/AmountUpper"),
  Mortgage: () => import("../tools/Mortgage"),
  JsonEscape: () => import("../tools/JsonEscape"),
  CountdownTimer: () => import("../tools/CountdownTimer"),
  Stopwatch: () => import("../tools/Stopwatch"),
  StorageConverter: () => import("../tools/StorageConverter"),
  CompoundInterest: () => import("../tools/CompoundInterest"),
  PlaceholderImage: () => import("../tools/PlaceholderImage"),
  RandomString: () => import("../tools/RandomString"),
  AsciiTable: () => import("../tools/AsciiTable"),
  PdfMerge: () => import("../tools/PdfMerge"),
  PdfExtract: () => import("../tools/PdfExtract"),
  PdfDelete: () => import("../tools/PdfDelete"),
  PdfReorder: () => import("../tools/PdfReorder"),
  PdfRotate: () => import("../tools/PdfRotate"),
  PdfEncrypt: () => import("../tools/PdfEncrypt"),
  PdfDecrypt: () => import("../tools/PdfDecrypt"),
  PdfMetadata: () => import("../tools/PdfMetadata"),
  PdfCrop: () => import("../tools/PdfCrop"),
  ImageToPdf: () => import("../tools/ImageToPdf"),
  PdfWatermark: () => import("../tools/PdfWatermark"),
  PdfPageNumbers: () => import("../tools/PdfPageNumbers"),
  IdCardValidate: () => import("../tools/IdCardValidate"),
  PercentageCalc: () => import("../tools/PercentageCalc"),
  WorkdayCalc: () => import("../tools/WorkdayCalc"),
  TaxCalculator: () => import("../tools/TaxCalculator"),
  UrlParser: () => import("../tools/UrlParser"),
  CronParser: () => import("../tools/CronParser"),
  CsvJson: () => import("../tools/CsvJson"),
  HtmlRunner: () => import("../tools/HtmlRunner"),
  CssFormatter: () => import("../tools/CssFormatter"),
  EmojiPicker: () => import("../tools/EmojiPicker"),
};

const registry = Object.fromEntries(
  Object.entries(loaders).map(([key, loader]) => [key, lazy(loader)])
);

export default function ToolRenderer({ component }) {
  const Comp = registry[component];
  if (!Comp) return null;
  return (
    <Suspense
      fallback={
        <div className="panel">
          <p className="intro">工具加载中…</p>
        </div>
      }
    >
      <Comp />
    </Suspense>
  );
}
