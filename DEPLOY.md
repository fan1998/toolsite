# 工具站部署与运营清单

你只需要做「账号注册/登录/认证」，其余（写码、改版、加工具）全部由 AI 完成。

## 一、你要办的账号（一次性，约1小时）

| 顺序 | 事项 | 费用 | 说明 |
|------|------|------|------|
| 1 | 注册 GitHub 账号 | 免费 | https://github.com 注册后告诉我用户名 |
| 2 | 用 GitHub 登录 Vercel | 免费 | https://vercel.com 授权登录即可 |
| 3 | 买域名 | 约¥50-80/年 | 推荐 Cloudflare 或阿里云注册 .com/.site/.xyz |
| 4 | 域名解析到 Vercel | 免费 | 在 Vercel 项目 Settings→Domains 添加，按提示加一条 CNAME 记录 |
| 5 | Google AdSense（流量起来后再办） | 免费 | https://adsense.google.com 需要站点有内容且可访问，建议上线2-4周后申请 |

## 二、部署步骤

```powershell
# 首次：初始化 git 并推送（需要你有 GitHub 账号）
git init
git add .
git commit -m "init: tool site"
# 在 GitHub 网页上新建仓库 toolsite 后：
git remote add origin https://github.com/<你的用户名>/toolsite.git
git push -u origin main
```

然后两种方式任选：

**方式A（推荐，全自动）**：Vercel 网页 → Add New Project → 导入该仓库 → Deploy。以后每次 `git push` 自动重新部署。

**方式B（命令行）**：
```powershell
npm.cmd i -g vercel
vercel login   # 浏览器授权登录（你来操作）
vercel --prod
```

设置环境变量（Vercel 后台 Settings → Environment Variables）：
- `NEXT_PUBLIC_SITE_URL` = 你的正式域名（影响 sitemap 和 SEO）

## 三、AdSense 接入

拿到 AdSense 客户端 ID（ca-pub-xxxx）后告诉我，我会在 `app/layout.js` 接入脚本，
并把 `components/AdSlot.js` 的占位替换为真实广告单元。

## 四、扩站节奏（我来做）

- 第1个月：现有5个工具 + 每周新增2-3个低竞争工具（如 文本去重、字数统计、Base64编解码、URL编码、UUID生成器）
- 提交 sitemap：https://www.google.com/webmasters （Search Console 认证需要你登录操作）
- 流量目标：单站日均100 UV 起步，20+工具站矩阵后月广告收入 ¥2000-6000

## 五、本地预览

```powershell
npm.cmd run dev     # 开发预览 http://localhost:3000
npm.cmd run build   # 构建，产物在 out/ 目录
```
