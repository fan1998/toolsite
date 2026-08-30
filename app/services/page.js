import "./services.css";

export const metadata = {
  title: "定制开发服务 - 小工具/App/网站/AI自动化，按需报价",
  description:
    "个人独立开发者，提供在线工具站、Flutter 双端 App、AI 自动化流程、桌面软件定制开发。所有案例均为真实交付产品，可在线体验。",
  alternates: { canonical: "/services" },
};

const services = [
  {
    icon: "🌐",
    title: "在线工具站 / 网站搭建",
    desc: "Next.js 静态站、SEO 全配置（Google/Bing/百度3站资源平台）、响应式、浏览器本地计算不传数据。适合工具站、产品官网、落地页。",
    price: "¥300 起",
  },
  {
    icon: "📱",
    title: "Flutter 双端 App",
    desc: "Android + Windows 一套代码，含后端 API、JWT 认证、多端同步、OTA 在线更新（断点续传）。已有完整记账 App 案例。",
    price: "¥1000 起",
  },
  {
    icon: "🤖",
    title: "AI 自动化流程",
    desc: "n8n / 脚本自动化：RSS 摘要推送、Telegram AI 机器人、内容工厂、翻译流。DeepSeek API 接入，可自托管。",
    price: "¥300 起",
  },
  {
    icon: "💻",
    title: "桌面小工具",
    desc: "Electron 桌面应用、系统级工具（如自研输入法 TSF、实时语音翻译字幕）。打包成 exe 直接交付。",
    price: "¥800 起",
  },
  {
    icon: "🖥️",
    title: "自托管服务部署",
    desc: "VPS 上部署网盘/图床/密码管理器/游戏服等，Caddy + Cloudflare 反代加密，Docker 化运维。",
    price: "¥200 起",
  },
  {
    icon: "🎯",
    title: "需求不明？来聊",
    desc: "一个想法、一条需求描述都可以。先免费评估可行性、给方案和报价，不合适不收钱。",
    price: "免费评估",
  },
];

const cases = [
  {
    title: "凡间工具箱（76 款工具）",
    tag: "在线工具站",
    desc: "76 款免费在线工具（JSON 格式化、时间戳、二维码、PDF、图片处理、正则等），纯浏览器本地计算，数据零上传，SEO 已接入 Google/Bing/百度三大站长平台。",
    stack: "Next.js 14 · React 18 · GitHub + Vercel CI",
    link: "https://www.fanjian.org",
    linkText: "在线体验 →",
  },
  {
    title: "跨端记账 App（Android + Windows）",
    tag: "Flutter 双端",
    desc: "支出/收入记账 + 多账户总资产 + 分类预算 + 统计走势图表；一句话/语音 AI 记账（DeepSeek API）；多设备同步 + 离线合并 + 加密备份；OTA 断点续传更新；用户隔离。",
    stack: "Flutter · FastAPI · SQLite · Docker · Caddy",
  },
  {
    title: "实时音视频翻译工具",
    tag: "桌面软件",
    desc: "本地 whisper-large-v3-turbo 语音识别 + DeepSeek 翻译 + 口语化中文字幕，GPU 加速，字幕窗口实时跟随。",
    stack: "Python · faster-whisper · ctranslate2 · DeepSeek API",
  },
  {
    title: "自研中文输入法（M0 已通）",
    tag: "系统级软件",
    desc: "librime 引擎 + 自研 Windows TSF 客户端/服务端，命名管道 IPC，100% 本地零网络，密码框隔离，构建期预编译词库。",
    stack: "C++ · librime · Windows TSF · NDK/JNI（Android 骨架）",
  },
  {
    title: "个人云服务生态",
    tag: "自托管",
    desc: "RackNerd VPS 上 Docker 化部署 Vaultwarden 密码管理、lsky 图床、n8n 工作流、Game Servers，Caddy + Cloudflare 统一反代加密。",
    stack: "Docker · Caddy · Cloudflare · Ubuntu",
  },
];

const steps = [
  { t: "需求沟通", d: "一条消息即可，免费评估可行性与方案" },
  { t: "报价明确", d: "固定总价，不按小时，无隐藏费用" },
  { t: "开发交付", d: "持续可见进度，交付源码 + 部署文档" },
  { t: "售后保障", d: "免费修 bug 一个月，远程部署协助" },
];

const prices = [
  ["在线工具站/落地页", "¥300 - ¥800", "3-5 天"],
  ["Flutter 小 App（含后端）", "¥1000 - ¥3000", "1-3 周"],
  ["n8n/AI 自动化流程", "¥300 - ¥1000", "2-5 天"],
  ["桌面小工具", "¥800 - ¥2000", "1-2 周"],
  ["自托管部署调优", "¥200 - ¥500", "1-2 天"],
];

export default function Services() {
  return (
    <>
      <section className="services-hero">
        <div className="pill-row">
          <span className="pill">个人独立开发者</span>
          <span className="pill">真实案例可验证</span>
          <span className="pill">固定总价</span>
          <span className="pill">交付源码+文档</span>
        </div>
        <h1>
          小成本做<span className="gradient-text">好工具</span>
        </h1>
        <p className="sub">
          你不需要大团队：一个能独立完成全流程的开发，从需求到上线。
          专做小工具、工具站、双端 App、AI 自动化——都是小团队和个人的真实痛点。
        </p>
      </section>

      <section className="svc-section">
        <h2>能为你做什么</h2>
        <div className="svc-grid">
          {services.map((s) => (
            <div key={s.title} className="svc-card">
              <div className="icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="price">{s.price}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="svc-section">
        <h2>真实交付案例（全部为本人独立完成）</h2>
        <div className="svc-grid">
          {cases.map((c) => (
            <div key={c.title} className="case-card">
              <div className="case-head">
                <h3>{c.title}</h3>
                <span className="tag">{c.tag}</span>
              </div>
              <p>{c.desc}</p>
              <div className="stack">{c.stack}</div>
              {c.link && (
                <a className="case-link" href={c.link} target="_blank" rel="noopener noreferrer">
                  {c.linkText}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="svc-section">
        <h2>合作流程</h2>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={s.t} className="step">
              <div className="num">{i + 1}</div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="svc-section">
        <h2>参考价格</h2>
        <table className="price-table">
          <thead>
            <tr>
              <th>项目类型</th>
              <th>参考价</th>
              <th>预计周期</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((p) => (
              <tr key={p[0]}>
                <td>{p[0]}</td>
                <td className="price-col">{p[1]}</td>
                <td>{p[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="cta-box">
        <h2>有一个想法？</h2>
        <p>
          把需求说清楚即可——一句「做个批量重命名工具」就够。先免费出方案，不合适不收费。
        </p>
        <a
          className="cta-btn"
          href="mailto:zhangf845@gmail.com?subject=定制开发咨询"
        >
          立即咨询 →
        </a>
        <div className="cta-note">回复通常在 24 小时内（工作日）</div>
      </div>
    </>
  );
}
