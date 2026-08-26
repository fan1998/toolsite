export const SITE = {
  name: "凡间工具箱",
  slogan: "免费在线开发者工具，纯本地处理，数据不上传",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fanjian.org",
};

export const ICONS = {
  "json-format": "🧾",
  timestamp: "⏰",
  "color-converter": "🎨",
  "markdown-editor": "📝",
  "qr-code": "🔳",
  base64: "🔣",
  "url-encode": "🔗",
  "uuid-generator": "🆔",
  "text-dedup": "🧹",
  "word-counter": "🔢",
  "password-generator": "🔑",
  "number-base": "🔟",
  "case-convert": "🔠",
  "text-sort": "🔤",
  "text-replace": "✏️",
  "bmi-calculator": "⚖️",
  "html-entity": "🌐",
  "image-base64": "🖼️",
  "jwt-decode": "🎫",
  "unicode-convert": "🔣",
  "morse-code": "📡",
  "regex-tester": "🧪",
  "http-status": "🚦",
  "lorem-generator": "📄",
  "slug-generator": "🏷️",
  "hash-generator": "#️⃣",
  "text-encrypt": "🛡️",
  "text-cleaner": "🧼",
  "line-prefix": "📋",
  "text-diff": "🔍",
  "random-picker": "🎯",
  "image-compressor": "🗜️",
  "image-resize": "📐",
  "image-format": "🔄",
  "favicon-generator": "🌟",
  "color-palette": "🌈",
  "box-shadow": "🔲",
  "border-radius": "⭕",
  "css-gradient": "🌅",
  calculator: "🧮",
  "unit-converter": "📏",
  "age-calculator": "🎂",
  "date-diff": "📅",
  "random-number": "🎲",
  "amount-uppercase": "💴",
  "mortgage-calculator": "🏠",
  "json-escape": "🧯",
  "countdown-timer": "⏳",
  stopwatch: "⏱️",
  "storage-converter": "💾",
  "compound-interest": "💹",
  "placeholder-image": "🪧",
  "random-string": "🎰",
  "ascii-table": "🔡",
  "pdf-merge": "🔀",
  "pdf-extract-pages": "📄",
  "pdf-delete-pages": "🗑️",
  "pdf-reorder": "🔃",
  "pdf-rotate": "🔄",
  "pdf-encrypt": "🔒",
  "pdf-decrypt": "🔓",
  "pdf-metadata": "🏷️",
  "pdf-crop": "✂️",
  "image-to-pdf": "🖨️",
  "pdf-watermark": "💧",
  "pdf-page-numbers": "🔢",
};

export const tools = [
  {
    slug: "json-format",
    category: "开发工具",
    badge: "HOT",
    title: "JSON格式化工具",
    description:
      "免费在线JSON格式化、压缩与校验工具。粘贴JSON一键美化排版或压缩为单行，实时校验语法错误并提示出错位置。纯浏览器本地处理，数据不上传。",
    keywords: ["json格式化", "json校验", "json压缩", "json在线工具"],
    intro:
      "粘贴 JSON 内容，点击「格式化」即可美化缩进排版，点击「压缩」可去除空白输出单行 JSON。工具会实时校验语法，若格式错误会给出具体报错信息，方便快速定位问题。",
    faq: [
      {
        q: "JSON 格式化是安全的吗？",
        a: "是的。所有解析和格式化都在你的浏览器本地完成，数据不会发送到任何服务器。",
      },
      {
        q: "支持多大的 JSON 文件？",
        a: "一般建议在 5MB 以内。过大的文本可能导致浏览器卡顿。",
      },
      {
        q: "为什么会提示校验失败？",
        a: "常见原因包括：多余或缺失的逗号、字符串使用了单引号、键名没有用双引号包裹。根据报错信息修改后重新格式化即可。",
      },
    ],
    component: "JsonFormat",
  },
  {
    slug: "timestamp",
    category: "开发工具",
    badge: "HOT",
    title: "时间戳转换工具",
    description:
      "在线Unix时间戳与日期时间互转工具。输入时间戳自动识别秒/毫秒并转换为本地时间，也可将日期转换为10位/13位时间戳，实时显示当前时间戳。",
    keywords: ["时间戳转换", "unix时间戳", "日期转换", "当前时间戳"],
    intro:
      "输入 Unix 时间戳（自动识别 10 位秒级 / 13 位毫秒级），立即转换为本地时间和 UTC 时间；也可以选择日期时间反向生成时间戳。页面顶部会实时显示当前时间戳。",
    faq: [
      {
        q: "10位和13位时间戳有什么区别？",
        a: "10位时间戳精确到秒，13位精确到毫秒。本工具会根据位数自动识别，无需手动切换。",
      },
      {
        q: "时间戳转换会受时区影响吗？",
        a: "时间戳本身是全球统一的绝对时刻。展示时会同时给出你设备的本地时间和标准 UTC 时间，避免歧义。",
      },
    ],
    component: "TimestampConverter",
  },
  {
    slug: "color-converter",
    category: "CSS样式",
    badge: "HOT",
    title: "颜色转换工具",
    description:
      "在线颜色值转换工具，支持 HEX、RGB、HSL 互相转换。使用取色器或直接输入色值，实时预览并一键复制 CSS 颜色代码。",
    keywords: ["颜色转换", "hex转rgb", "rgb转hsl", "取色器", "css颜色"],
    intro:
      "通过取色器选色或直接输入 HEX 色值，实时获得 RGB 与 HSL 格式的等价值，点击任意结果即可复制对应的 CSS 颜色写法。",
    faq: [
      {
        q: "支持 3 位缩写 HEX 吗？",
        a: "支持，例如 #abc 会自动展开为 #aabbcc 进行换算。",
      },
      {
        q: "为什么 HSL 数值和设计软件略有差异？",
        a: "不同工具对 HSL 的舍入方式可能不同（四舍五入位置不同），差异通常在 1 以内，不影响实际显示效果。",
      },
    ],
    component: "ColorConverter",
  },
  {
    slug: "markdown-editor",
    category: "文本处理",
    badge: "",
    title: "Markdown在线编辑器",
    description:
      "免费在线Markdown编辑器，左侧编写右侧实时预览，支持标题、列表、表格、代码块等常用语法。无需登录，内容仅保存在本地浏览器。",
    keywords: ["markdown编辑器", "markdown预览", "md在线编辑", "markdown转html"],
    intro:
      "在左侧输入 Markdown 文本，右侧即时渲染预览效果，支持标题、粗体斜体、列表、引用、代码块、链接图片和表格等常用语法，适合快速撰写和检查 Markdown 文档。",
    faq: [
      {
        q: "编辑的内容会丢失吗？",
        a: "内容会自动保存在当前浏览器的本地存储中，刷新页面不丢失。清除浏览器数据前请自行导出备份。",
      },
      {
        q: "支持导出 HTML 吗？",
        a: "可以点击「复制HTML」按钮获取渲染后的 HTML 源码，粘贴到博客或文档平台使用。",
      },
    ],
    component: "MarkdownEditor",
  },
  {
    slug: "qr-code",
    category: "生活实用",
    badge: "HOT",
    title: "二维码生成器",
    description:
      "免费在线二维码生成工具。输入网址或文字立即生成高清二维码图片，可一键下载PNG。纯前端生成，不限次数，无水印。",
    keywords: ["二维码生成", "qrcode", "二维码在线制作", "免费二维码"],
    intro:
      "输入任意网址或文本，点击「生成二维码」即可得到高清 PNG 二维码，扫码后跳转到对应内容或展示文本，可直接下载用于海报、名片、菜单等场景。",
    faq: [
      {
        q: "生成的二维码会过期吗？",
        a: "不会。二维码本身只是内容的编码，只要被编码的网址或文本有效，二维码就永远可用，也不依赖本站服务。",
      },
      {
        q: "有数量和水印限制吗？",
        a: "没有。所有生成均在浏览器本地完成，不限次数、无水印，可放心商用。",
      },
      {
        q: "多长的内容适合生成二维码？",
        a: "建议控制在 500 字符以内。内容越长二维码点阵越密集，部分低质量摄像头可能难以识别。",
      },
    ],
    component: "QrCodeGenerator",
  },
  {
    slug: "base64",
    category: "编码转换",
    badge: "HOT",
    title: "Base64编码解码工具",
    description:
      "在线Base64编码与解码工具，支持中文等UTF-8字符不乱码。文本与Base64互转，一键复制结果，纯浏览器本地运行。",
    keywords: ["base64编码", "base64解码", "base64在线转换", "base64加密解密"],
    intro:
      "输入文本后选择「编码」生成 Base64 字符串，或粘贴 Base64 内容选择「解码」还原为原始文本。采用 UTF-8 编解码，中文内容不会乱码。",
    faq: [
      {
        q: "Base64 是加密吗？",
        a: "不是。Base64 只是编码方式，任何人都能解码还原，请勿用于保存密码等敏感信息。",
      },
      {
        q: "解码时报错怎么办？",
        a: "请检查是否复制完整、有无多余空格或换行，且内容必须是合法的 Base64 字符集（A-Z、a-z、0-9、+、/、=）。",
      },
    ],
    component: "Base64Tool",
  },
  {
    slug: "url-encode",
    category: "编码转换",
    badge: "",
    title: "URL编码解码工具",
    description:
      "在线URL编码解码工具，支持中文、空格及特殊字符与百分号编码互转，处理GET参数、接口地址必备，本地运行不上传。",
    keywords: ["url编码", "url解码", "percent encoding", "urlencode在线"],
    intro:
      "输入含中文或特殊字符的文本/网址，一键转换为 %xx 形式的 URL 编码，或将已编码的字符串还原为可读文本。",
    faq: [
      {
        q: "编码后 + 号和 %20 有什么区别？",
        a: "%20 是标准的空格编码；+ 号是表单提交中的旧约定。本工具解码时会自动把 + 按空格处理，兼容两种格式。",
      },
      {
        q: "什么场景需要 URL 编码？",
        a: "在链接参数中传递中文、空格、&、? 等字符时必须编码，否则参数会被截断或解析错误。",
      },
    ],
    component: "UrlCodec",
  },
  {
    slug: "uuid-generator",
    category: "开发工具",
    badge: "",
    title: "UUID生成器",
    description:
      "免费在线UUID生成工具，一键批量生成符合RFC 4122标准的UUID v4随机标识符，支持复制，浏览器本地生成无需联网。",
    keywords: ["uuid生成", "guid生成器", "uuid v4", "随机id生成"],
    intro:
      "点击按钮批量生成 UUID v4（通用唯一识别码），基于密码学随机数，碰撞概率几乎为零，可直接用于数据库主键、订单号、测试数据等场景。",
    faq: [
      {
        q: "UUID v4 会重复吗？",
        a: "理论上有重复概率，但约为 2^122 分之一，实际使用中可以认为绝对不会重复。",
      },
      {
        q: "UUID 和 GUID 有区别吗？",
        a: "没有实质区别，GUID 是微软对 UUID 的叫法，本工具生成的内容两者通用。",
      },
    ],
    component: "UuidGenerator",
  },
  {
    slug: "text-dedup",
    category: "文本处理",
    badge: "",
    title: "文本去重工具",
    description:
      "在线文本去重工具，按行快速去除重复内容，支持忽略首尾空格，实时显示去重统计，一键复制结果，本地处理保护隐私。",
    keywords: ["文本去重", "列表去重", "重复行删除", "在线去重工具"],
    intro:
      "粘贴每行一条的文本列表，自动去除重复行并统计数量，可选择是否忽略行首尾空格后再比对，适合清理关键词、名单、日志等数据。",
    faq: [
      {
        q: "空行会被保留吗？",
        a: "不会。空行会自动过滤，只保留有内容的行。",
      },
      {
        q: "会打乱原有顺序吗？",
        a: "不会。去重后保留每条内容第一次出现的顺序。",
      },
    ],
    component: "TextDedup",
  },
  {
    slug: "word-counter",
    category: "文本处理",
    badge: "",
    title: "字数统计工具",
    description:
      "在线字数统计工具，实时统计总字符数、中文汉字数、英文单词数、行数等指标，写稿、论文、文案字数检查必备。",
    keywords: ["字数统计", "字符数统计", "在线字数计算", "文章字数统计"],
    intro:
      "粘贴或输入文本即可实时统计总字符数、不含空格字符数、中文汉字数、英文单词数和行数，适用于论文、自媒体文案、翻译计费等场景。",
    faq: [
      {
        q: "中英文是怎么分别统计的？",
        a: "中文字数按汉字字符逐个计数；英文按连续字母/数字组合计为单词数，与 Word 的统计口径接近。",
      },
      {
        q: "数据会被上传吗？",
        a: "不会。统计完全在你的浏览器内完成，关闭页面后内容即消失。",
      },
    ],
    component: "WordCounter",
  },
  {
    slug: "password-generator",
    category: "加密安全",
    badge: "HOT",
    title: "随机密码生成器",
    description:
      "免费在线随机密码生成器，自定义长度与字符类型（大小写字母/数字/特殊符号），密码强度实时评估，基于密码学安全随机数，本地生成不上传。",
    keywords: ["密码生成器", "随机密码", "强密码生成", "password generator"],
    intro:
      "拖动滑块选择密码长度，勾选需要的字符类型，点击「生成密码」即可获得基于密码学安全随机数（crypto API）生成的高强度密码，实时显示强度评估。",
    faq: [
      {
        q: "生成的密码安全吗？",
        a: "安全。密码使用浏览器内置的密码学随机数生成器在本地生成，不会经过网络传输，我们无法获知你的密码。",
      },
      {
        q: "多长的密码才够安全？",
        a: "建议至少 12 位，包含大小写字母、数字和特殊符号。16 位以上的混合字符密码目前技术上无法被暴力破解。",
      },
    ],
    component: "PasswordGenerator",
  },
  {
    slug: "number-base",
    category: "编码转换",
    badge: "",
    title: "进制转换工具",
    description:
      "在线进制转换工具，支持二进制、八进制、十进制、十六进制互相转换，输入一个数值同时显示四种进制结果，一键复制。",
    keywords: ["进制转换", "二进制转换", "十六进制转换", "进制计算器"],
    intro:
      "选择输入进制并输入数值，自动换算出二进制、八进制、十进制、十六进制四种结果，点击任意结果即可复制，是学习计算机基础和调试程序的常用工具。",
    faq: [
      {
        q: "支持小数吗？",
        a: "目前仅支持整数转换。计算机中的进制小数表示涉及精度问题，建议使用专门的浮点数工具。",
      },
      {
        q: "十六进制需要加 0x 前缀吗？",
        a: "不需要，直接输入纯数字字符即可，如 1A3F。",
      },
    ],
    component: "NumberBase",
  },
  {
    slug: "case-convert",
    category: "文本处理",
    badge: "",
    title: "大小写转换工具",
    description:
      "在线大小写转换工具，支持全大写、全小写、首字母大写及 camelCase、PascalCase、snake_case、kebab-case 等编程命名格式互转。",
    keywords: ["大小写转换", "驼峰转换", "命名格式转换", "camelcase"],
    intro:
      "输入文本后一键转换为全大写、全小写、首字母大写，或转换成编程常用的 camelCase、PascalCase、snake_case、kebab-case 命名风格，变量命名必备。",
    faq: [
      {
        q: "命名格式转换支持哪些输入？",
        a: "支持空格、下划线、中划线分隔的单词，如 hello world、hello_world、hello-world 均可正确转换为各种命名格式。",
      },
    ],
    component: "CaseConvert",
  },
  {
    slug: "text-sort",
    category: "文本处理",
    badge: "",
    title: "文本排序工具",
    description:
      "在线文本行排序工具，支持按拼音/字母升序降序、按长度排序、随机打乱、排序同时去重，支持中文排序，一键复制结果。",
    keywords: ["文本排序", "行排序", "拼音排序", "随机打乱"],
    intro:
      "粘贴每行一条的文本，支持按拼音与字母混合排序（升序/降序）、按行长度排序、随机打乱顺序，还可勾选排序同时去重，适合整理名单、词库、清单。",
    faq: [
      {
        q: "中文按什么规则排序？",
        a: "使用国际化排序规则（Intl.Collator），中文按拼音顺序排列，数字按数值大小而非字符顺序。",
      },
    ],
    component: "TextSort",
  },
  {
    slug: "text-replace",
    category: "文本处理",
    badge: "",
    title: "批量查找替换工具",
    description:
      "在线文本查找替换工具，支持批量替换、区分大小写、正则表达式高级模式，实时统计替换次数，处理文案和代码必备。",
    keywords: ["查找替换", "批量替换", "正则替换", "文本替换工具"],
    intro:
      "输入原始文本、查找内容和替换内容，一键完成批量替换并统计替换次数。支持区分大小写选项与正则表达式模式，可完成删除空行、统一格式等复杂处理。",
    faq: [
      {
        q: "正则模式能做什么？",
        a: "例如用 \\s+ 匹配连续空白、用 ^#\\s? 删除行首井号、用 \\d+ 定位所有数字，是批量清洗文本的利器。",
      },
    ],
    component: "TextReplace",
  },
  {
    slug: "bmi-calculator",
    category: "生活实用",
    badge: "",
    title: "BMI体重指数计算器",
    description:
      "免费在线BMI计算器，输入身高体重即时计算身体质量指数，按中国成人标准给出偏瘦/正常/超重/肥胖评估与健康建议。",
    keywords: ["bmi计算", "体重指数", "bmi计算器", "标准体重"],
    intro:
      "输入身高（cm）和体重（kg），立即计算 BMI 身体质量指数，并按中国成人标准给出体重分级与健康建议，结果仅供参考。",
    faq: [
      {
        q: "BMI 的计算公式是什么？",
        a: "BMI = 体重(kg) ÷ 身高²(m²)。例如身高 170cm、体重 65kg，BMI = 65 ÷ 1.7² ≈ 22.5。",
      },
      {
        q: "为什么和有些App的结果分级不同？",
        a: "中国成人标准（超重24、肥胖28）与国际WHO标准（超重25、肥胖30）不同，本站采用更符合国人的中国标准。",
      },
    ],
    component: "BmiCalculator",
  },
  { slug: "html-entity", category: "编码转换", badge: "", title: "HTML实体编解码", description: "在线HTML实体编码解码工具，将 < > & 引号等特殊字符转换为HTML实体防止解析冲突，或还原实体为原字符。", keywords: ["html实体", "html转义", "html entity", "特殊字符转义"], intro: "将HTML特殊字符（< > & \" '）转换为实体编码，防止浏览器误解析，或把实体编码还原为可读字符。", faq: [{ q: "什么时候需要HTML实体编码？", a: "在网页中展示代码片段、用户输入内容时必须转义，否则可能破坏页面结构甚至引发XSS安全问题。" }], component: "HtmlEntity" },
  { slug: "image-base64", category: "编码转换", badge: "", title: "图片Base64转换", description: "在线图片转Base64 DataURL工具，嵌入网页减少请求，也支持将Base64还原下载为图片，本地处理不.upload。", keywords: ["图片base64", "dataurl", "图片编码", "base64图片"], intro: "上传图片立即转换为 Base64 DataURL，可直接嵌入 CSS 或 HTML；也支持粘贴 Base64 还原下载图片。", faq: [{ q: "图片转 Base64 有什么用？", a: "可将小图标直接内嵌到网页代码中，减少 HTTP 请求。建议仅对 10KB 以内的小图使用，大图会显著增大文件体积。" }], component: "ImageBase64" },
  { slug: "jwt-decode", category: "开发工具", badge: "", title: "JWT解码工具", description: "在线JWT Token解码工具，解析Header和Payload内容并显示过期时间，本地解码不上传，调试登录鉴权必备。", keywords: ["jwt解码", "jwt解析", "token解码", "jwt online"], intro: "粘贴 JWT Token，自动解码出 Header 和 Payload 内容，若包含 exp 过期时间会自动换算为可读时间并标注是否过期。", faq: [{ q: "解码 JWT 会泄露信息吗？", a: "JWT 本身只是 Base64 编码并非加密，任何人都能读取其内容。本工具在本地解码，Token 不会上传。请勿在 Token 中存放敏感信息。" }, { q: "为什么无法验证签名？", a: "签名验证需要密钥（secret 或公钥），本工具仅做内容解析，用于快速调试查看。" }], component: "JwtDecode" },
  { slug: "unicode-convert", category: "编码转换", badge: "", title: "Unicode转换工具", description: "在线Unicode编码转换工具，中文与\\uXXXX编码互转，支持Emoji等全部字符，开发调试编码问题必备。", keywords: ["unicode转换", "中文转unicode", "\\u编码", "unicode解码"], intro: "将中文等非ASCII字符转换为 \\uXXXX 转义序列，或将 \\uXXXX 序列还原为可读文字，支持Emoji等全部Unicode字符。", faq: [{ q: "什么场景需要 Unicode 转换？", a: "调试接口返回的 \\u 开头乱码、查看特殊字符真实编码、处理国际化文本时经常用到。" }], component: "UnicodeConvert" },
  { slug: "morse-code", category: "编码转换", badge: "", title: "摩斯电码转换器", description: "在线摩斯电码翻译工具，文字与摩斯密码互转，支持字母数字和常用标点，学习通讯原理的趣味工具。", keywords: ["摩斯电码", "摩斯密码翻译", "morse code", "电码转换"], intro: "输入字母数字一键转换为摩斯电码（字母间空格、单词间 / 分隔），或粘贴点划序列还原为文字。", faq: [{ q: "SOS 用摩斯电码怎么表示？", a: "SOS 是 ... --- ...（三短三长三短），是全球通用的紧急求救信号，可以在本工具中验证。" }], component: "MorseCode" },
  { slug: "regex-tester", category: "开发工具", badge: "HOT", title: "正则表达式测试", description: "在线正则表达式测试工具，实时高亮匹配结果、显示分组捕获和匹配位置，支持全部flags，写正则必备。", keywords: ["正则测试", "正则表达式在线", "regex测试", "正则调试"], intro: "输入正则表达式和测试文本，实时显示所有匹配结果、位置和分组捕获内容，支持 g i m s u 等标志位组合。", faq: [{ q: "匹配结果为什么和预期不同？", a: "检查是否忘记加 g 标志（只匹配第一处）、是否误用贪婪量词，可用 .*? 改为非贪婪模式。" }, { q: "支持哪些正则语法？", a: "基于 JavaScript RegExp 引擎，支持前瞻后顾、命名分组、Unicode属性转义等全部ES2018+特性。" }], component: "RegexTester" },
  { slug: "http-status", category: "开发工具", badge: "", title: "HTTP状态码速查", description: "HTTP状态码大全速查表，2xx成功、3xx重定向、4xx客户端错误、5xx服务器错误，含中文含义解释，支持搜索。", keywords: ["http状态码", "404是什么", "状态码大全", "http code"], intro: "快速查询HTTP状态码含义，按类别用颜色区分：绿色2xx成功、蓝色3xx重定向、橙色4xx客户端错误、红色5xx服务器错误。", faq: [{ q: "404和410有什么区别？", a: "404表示资源不存在但可能将来出现；410表示资源已永久删除。搜索引擎对410会更快移除索引。" }], component: "HttpStatus" },
  { slug: "lorem-generator", category: "开发工具", badge: "", title: "中文占位文本生成", description: "在线中文假文生成器，快速生成中文占位段落用于设计稿、排版测试，自定义段落数一键复制。", keywords: ["占位文本", "假文生成", "lorem ipsum中文", "测试文本"], intro: "一键生成指定段落数的中文占位文本，用于设计稿填充、排版效果测试，避免英文 Lorem ipsum 的违和感。", faq: [{ q: "占位文本有什么用？", a: "在设计稿、网页原型中填充真实比例的文字内容，比空白或乱码更能准确评估排版效果。" }], component: "LoremGenerator" },
  { slug: "slug-generator", category: "开发工具", badge: "", title: "URL Slug生成器", description: "在线URL Slug生成工具，将文章标题转换为规范的URL路径片段，支持连字符和下划线分隔，SEO友好链接必备。", keywords: ["url slug", "slug生成", "seo链接", "url规范化"], intro: "将文章标题转换为小写、去特殊字符、统一分隔符的 URL Slug，生成对搜索引擎友好的规范链接。", faq: [{ q: "好的 URL Slug 是什么样的？", a: "简短（3-5个单词）、全小写、用连字符分隔、包含关键词且无冗余停用词，例如 how-to-learn-javascript。" }], component: "SlugGenerator" },
  { slug: "hash-generator", category: "加密安全", badge: "", title: "SHA哈希计算器", description: "在线SHA哈希计算工具，支持SHA-1/256/384/512算法，输入文本即时计算哈希值，基于Web Crypto本地运算。", keywords: ["sha256在线", "哈希计算", "hash计算器", "sha512"], intro: "输入文本一次性计算 SHA-1、SHA-256、SHA-384、SHA-512 四种哈希值，基于浏览器原生 Web Crypto API，点击结果复制。", faq: [{ q: "SHA-256 可以解密还原吗？", a: "不能。哈希是单向函数，无法从哈希值反推原文，因此常用于密码存储和数据完整性校验。" }, { q: "MD5 呢？", a: "MD5 已存在碰撞漏洞，不建议用于安全场景，故本工具未提供。校验文件完整性请使用 SHA-256。" }], component: "HashGenerator" },
  { slug: "text-encrypt", category: "加密安全", badge: "", title: "文本加密解密", description: "在线AES-256-GCM文本加密解密工具，PBKDF2密钥派生，军事级加密算法，浏览器本地运算密码不上传。", keywords: ["文本加密", "aes加密", "在线加密解密", "aes-gcm"], intro: "使用 AES-256-GCM 算法加密敏感文本，输入密码即可解密还原。密钥经 PBKDF2 十万次迭代派生，安全性极高。", faq: [{ q: "忘记密码能找回吗？", a: "绝对不能。AES 加密没有后门，密码就是唯一钥匙，请务必妥善保管。" }, { q: "和 Base64 编码有什么区别？", a: "Base64 任何人都能解码，仅是编码格式；AES 加密必须持有密码才能还原，是真正的加密。" }], component: "TextEncrypt" },
  { slug: "text-cleaner", category: "文本处理", badge: "", title: "文本清理工具", description: "在线文本清理工具，一键去除多余空格、空行、首尾空白，支持全角转半角，复制网页文字排版修复必备。", keywords: ["文本清理", "去空格", "去空行", "全角转半角"], intro: "从网页复制的文字常有杂乱空格和空行，一键清理多余空白字符，还支持中文全角符号转半角，恢复整洁排版。", faq: [{ q: "全角转半角是什么意思？", a: "将全角字符（如１２３ＡＢＣ，占两个字符宽）转换为半角（123ABC），常用于处理从PDF或旧系统复制的数据。" }], component: "TextCleaner" },
  { slug: "line-prefix", category: "文本处理", badge: "", title: "行首尾批量添加工具", description: "在线批量给每行文本添加前缀后缀和序号，快速生成列表、引号包裹、代码拼接格式，支持实时预览。", keywords: ["批量添加前缀", "文本加序号", "行处理", "批量包裹"], intro: "为每行文本批量添加自定义前缀和后缀，可选自动编号，快速完成加引号、加逗号、生成有序列表等操作。", faq: [{ q: "如何快速给每行加双引号和逗号？", a: "前缀填英文双引号 \"，后缀填 \",，点击处理即可得到 \"内容\", 格式，常用于构造SQL IN条件或数组字面量。" }], component: "LinePrefix" },
  { slug: "text-diff", category: "文本处理", badge: "", title: "文本对比工具", description: "在线文本差异对比工具，逐行对比两段文本，红色标注删除行、绿色标注新增行，基于LCS算法精准对比。", keywords: ["文本对比", "diff在线", "文件比较", "差异对比"], intro: "粘贴两份文本，基于最长公共子序列（LCS）算法逐行对比，红色为删除行、绿色为新增行，快速定位修改内容。", faq: [{ q: "能对比代码文件吗？", a: "可以，纯文本内容均可对比。建议单次对比控制在2000行以内以获得流畅体验。" }], component: "TextDiff" },
  { slug: "random-picker", category: "生活实用", badge: "", title: "随机抽取工具", description: "在线随机抽取/点名工具，粘贴名单一键抽取指定人数，滚动动画效果，课堂点名、活动抽奖必备。", keywords: ["随机抽取", "在线点名器", "抽奖工具", "随机选择"], intro: "粘贴名单（每行一个），设置抽取人数，点击开始即可随机抽出幸运者，带滚动动画效果，公平公正。", faq: [{ q: "抽取结果会重复吗？", a: "不会。同一次抽取中被选中的人会从候选池移除，保证每人最多被抽中一次。" }], component: "RandomPicker" },
  { slug: "image-compressor", category: "图片工具", badge: "HOT", title: "图片压缩工具", description: "免费在线图片压缩工具，自定义质量压缩JPG/PNG/WebP，实时预览压缩前后大小对比，本地处理图片不上传。", keywords: ["图片压缩", "在线压缩图片", "图片变小", "jpg压缩"], intro: "上传图片后拖动质量滑块，实时预览压缩效果和体积对比，最高可节省90%体积，图片全程本地处理不经过服务器。", faq: [{ q: "压缩会损坏图片吗？", a: "采用有损压缩，质量70%左右通常肉眼几乎无差异。追求画质可选90%，追求体积可选50%。" }, { q: "有大小和数量限制吗？", a: "无数量限制，建议单张图片在20MB以内。所有处理在浏览器完成，大图处理速度取决于设备性能。" }], component: "ImageCompressor" },
  { slug: "image-resize", category: "图片工具", badge: "", title: "图片尺寸调整", description: "在线修改图片尺寸工具，自定义宽高或锁定比例等比缩放，实时预览，头像、配图调整必备。", keywords: ["图片改尺寸", "图片缩放", "修改图片大小", "resize image"], intro: "上传图片后输入目标宽高，默认锁定比例等比缩放，避免拉伸变形，一键生成并下载调整后的图片。", faq: [{ q: "放大图片会模糊吗？", a: "会。位图放大超过原始尺寸会损失清晰度，建议只做缩小或不超过原尺寸120%的轻微放大。" }], component: "ImageResize" },
  { slug: "image-format", category: "图片工具", badge: "", title: "图片格式转换", description: "在线图片格式转换工具，JPG/PNG/WebP三种格式互转，一次转换同时输出，WebP压缩率更高。", keywords: ["图片格式转换", "png转jpg", "webp转换", "图片转格式"], intro: "上传图片一键同时输出 JPG、PNG、WebP 三种格式供下载。WebP 通常比 JPG 小 25-35%，推荐网站使用。", faq: [{ q: "PNG 转 JPG 透明背景去哪了？", a: "JPG 不支持透明，透明区域会自动填充为白色。需要保留透明请选择 PNG 格式。" }], component: "ImageFormat" },
  { slug: "favicon-generator", category: "图片工具", badge: "", title: "Favicon图标生成", description: "在线Favicon网站图标生成器，上传图片自动居中裁剪生成16/32/48/64px多尺寸PNG图标。", keywords: ["favicon生成", "网站图标", "ico图标制作", "favicon在线生成"], intro: "上传任意图片，自动居中裁剪为正方形并生成 16/32/48/64px 四种尺寸的网站图标，下载后放置网站根目录即可。", faq: [{ q: "Favicon 建议用什么尺寸？", a: "现代浏览器推荐 32×32 PNG 或 48×48 ICO。准备一张 512×512 以上的正方形原图可获得最佳效果。" }], component: "FaviconGenerator" },
  { slug: "color-palette", category: "图片工具", badge: "", title: "图片取色工具", description: "在线提取图片主色调工具，分析图片出现频率最高的8种颜色，点击复制HEX色值，配色参考必备。", keywords: ["图片取色", "提取主色", "配色工具", "图片颜色提取"], intro: "上传图片自动分析像素分布，提取出现频率最高的 8 种主色调，点击色块即可复制 HEX 值用于设计配色。", faq: [{ q: "提取的颜色可以商用吗？", a: "颜色本身不受版权保护，可放心使用。但请注意图片素材本身可能有版权。" }], component: "ColorPalette" },
  { slug: "box-shadow", category: "CSS样式", badge: "", title: "Box Shadow阴影生成器", description: "在线CSS阴影生成器，可视化调节偏移、模糊、扩散、颜色和不透明度，实时预览一键复制CSS代码。", keywords: ["box shadow", "css阴影", "阴影生成器", "boxshadow在线"], intro: "拖动滑块实时调节 X/Y 偏移、模糊半径、扩散距离、颜色和不透明度，支持内阴影，所见即所得预览并复制CSS。", faq: [{ q: "为什么我的阴影看起来很脏？", a: "多数情况是不透明度过高或模糊不足。建议低不透明度（0.1-0.3）配大模糊值，更接近自然光照效果。" }], component: "BoxShadow" },
  { slug: "border-radius", category: "CSS样式", badge: "", title: "圆角生成器", description: "在线CSS圆角生成器，统一或四角独立调节圆角半径，实时预览效果一键复制代码。", keywords: ["border radius", "css圆角", "圆角生成器", "圆角代码"], intro: "拖动滑块调节圆角半径，支持四角统一或分别设置，实时预览效果，一键复制 border-radius CSS代码。", faq: [{ q: "如何做圆形头像？", a: "将元素设为正方形并设置 border-radius: 50%，即可得到完美圆形。" }], component: "BorderRadius" },
  { slug: "css-gradient", category: "CSS样式", badge: "", title: "CSS渐变生成器", description: "在线CSS渐变色生成器，双色调色板加角度调节，实时预览linear-gradient效果并复制代码。", keywords: ["css渐变", "渐变色生成", "linear-gradient", "渐变代码"], intro: "选择起止颜色、调节渐变角度，实时预览 linear-gradient 效果，一键复制可直接使用的CSS代码。", faq: [{ q: "渐变可以用在文字上吗？", a: "可以。配合 background-clip: text 和 color: transparent 即可实现渐变文字，本站标题就是这种效果。" }], component: "CssGradient" },
  { slug: "calculator", category: "生活实用", badge: "", title: "在线计算器", description: "免费在线计算器，支持加减乘除、括号嵌套、百分比运算，键盘输入与按钮操作双支持。", keywords: ["在线计算器", "科学计算", "网页计算器", "calculator"], intro: "支持加减乘除、括号嵌套和百分比运算，可点击按钮或直接键盘输入，回车键计算，Esc清空。", faq: [{ q: "百分比怎么算？", a: "直接输入如 200*10%，会自动按 200*0.1 计算，结果为 20。" }], component: "Calculator" },
  { slug: "unit-converter", category: "生活实用", badge: "", title: "单位转换器", description: "在线单位换算工具，支持长度、重量、面积、容积、速度、温度六大类常用单位互转，含市制单位。", keywords: ["单位换算", "长度单位转换", "公斤磅换算", "单位转换器"], intro: "覆盖长度、重量、面积、容积、速度、温度六大类常用单位，支持英尺、英寸、磅、盎司、亩、斤两等中外单位互转。", faq: [{ q: "一亩等于多少平方米？", a: "1亩 ≈ 666.67平方米，1公顷 = 15亩。在面积分类中可直接换算。" }], component: "UnitConverter" },
  { slug: "age-calculator", category: "生活实用", badge: "", title: "年龄计算器", description: "在线年龄计算器，精确到年月日计算年龄，显示总天数、距下次生日天数、生肖星座。", keywords: ["年龄计算", "生日计算", "属相星座查询", "年龄查询"], intro: "输入出生日期，精确计算到年/月/日的年龄，显示累计生活天数、距下次生日天数，并推算生肖和星座。", faq: [{ q: "年龄是怎么计算的？", a: "按日历精确计算：先算整年，再算剩余整月，最后算剩余天数，与户口登记口径一致。" }], component: "AgeCalculator" },
  { slug: "date-diff", category: "生活实用", badge: "", title: "日期间隔计算", description: "在线日期计算工具，计算两个日期相差天数、日期加减N天推算，项目排期、倒计时计算必备。", keywords: ["日期计算", "天数计算", "日期加减", "倒计时天数"], intro: "计算两个日期之间相差多少天，或从指定日期加减N天推算目标日期和星期，项目排期、纪念日倒计时必备。", faq: [{ q: "计算结果包含首尾两天吗？", a: "采用标准口径：同一天为0天，如3月1日到3月10日为9天，即结束日期减开始日期。" }], component: "DateDiff" },
  { slug: "random-number", category: "生活实用", badge: "", title: "随机数生成器", description: "在线随机数生成工具，自定义范围和数量批量生成，支持不重复模式，抽奖、抽样、测试数据必备。", keywords: ["随机数生成", "随机数在线", "抽签工具", "random number"], intro: "设定最小值、最大值和生成数量，一键批量生成随机数，可选不重复模式，适合抽奖、分组、抽样场景。", faq: [{ q: "随机数是真随机吗？", a: "基于浏览器伪随机数生成器，均匀性和不可预测性满足抽奖、抽样等日常场景，不建议用于密码学用途。" }], component: "RandomNumber" },
  { slug: "amount-uppercase", category: "生活实用", badge: "", title: "人民币大写转换", description: "在线人民币金额大写转换工具，符合财务规范的汉字大写（壹贰叁肆…），合同发票报销单据必备。", keywords: ["人民币大写", "金额大写转换", "财务大写", "数字大写"], intro: "输入阿拉伯数字金额，即时转换为符合财务规范的中文大写（壹贰叁肆伍陆柒捌玖），精确到分，用于合同、发票、支票。", faq: [{ q: "为什么财务票据必须用大写？", a: "汉字大写笔画复杂难以涂改，可有效防止篡改金额，是中国财务制度的强制要求。" }], component: "AmountUpper" },
  { slug: "mortgage-calculator", category: "生活实用", badge: "HOT", title: "房贷计算器", description: "在线房贷计算器，支持等额本息和等额本金两种还款方式对比，月供、利息总额一目了然。", keywords: ["房贷计算", "等额本息", "月供计算", "房贷利率"], intro: "输入贷款金额、年利率和年限，同时计算等额本息与等额本金两种方式的月供、还款总额和利息，帮助选择合适方案。", faq: [{ q: "等额本息和等额本金怎么选？", a: "等额本息每月还款固定、前期压力小、总利息较多；等额本金前期还款多但总利息少。收入稳定选前者，前期资金充裕选后者。" }, { q: "计算结果准确吗？", a: "采用银行标准公式计算，结果与银行核算基本一致，实际以银行审批为准（可能涉及利率折扣、还款日等因素）。" }], component: "Mortgage" },
 {
 slug: "json-escape",
 category: "开发工具",
 badge: "",
 title: "JSON转义工具",
 description:
   "在线JSON转义与去转义工具，将含换行、引号的文本转换为JSON字符串格式，或还原被转义的JSON字符串，开发调试必备。",
 keywords: ["json转义", "json字符串", "转义还原", "json escape"],
 intro:
   "将包含换行、引号等特殊字符的文本一键转义为合法的 JSON 字符串（可嵌入代码或配置），或把被转义的 JSON 字符串还原为原始可读内容。",
 faq: [
   {
     q: "为什么文本需要 JSON 转义？",
     a: "JSON 要求字符串内的双引号、反斜杠、换行等特殊字符必须转义，否则无法被解析器正确识别。转义后可安全嵌入 JSON 数据结构。",
   },
   {
     q: "去转义报错怎么办？",
     a: "请确认输入是一个完整的 JSON 字符串。若内容是对象或数组（非字符串），工具会按 JSON 整体解析并美化展示。",
   },
 ],
 component: "JsonEscape",
 },
 {
 slug: "countdown-timer",
 category: "生活实用",
 badge: "",
 title: "倒计时器",
 description:
   "在线倒计时器，自定义分钟和秒数，实时显示剩余时间和进度条，时间到提醒，番茄工作法、考试计时、煮饭计时必备。",
 keywords: ["倒计时器", "计时器", "番茄钟", "倒计时在线"],
 intro:
   "设置分钟和秒数，点击开始即进入倒计时，实时显示剩余时间和进度条，时间归零自动提示，适合考试、专注工作、烹饪等场景。",
 faq: [
   {
     q: "倒计时时间到会自动提醒吗？",
     a: "会。倒计时归零后数字变红并显示「时间到！」提示，同时进度条填满，方便你第一时间知晓。",
   },
   {
     q: "可以中途暂停吗？",
     a: "可以。运行中随时可暂停或重置，重置后回到设定的初始时长。",
   },
 ],
 component: "CountdownTimer",
 },
 {
 slug: "stopwatch",
 category: "生活实用",
 badge: "",
 title: "秒表",
 description:
   "在线秒表，精确到百分之一秒，支持启动暂停、计次和重置，记录每圈用时与间隔，跑步、实验测量、游戏竞速必备。",
 keywords: ["秒表", "在线秒表", "计时", "停表"],
 intro:
   "一键启动/暂停，精确显示到百分之一秒，支持「计次」记录每次计时点及与上一圈的间隔，适合体育训练、实验测量等场景。",
 faq: [
   {
     q: "秒表精度是多少？",
     a: "精确到 0.01 秒（百分之一秒），基于浏览器实时时间计算，足以满足日常计时和运动记录需求。",
   },
   {
     q: "计次功能有什么用？",
     a: "可以在不停表的情况下记录多个时间点，例如跑步的每圈用时，并自动计算每圈间隔。",
   },
 ],
 component: "Stopwatch",
 },
 {
 slug: "storage-converter",
 category: "编码转换",
 badge: "",
 title: "存储单位换算",
 description:
   "在线存储容量单位转换工具，bit、B、KB、MB、GB、TB、PB、EB 互转，基于1024进制，程序员查容量换算必备。",
 keywords: ["存储单位换算", "GB TB换算", "容量转换", "KB MB GB"],
 intro:
   "输入数值并选择单位，一键转换出比特、字节、KB、MB、GB、TB、PB、EB 等全部存储单位，采用标准的 1024 进制（1KB=1024B）。",
 faq: [
   {
     q: "为什么 1GB 不是 1000MB？",
     a: "计算机存储采用二进制，1024=2^10，因此 1KB=1024B、1GB=1024MB。硬盘厂商按 1000 进制标称，实际可用容量会略小，这是正常现象。",
   },
   {
     q: "bit 和 Byte 的区别？",
     a: "1 Byte = 8 bit。字节（Byte）是存储容量常用单位，比特（bit）是数据传输速率常用单位（如 100Mbps 宽带）。",
   },
 ],
 component: "StorageConverter",
 },
 {
 slug: "compound-interest",
 category: "生活实用",
 badge: "",
 title: "复利计算器",
 description:
   "在线复利计算器，输入本金、年利率、年限和每月定投，按月复利计算本息合计、累计投入和总收益，理财规划必备。",
 keywords: ["复利计算", "复利计算器", "定投计算", "投资收益计算"],
 intro:
   "输入本金、年利率和投资年限，可选每月定投金额，按复利计算期末本息合计、累计投入本金、总收益和收益率，帮助做长期理财规划。",
 faq: [
   {
     q: "复利和单利的区别？",
     a: "单利只对本金计息，复利对「本金+已产生利息」一并计息，俗称利润滚利。时间越长复利优势越明显，这正是长期定投的价值所在。",
   },
   {
     q: "计算准确吗？",
     a: "按每月复利（月利率=年利率/12）计算，符合常规理财测算。实际收益受市场波动、手续费等因素影响，仅供参考。",
   },
 ],
 component: "CompoundInterest",
 },
 {
 slug: "placeholder-image",
 category: "图片工具",
 badge: "",
 title: "占位图生成器",
 description:
   "在线占位图生成器，自定义尺寸、颜色和文字，生成SVG/PNG占位图，前端设计稿、网页原型、图片占位必备。",
 keywords: ["占位图", "placeholder", "图片占位", "占位图生成"],
 intro:
   "设定宽度、高度、背景色、文字颜色和占位文字，实时预览并下载 SVG 或 PNG 占位图，用于设计稿和网页中原型图片的位置占位。",
 faq: [
   {
     q: "为什么用占位图？",
     a: "在设计网页或排版时，用占位图代替真实图片可以避免图片缺失造成的布局错乱，等图片就绪直接替换即可。",
   },
   {
     q: "SVG 和 PNG 有什么区别？",
     a: "SVG 是矢量图，可无限放大且文件极小，适合网页直接引用；PNG 是位图，用于需要固定像素尺寸的场景。",
   },
 ],
 component: "PlaceholderImage",
 },
 {
 slug: "random-string",
 category: "加密安全",
 badge: "",
 title: "随机字符串生成器",
 description:
   "在线随机字符串生成工具，自定义长度和字符集（大小写/数字/符号），批量生成高强度随机字符串，测试数据、密钥生成必备。",
 keywords: ["随机字符串", "随机密码", "字符串生成", "随机码生成"],
 intro:
   "设定字符串长度、生成数量和字符集（大写字母、小写字母、数字、符号），基于密码学安全随机数批量生成，适合测试数据、临时密钥等场景。",
 faq: [
   {
     q: "生成的随机字符串安全吗？",
     a: "基于浏览器 crypto.getRandomValues 密码学安全随机数生成，不可预测，可用于测试数据、挑战码，也可当作临时密码使用。",
   },
   {
     q: "能生成中文吗？",
     a: "本工具专注于字母、数字和符号字符集。若需含中文的随机内容，建议结合其他工具或业务逻辑处理。",
   },
 ],
 component: "RandomString",
 },
 {
 slug: "ascii-table",
 category: "开发工具",
 badge: "",
 title: "ASCII对照表",
 description:
   "ASCII码速查表，0-127全部字符的十进制、十六进制、二进制和含义对照，支持搜索，程序员查字符编码必备。",
 keywords: ["ascii表", "ascii码", "字符编码", "ascii对照"],
 intro:
   "速查 0-127 全部 ASCII 字符的十进制、十六进制、二进制表示及含义说明，可输入十进制数、十六进制、字符或含义关键词快速搜索定位。",
 faq: [
   {
     q: "ASCII 有多少个字符？",
     a: "标准 ASCII 为 7 位编码，共 128 个（0-127），包含 33 个控制字符和 95 个可打印字符。扩展 ASCII（128-255）因编码标准不一本站未收录。",
   },
   {
     q: "换行符的 ASCII 码是多少？",
     a: "LF（换行）为 10 十进制、0A 十六进制；CR（回车）为 13 十进制、0D 十六进制。Windows 换行用 CRLF 两个字符表示。",
   },
 ],
 component: "AsciiTable",
 },
 {
 slug: "pdf-merge",
 category: "PDF工具",
 badge: "HOT",
 title: "PDF合并工具",
 description:
   "在线PDF合并工具，多个PDF文件按顺序合并成一个，纯浏览器本地处理不上传，一键合并下载。",
 keywords: ["pdf合并", "pdf拼接", "pdf合并工具", "多个pdf合并"],
 intro:
   "选择多个 PDF 文件，按你选择的顺序合并为一个完整的 PDF。处理在浏览器本地完成，文件不会上传，安全可靠。",
 faq: [
   {
     q: "合并后会改变原有内容和排版吗？",
     a: "不会。按页保留原始内容与排版，仅把各文件的页面依次拼接，不涉及任何重新排版。",
   },
   {
     q: "支持多少文件？",
     a: "无固定上限，建议单次合并 20 个文件以内，文件过大时浏览器内存压力升高，处理速度取决于设备性能。",
   },
 ],
 component: "PdfMerge",
 },
 {
 slug: "pdf-extract-pages",
 category: "PDF工具",
 badge: "",
 title: "PDF提取页面",
 description:
   "在线PDF提取指定页面工具，输入页范围如1-3,5一键提取为新PDF，本地处理不上传。",
 keywords: ["pdf提取页面", "提取pdf页", "pdf抽取", "pdf页面提取"],
 intro:
   "输入要提取的页码范围（如 1-3,5），从原 PDF 中提取这些页面生成新文件。全程浏览器本地处理，不上传。",
 faq: [
   {
     q: "页范围怎么填写？",
     a: "用逗号分隔每个页码或连续段，例如 1-3,5,8-10。页码从 1 开始计数。",
   },
   {
     q: "提取后原文件会被修改吗？",
     a: "不会。原文件保持不变，提取结果是生成的一个新 PDF。",
   },
 ],
 component: "PdfExtract",
 },
 {
 slug: "pdf-delete-pages",
 category: "PDF工具",
 badge: "",
 title: "PDF删除页面",
 description:
   "在线PDF删除页面工具，输入要删除的页范围一键移除多余页面，本地处理快速高效。",
 keywords: ["pdf删除页面", "去掉pdf页", "pdf删页", "删除pdf空白页"],
 intro:
   "输入要删除的页码范围（如 2-4），一次性移除指定页面，保留其余页面生成新 PDF，用于清除空白页或多余页。",
 faq: [
   {
     q: "能删除多段页面吗？",
     a: "可以，用逗号分隔多段，如 1-2,5,8-10。删除后的剩余页面会按原顺序保留。",
   },
   {
     q: "误删了怎么办？",
     a: "工具只生成新的文件，不修改原文件，误操作时重新选择原文件即可再次提取。",
   },
 ],
 component: "PdfDelete",
 },
 {
 slug: "pdf-reorder",
 category: "PDF工具",
 badge: "",
 title: "PDF页面排序",
 description:
   "在线PDF页面排序工具，输入新顺序如3,1,2一键重排页面，本地处理不上传。",
 keywords: ["pdf排序", "pdf页面重排", "调整pdf顺序", "pdf页码顺序"],
 intro:
   "输入新的页面顺序（用逗号分隔页码，如 3,1,2 表示把第3页放最前），重新排列 PDF 页面顺序并生成新文件。",
 faq: [
   {
     q: "需要把所有页码都填进去吗？",
     a: "建议填全所有页码以得到完整的新顺序；若只填部分页，则仅输出这些页面的新 PDF。",
   },
   {
     q: "排序会改动页面内容吗？",
     a: "不会，仅改变页面先后顺序，每页内容保持原样。",
   },
 ],
 component: "PdfReorder",
 },
 {
 slug: "pdf-rotate",
 category: "PDF工具",
 badge: "",
 title: "PDF旋转页面",
 description:
   "在线PDF旋转页面工具，90/180/270度旋转全部或指定页面，修复倒置侧翻的扫描PDF。",
 keywords: ["pdf旋转", "旋转pdf", "pdf页面翻转", "pdf转正"],
 intro:
   "选择旋转角度（90/180/270度），可旋转全部页面或仅指定范围，用于修复扫描件方向错误的问题。",
 faq: [
   {
     q: "可以只旋转部分页面吗？",
     a: "可以。在「页范围」中输入要旋转的页，留空则作用于全部页面。",
   },
   {
     q: "一次旋转会叠加吗？",
     a: "每次操作在当前旋转角度的基础上累加，例如先转90再转90相当于转180度。",
   },
 ],
 component: "PdfRotate",
 },
 {
 slug: "pdf-encrypt",
 category: "PDF工具",
 badge: "",
 title: "PDF加密工具",
 description:
   "在线PDF加密工具，设置打开密码保护PDF文件，AES-128加密，浏览器本地处理密码不上传。",
 keywords: ["pdf加密", "pdf加密码", "pdf设置密码", "pdf上锁"],
 intro:
   "为 PDF 文件设置打开密码，加密后需输入密码才能查看。采用 PDF 标准 AES-128 加密，过程在浏览器本地完成。",
 faq: [
   {
     q: "忘记密码还能找回吗？",
     a: "不能。加密没有后门，密码是唯一的钥匙，请务必妥善保管。",
   },
   {
     q: "加密会影响文件内容吗？",
     a: "不会。仅是增加访问权限保护，文件内容和排版保持不变。",
   },
 ],
 component: "PdfEncrypt",
 },
 {
 slug: "pdf-decrypt",
 category: "PDF工具",
 badge: "",
 title: "PDF解密工具",
 description:
   "在线PDF解密工具，输入密码去除PDF打开密码限制，本地处理不上传。",
 keywords: ["pdf解密", "pdf去密码", "清除pdf密码", "破解pdf保护"],
 intro:
   "输入加密 PDF 的打开密码，生成一份无密码保护的新文件，方便分享和使用。仅支持标准 PDF 密码加密。",
 faq: [
   {
     q: "能去除任意 PDF 的密码吗？",
     a: "需持有正确的打开密码。工具利用密码解密，不是暴力破解，输入错误会提示失败。",
   },
   {
     q: "解密后原文件还在吗？",
     a: "原文件保持不变，解密结果是新生成的无密码文件。",
   },
 ],
 component: "PdfDecrypt",
 },
 {
 slug: "pdf-metadata",
 category: "PDF工具",
 badge: "",
 title: "PDF元数据编辑",
 description:
   "在线PDF元数据编辑工具，设置PDF标题、作者、主题、关键词，完善文件信息本地处理。",
 keywords: ["pdf元数据", "pdf标题", "pdf作者", "pdf属性编辑"],
 intro:
   "编辑 PDF 文件的标题、作者、主题等元数据信息，有助于文件整理和搜索，全程浏览器本地处理。",
 faq: [
   {
     q: "元数据有什么用？",
     a: "标题、作者等元数据会显示在阅读器的文档信息中，便于识别文件来源和内容，也能帮助文档管理系统检索。",
   },
   {
     q: "留空会怎样？",
     a: "留空的字段会写入空值。若只想查看信息，直接下载即可。",
   },
 ],
 component: "PdfMetadata",
 },
 {
 slug: "pdf-crop",
 category: "PDF工具",
 badge: "",
 title: "PDF裁剪边距",
 description:
   "在线PDF裁剪边距工具，按百分比裁掉四周多余空白，优化页面显示区域，本地处理。",
 keywords: ["pdf裁剪", "裁剪pdf边距", "pdf留白", "pdf去白边"],
 intro:
   "按百分比从四周裁剪 PDF 每页的边距（不影响页面内容，仅缩小可见显示区域），适合去除扫描件多余白边。",
 faq: [
   {
     q: "会裁剪掉内容吗？",
     a: "不会删除内容，只是缩小每页的可见范围（crop box），被裁掉的部分仍在 PDF 中，只是不显示。",
   },
   {
     q: "最大能裁多少？",
     a: "每边最多可裁剪 45%，四边同比例，避免把内容裁掉。",
   },
 ],
 component: "PdfCrop",
 },
 {
 slug: "image-to-pdf",
 category: "PDF工具",
 badge: "HOT",
 title: "图片转PDF",
 description:
   "在线图片转PDF工具，PNG/JPG/WebP图片一键转PDF，每张一页，本地处理不上传。",
 keywords: ["图片转pdf", "照片转pdf", "图片合成pdf", "jpg转pdf"],
 intro:
   "选择多张图片（PNG/JPG/WebP），每张图片单独一页生成 PDF，页面尺寸与图片一致，用于证件扫描、照片归档。",
 faq: [
   {
     q: "图片会压缩或变糊吗？",
     a: "不会，图片按原始分辨率嵌入，画质保持原样。",
   },
   {
     q: "支持哪些格式？",
     a: "支持 PNG、JPG、JPEG 和 WebP 格式。",
   },
 ],
 component: "ImageToPdf",
 },
 {
 slug: "pdf-watermark",
 category: "PDF工具",
 badge: "",
 title: "PDF添加水印",
 description:
   "在线PDF添加水印工具，每页居中添加半透明斜向水印文字，保护文档版权本地处理。",
 keywords: ["pdf水印", "pdf加水印", "pdf防伪", "pdf水印文字"],
 intro:
   "为 PDF 每页居中添加半透明斜向文字水印，常用于标注机密、版权归属，保护文档不被随意转发。",
 faq: [
   {
     q: "为什么中文水印可能不显示？",
     a: "工具使用 PDF 标准内置字体，仅支持英文和数字。需要中文水印建议先在别处生成图片再作为普通水印。",
   },
   {
     q: "水印会影响正文吗？",
     a: "水印为浅灰半透明，叠加在内容之上但透明度较高，通常不影响阅读正文。",
   },
 ],
 component: "PdfWatermark",
 },
 {
 slug: "pdf-page-numbers",
 category: "PDF工具",
 badge: "",
 title: "PDF添加页码",
 description:
   "在线PDF添加页码工具，在每页底部居中添加页码，可设置起始页码，本地处理。",
 keywords: ["pdf页码", "pdf加页码", "pdf页数", "pdf插入页码"],
 intro:
   "在 PDF 每页底部居中添加页码，可设置起始数字，适合打印、归档时标注页数。操作在浏览器本地完成。",
 faq: [
   {
     q: "页码从哪一页开始？",
     a: "默认从第 1 页开始递增，你可以在「起始页码」里设置一个更大的起始数字。",
   },
   {
     q: "会改变内容吗？",
     a: "不会，页码作为叠加文字绘制在每页底部，原有内容保持不变。",
   },
 ],
 component: "PdfPageNumbers",
 },
 ];
