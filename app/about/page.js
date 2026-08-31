import { SITE, tools } from "../../lib/tools";

export const metadata = {
  title: "关于本站",
  description: `了解${SITE.name}的工具原则、内容标准与运营方式。`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="legal-page">
      <span className="legal-kicker">ABOUT</span>
      <h1>关于{SITE.name}</h1>
      <p className="legal-lead">
        {SITE.name}是一个面向开发者、运营人员、学生和普通用户的浏览器端工具站。
        当前提供{tools.length}款中文工具，并持续建设英文实用工具。
      </p>

      <section>
        <h2>我们坚持的原则</h2>
        <ul>
          <li><strong>先把功能做实。</strong> 页面承诺的转换、计算或处理能力必须真实可用。</li>
          <li><strong>工具输入本地处理。</strong> 文本和文件尽可能仅在浏览器中完成运算，不作为工具数据上传。</li>
          <li><strong>解释计算边界。</strong> 涉及金融、健康或政策的工具会说明假设和局限，不替代专业建议。</li>
          <li><strong>广告不妨碍使用。</strong> 广告启用后也不会伪装成按钮、结果或下载链接。</li>
        </ul>
      </section>

      <section>
        <h2>站点与内容</h2>
        <p>
          每个工具页由可操作的功能、使用说明、示例和常见问题组成。我们不会为了搜索排名批量发布
          没有实际功能或重复拼接的页面。发现错误时，欢迎通过联系方式反馈。
        </p>
      </section>

      <section className="legal-callout">
        <h2>联系站长</h2>
        <p>功能建议、问题反馈与商务合作：<a href="mailto:zhangf845@gmail.com">zhangf845@gmail.com</a></p>
      </section>
    </article>
  );
}
