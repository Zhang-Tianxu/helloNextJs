# 使用 Next.js 构建并部署到 GitHub Pages（详细指南）

本指南将带你从零开始使用 Next.js（App Router）构建静态网站，并通过 GitHub Pages 自动部署上线。文档结合以下官方资料与本仓库示例进行实战讲解：

- Next.js 文档（安装与静态导出）：https://nextjs.org/docs/app/getting-started/installation
- GitHub Pages 文档：https://docs.github.com/en/pages
- 本模板仓库（官方示例）：https://github.com/nextjs/deploy-github-pages

> 适用范围：Next.js 15+、App Router、静态导出（`output: 'export'`）。本仓库已配置好静态导出与 `basePath`（通过环境变量），非常适合部署到 GitHub Pages。

---

## 1. 前置条件

- Node.js 18.18 或以上版本（建议 20+）。
- GitHub 账号与一个公开仓库。
- 本地包管理器任选其一：npm、pnpm 或 yarn（本仓库包含 `pnpm-lock.yaml`，推荐 pnpm）。

可选工具：
- Windows PowerShell（本机默认）或其他终端。
- VS Code + TypeScript 插件（更佳的开发体验）。

---

## 2. 获取项目代码

有两种常见方式：

- 直接使用本仓库模板（推荐快速上手）：
  1) 在 GitHub 打开 https://github.com/nextjs/deploy-github-pages
  2) 点击 “Use this template” 创建你自己的仓库
  3) 克隆到本地进行开发

- 使用 create-next-app 全新创建项目（需要手动添加静态导出配置）：
  - 参考官方文档：https://nextjs.org/docs/app/getting-started/installation

> 本仓库已包含以下关键文件：
> - `next.config.ts`：开启静态导出、通过环境变量设置 `basePath`、`trailingSlash: true`
> - `app/`：使用 App Router 的页面目录
> - `package.json`：包含 `dev` 和 `build` 脚本

---

## 3. 安装依赖与本地开发

在项目根目录运行（任选其一）：

```powershell
# 使用 pnpm（推荐）
pnpm install
pnpm dev

# 或使用 npm
npm install
npm run dev

# 或使用 yarn（需本地已安装 yarn）
yarn
yarn dev
```

打开浏览器访问 http://localhost:3000 ，修改 `app/page.tsx` 即可热更新预览效果。

---

## 4. 静态导出配置（已内置）

本仓库的 `next.config.ts`：

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  trailingSlash: true,
}

export default nextConfig
```

- `output: 'export'`：让 `next build` 直接生成纯静态产物到 `out/` 目录。
- `basePath`：通过环境变量控制站点基础路径，方便在 GitHub Pages 的“项目页”场景使用。
- `trailingSlash: true`：在 GitHub Pages 上避免刷新时的 404（目录以斜杠结尾，生成 `index.html`）。

构建静态站点：

```powershell
# pnpm
pnpm build

# npm
npm run build

# yarn
yarn build
```

完成后会生成 `out/` 目录，可本地预览：

```powershell
# 可选：使用任意静态服务器本地预览（示例采用 pnpm）
pnpm dlx serve .\out -l 4173
```

---

## 5. GitHub Pages 的 URL 与 basePath 规则

GitHub Pages 有两种常见发布方式，不同方式的 URL 与 `basePath` 设置不同：

1) 项目页（Project Pages）
   - 访问地址：`https://<用户名>.github.io/<仓库名>/`
   - 必须设置 `PAGES_BASE_PATH` 为 `/<仓库名>`，例如：`/my-repo`

2) 用户/组织主页（User/Org Pages）
   - 访问地址：`https://<用户名>.github.io/`
   - `PAGES_BASE_PATH` 必须为空字符串或不设置（即 `basePath` 为空）

3) 自定义域名（可选）
   - 访问地址：`https://你的域名/`
   - `PAGES_BASE_PATH` 也应为空字符串或不设置（站点位于域名根路径）。

---

## 6. 配置 GitHub Actions 自动部署

GitHub Pages 官方推荐使用 Pages Actions 流水线。新建文件 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Next.js to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch: {}

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9
          run_install: true

      - name: Build static site
        env:
          # 项目页：填写 `/<仓库名>`；用户/组织页或自定义域名：留空即可
          PAGES_BASE_PATH: "/<仓库名>"
        run: pnpm build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

然后在 GitHub 仓库：
- 打开 Settings > Pages > Build and deployment
- Source 选择 GitHub Actions（若未默认启用）
- 推送代码到 `main` 分支，Actions 会自动构建并发布到 Pages

成功后，你将获得：
- 项目页：`https://<用户名>.github.io/<仓库名>/`
- 用户/组织页：`https://<用户名>.github.io/`

---

## 7. 自定义域名（可选）

- 在你的 DNS 服务商添加 CNAME 记录，指向 `<用户名>.github.io`。
- 在仓库 Settings > Pages 中设置自定义域名并启用 HTTPS。
- 建议在项目 `public/` 目录添加 `CNAME` 文件，内容为你的自定义域名（构建时会被复制到 `out/`）。

---

## 8. 常见问题排查（FAQ）

- 刷新后 404 或资源路径 404：
  - 确保 `trailingSlash: true`。
  - 检查是否正确设置 `PAGES_BASE_PATH`（项目页必须为 `/<仓库名>`）。
- 图片或静态资源无法加载：
  - 在代码与链接中以 `/${process.env.PAGES_BASE_PATH || ''}` 为前缀的路径都应自然正确；
  - 推荐优先使用相对路径或借助 `next/link`、`next/image`，它们会考虑 `basePath`。
- 动态功能或服务端特性不可用：
  - 静态导出仅支持纯静态页面；需要服务端渲染/动态 API 的功能不适用于 GitHub Pages。
- Actions 构建失败：
  - 检查 Node 版本（建议 20+）、依赖是否安装成功、环境变量是否正确。
- 页面地址不正确：
  - 项目页访问路径必须包含仓库名：`/<仓库名>/...`。

---

## 9. 与本仓库配置的对照要点

- `next.config.ts` 已启用 `output: 'export'` 与 `trailingSlash: true`，并用 `process.env.PAGES_BASE_PATH` 控制 `basePath`。
- `package.json`：
  - `dev`: `next dev --turbo`
  - `build`: `next build`
- 运行命令：`pnpm dev` / `pnpm build`（或 `npm run dev|build`，`yarn dev|build`）。

---

## 10. 参考文档

- Next.js 安装与基础（App Router）：https://nextjs.org/docs/app/getting-started/installation
- Next.js 静态导出指南：https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- GitHub Pages 文档：https://docs.github.com/en/pages
- 模板仓库（官方示例）：https://github.com/nextjs/deploy-github-pages

> 小贴士：若你计划添加国际化（i18n）、主题、或更多页面，请确保所有路由与静态资源路径都兼容 `basePath`，以便在项目页与自定义域名之间切换时无需改动代码，仅通过环境变量即可完成部署适配。

---

祝你部署顺利，玩得开心！