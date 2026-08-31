export const metadata = {
  title: "使用条款",
  description: "凡间工具箱使用条款：服务性质、用户责任、结果校验、知识产权和责任限制。",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <article className="legal-page">
      <span className="legal-kicker">TERMS</span>
      <h1>使用条款</h1>
      <p className="legal-meta">更新日期：2026年8月31日</p>
      <p className="legal-lead">访问或使用本站即表示你理解以下规则。若不同意，请停止使用。</p>

      <section>
        <h2>1. 工具性质</h2>
        <p>
          本站提供免费通用计算、转换和文件处理工具。结果主要用于辅助判断，不构成法律、医疗、税务、投资、贷款或其他专业建议。
          涉及重要决定时，请核对原始资料并咨询具备资格的专业人士。
        </p>
      </section>

      <section>
        <h2>2. 用户责任</h2>
        <p>
          你应确保有权处理所输入的内容，不得利用本站侵犯他人隐私、知识产权，或从事违法、攻击、欺诈和滥用行为。
          请在关闭页面前自行保存重要结果。
        </p>
      </section>

      <section>
        <h2>3. 准确性与可用性</h2>
        <p>
          我们努力保持功能正确，但无法保证所有设备、输入和场景下均无错误或不中断。政策、利率、税率和外部标准可能变化，
          工具页面标明的假设与更新时间应作为结果的一部分理解。
        </p>
      </section>

      <section>
        <h2>4. 广告与第三方链接</h2>
        <p>
          广告和第三方链接不代表本站对其商品、服务或观点作担保。离开本站后的交易、隐私和安全由对应第三方规则约束。
        </p>
      </section>

      <section>
        <h2>5. 内容与变更</h2>
        <p>
          站点原创页面结构、说明文字和品牌元素受适用法律保护；第三方库和开源组件遵循各自许可证。
          我们可能调整、增加或停止部分工具，并在需要时更新本条款。
        </p>
      </section>

      <section className="legal-callout">
        <h2>问题与通知</h2>
        <p>请联系 <a href="mailto:zhangf845@gmail.com">zhangf845@gmail.com</a>。</p>
      </section>
    </article>
  );
}
