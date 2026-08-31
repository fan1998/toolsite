export const metadata = {
  title: "隐私政策",
  description: "凡间工具箱隐私政策：工具输入、本地处理、日志、Cookie、广告与用户权利说明。",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="legal-page">
      <span className="legal-kicker">PRIVACY</span>
      <h1>隐私政策</h1>
      <p className="legal-meta">更新日期：2026年8月31日</p>
      <p className="legal-lead">
        本政策说明凡间工具箱如何处理站点访问数据。核心原则是：工具内输入的文本和文件尽可能在你的浏览器中处理，
        不作为工具数据上传到我们的服务器。
      </p>

      <section>
        <h2>1. 工具输入</h2>
        <p>
          JSON、文本、图片、PDF 等工具在页面中标注“本地处理”时，处理过程在浏览器内完成。
          请仍避免向任何网页粘贴密码、私钥、访问令牌、完整身份证件或未经授权的机密资料。
        </p>
      </section>

      <section>
        <h2>2. 基础访问数据</h2>
        <p>
          托管与安全服务可能自动记录访问时间、请求页面、浏览器类型、近似网络信息和错误日志，
          用于提供页面、排查故障、防止滥用和保障安全。这些数据不用于还原工具输入内容。
        </p>
      </section>

      <section>
        <h2>3. 广告、Cookie 与同意管理</h2>
        <p>
          当本站启用 Google AdSense 后，Google 及其合作伙伴可能使用 Cookie 或类似技术展示、衡量和改进广告。
          相关处理受 Google 政策约束，详情见
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">Google 如何使用来自合作网站的信息</a>。
        </p>
        <p>
          面向欧洲经济区、英国和瑞士等地区的访客，本站将在启用个性化广告时使用 Google 认可的同意管理平台，
          提供接受、拒绝或管理选择的入口。拒绝非必要用途不影响工具核心功能。
        </p>
      </section>

      <section>
        <h2>4. 本地存储</h2>
        <p>
          收藏、最近使用、编辑草稿等功能可能使用浏览器本地存储。数据保存在你的设备上，可通过站内清除功能或浏览器设置删除。
        </p>
      </section>

      <section>
        <h2>5. 数据分享与保留</h2>
        <p>
          我们不出售工具输入数据。仅在托管、安全、统计或广告服务所必需，或法律要求时，按对应服务条款处理有限访问数据。
          保留时间以实现上述目的所需的最短合理期限为原则。
        </p>
      </section>

      <section>
        <h2>6. 你的选择</h2>
        <p>
          你可以清除本站本地存储、调整浏览器 Cookie 设置、使用广告同意面板修改选择，或停止访问本站。
          与隐私有关的问题可发送至 <a href="mailto:zhangf845@gmail.com">zhangf845@gmail.com</a>。
        </p>
      </section>
    </article>
  );
}
