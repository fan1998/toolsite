export const metadata = {
  title: "联系方式",
  description: "联系凡间工具箱：提交工具建议、错误反馈、版权与商务合作信息。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <article className="legal-page contact-page">
      <span className="legal-kicker">CONTACT</span>
      <h1>联系我们</h1>
      <p className="legal-lead">请尽量写清工具名称、页面地址、输入示例和期望结果，我们会更快定位问题。</p>

      <div className="contact-grid">
        <section>
          <span>功能与错误反馈</span>
          <h2>工具不好用？</h2>
          <p>附上可复现的输入示例。请勿发送身份证号、密码、密钥或未公开业务数据。</p>
          <a href="mailto:zhangf845@gmail.com?subject=%E5%87%A1%E9%97%B4%E5%B7%A5%E5%85%B7%E7%AE%B1%E9%97%AE%E9%A2%98%E5%8F%8D%E9%A6%88">发送问题反馈 →</a>
        </section>
        <section>
          <span>版权与商务</span>
          <h2>需要联系站长？</h2>
          <p>请在邮件主题注明“版权”“广告”或“合作”，并提供可核验的身份与事项说明。</p>
          <a href="mailto:zhangf845@gmail.com">zhangf845@gmail.com →</a>
        </section>
      </div>

      <section className="legal-callout">
        <h2>响应说明</h2>
        <p>邮件通常在工作日处理。本站不通过邮件索取密码、验证码或远程控制权限。</p>
      </section>
    </article>
  );
}
