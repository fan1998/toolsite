# Google AdSense 上线清单

本站已经具备广告脚本开关、隐私政策、使用条款、关于页和联系方式。没有真实广告参数时，页面不会加载 AdSense，也不会显示伪造广告位。

## 1. 先完成 AdSense 账户准备

1. 在 Google AdSense 中添加 `https://www.fanjian.org`。
2. 完成站点所有权、身份、税务与收款资料验证。
3. 在 AdSense 的“隐私权和消息”中配置适用于访客地区的同意管理消息。

这些账户步骤必须由站长本人完成，不应把登录密码、验证码或支付资料交给代码仓库或第三方。

## 2. 在 Vercel 配置公开广告参数

为 Production 环境添加：

```text
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-你的发布商编号
NEXT_PUBLIC_ADSENSE_SLOT_ID=你的广告单元编号
```

保存后重新部署。两个变量必须同时存在，工具页中的广告单元才会显示。发布商编号与广告单元编号会公开出现在网页源代码中，不属于密码，但仍须保证填写准确。

## 3. 添加真实 ads.txt

从 AdSense 后台复制 Google 给出的完整 `ads.txt` 记录，保存为 `public/ads.txt`，再部署并检查：

```text
https://www.fanjian.org/ads.txt
```

不要使用示例发布商编号，也不要在账户尚未分配记录时创建假的 `ads.txt`。

## 4. 发布后检查

- 打开首页、英文工具页、隐私政策和使用条款，确认没有遮挡内容或误触布局。
- 在浏览器开发者工具中确认 `pagead2.googlesyndication.com` 只在配置变量后加载。
- 在 Google Search Console 重新提交 `https://www.fanjian.org/sitemap.xml`。
- 先观察自然搜索展示、点击率、页面停留与广告政策中心，不承诺固定收入。

## 5. 当前广告位置策略

广告位只出现在英文工具正文之后，不插在输入框、结果按钮或下载按钮旁边。这样牺牲一部分短期展示量，换取更低的误触与政策风险。后续应以真实流量和页面体验数据决定是否增加位置。
