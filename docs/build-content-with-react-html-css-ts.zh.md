# 使用 React + HTML + CSS + TypeScript 实现网页内容（Next.js 项目实践）

本文档面向本仓库（Next.js App Router + TypeScript）项目，系统介绍如何使用 React、HTML、CSS 与 TypeScript 高质量地实现网页内容。内容涵盖语义化 HTML、组件化设计、样式方案、响应式布局、类型设计、上下文（Context）与国际化、可访问性（a11y）、性能优化与代码组织规范等。

如果你是零基础，请从下面的“快速开始（10 分钟）”开始，跟着一步步操作，复制粘贴代码即可看到效果。

参考资料：
- React 官方文档：https://react.dev/
- HTML 基础（W3Schools）：https://www.w3schools.com/html/
- CSS 基础（W3Schools）：https://www.w3schools.com/css/
- TypeScript 基础（W3Schools）：https://www.w3schools.com/typescript/

---

## 1. 项目结构与入口文件

本仓库采用 App Router：
- `app/layout.tsx`：根布局（全局样式、Provider、通用布局结构）
- `app/page.tsx`：主页页面组件
- `app/papers/page.tsx`：示例子页面
- 全局样式：`app/globals.css`
- 组件：`app/components/*`，采用 CSS Modules
- 上下文（Context）：`app/contexts/LanguageContext.tsx`
- 文案与国际化：`/locales/*.json`

建议：
- 保持每个页面包含少量布局与数据装配逻辑，具体内容用子组件承载。
- 尽量使用服务器组件 + 客户端组件的默认分层；涉及交互或浏览器 API 的组件使用 `'use client'`。

---

## 2. 语义化 HTML 与基础结构

- 优先选择语义化标签：`header`、`nav`、`main`、`section`、`article`、`aside`、`footer`、`h1-h6`、`ul/ol/li` 等。
- 标题层级合理递进：页面入口用一个 `h1`，子区块用 `h2/h3`。
- 使用 `nav` 包裹导航；使用 `main` 表示主内容区域；使用 `footer` 表示页脚。
- 表单、按钮、链接：
  - 跳转用 `<a>` 或 Next.js `Link`；触发行为用 `<button>`。
  - 图片用 `<img>` 或 `next/image`，提供 `alt` 文本。

示例（主页骨架）：
```tsx
// app/page.tsx (服务器组件)
export default function Page() {
  return (
    <main>
      <h1>网站标题</h1>
      <section>
        <h2>最新内容</h2>
        {/* 子组件列表 */}
      </section>
    </main>
  );
}
```

---

## 3. CSS：全局样式与 CSS Modules

- 全局样式放在 `app/globals.css`：重置、主题变量（颜色、间距）、排版、`:root { --color-primary: ... }`。
- 组件私有样式用 CSS Modules：`Component.module.css`，通过 `import styles from './Component.module.css'` 引用。
- 避免全局命名污染，尽量不要在全局写具体组件规则。

示例（CSS Modules）：
```css
/* app/components/Card.module.css */
.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 8px;
}
.desc {
  color: #4b5563;
  line-height: 1.6;
}
```

```tsx
// app/components/Card.tsx
'use client';
import styles from './Card.module.css';

type CardProps = {
  title: string;
  description?: string;
  onClick?: () => void;
};

export default function Card({ title, description, onClick }: CardProps) {
  return (
    <article className={styles.card} onClick={onClick} role={onClick ? 'button' : undefined}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
    </article>
  );
}
```

# 使用 React + HTML + CSS + TypeScript 实现网页内容（Next.js 项目实践）

这是一份面向零基础的、可以直接照做的入门文档。你将学会在本项目（Next.js App Router + TypeScript）中，用 React、HTML、CSS 和 TypeScript 实现一个结构清晰、界面美观、可扩展的网页内容。

你将收获：
- 跑通本项目（本地开发）并看到自己的组件。
- 理解语义化 HTML、CSS Modules、组件化与 TypeScript Props。
- 动手做一个“文章列表”小页面，并掌握常见问题的排查方法。

预计用时：20–40 分钟（完全零基础者建议多预留时间）。

参考资料：
- React 官方文档：https://react.dev/
- HTML 基础（W3Schools）：https://www.w3schools.com/html/
- CSS 基础（W3Schools）：https://www.w3schools.com/css/
- TypeScript 基础（W3Schools）：https://www.w3schools.com/typescript/

---

## 目录

1. 环境准备（零基础必看）
2. 认识项目结构（导览）
3. 快速开始：10 分钟做出主页卡片
4. 核心概念速学（HTML/CSS/React/TS）
5. 动手实践：从零做“文章列表”页面
6. 可访问性（a11y）最小清单
7. 性能与加载优化（入门即可）
8. 常见错误与修复（新手高频）
9. 术语速览（易混淆点）
10. 下一步建议（如何继续）
11. 参考资料

---

## 1. 环境准备（零基础必看）

1) 安装 Node.js（建议 20+）：https://nodejs.org/
2) 安装包管理器（推荐 pnpm）：https://pnpm.io/installation
3) 验证安装（PowerShell）：

```powershell
node -v
pnpm -v
```

看到版本号即可继续。

---

## 2. 认识项目结构（导览）

本仓库采用 App Router，关键目录：
- `app/layout.tsx`：根布局（全局样式、Provider、通用布局结构）
- `app/page.tsx`：主页页面组件
- `app/papers/page.tsx`：示例子页面
- 全局样式：`app/globals.css`
- 组件：`app/components/*`（使用 CSS Modules）
- 上下文：`app/contexts/LanguageContext.tsx`
- 文案与国际化：`/locales/*.json`

建议：页面负责结构和装配，具体内容放入子组件；涉及交互/浏览器 API 的组件加 `'use client'`。

---

## 3. 快速开始：10 分钟做出主页卡片

目标：跑起来本项目并在首页展示两个自定义卡片组件。

1) 安装依赖并启动开发服务器（PowerShell 在项目根目录）：

```powershell
pnpm install
pnpm dev
```

打开浏览器访问 http://localhost:3000。

2) 新建“卡片组件（Card）”

- 新建文件：`app/components/Card.module.css`

```css
.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.title { font-size: 1.125rem; font-weight: 600; margin: 0 0 8px; }
.desc { color: #4b5563; line-height: 1.6; }
```

- 新建文件：`app/components/Card.tsx`

```tsx
'use client';
import styles from './Card.module.css';

type CardProps = { title: string; description?: string };

export default function Card({ title, description }: CardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
    </article>
  );
}
```

3) 创建“容器组件（Container）”用于居中页面内容

- 新建文件：`app/components/Container.module.css`

```css
.container { max-width: 960px; margin: 0 auto; padding: 0 16px; }
.grid { display: grid; gap: 16px; grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 768px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
```

- 新建文件：`app/components/Container.tsx`

```tsx
import styles from './Container.module.css';
export default function Container({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
```

4) 在首页使用它们展示内容（修改：`app/page.tsx`）

```tsx
import Container from './components/Container';
import Card from './components/Card';
import styles from './components/Container.module.css';

export default function Page() {
  return (
    <main>
      <Container>
        <h1>我的主页</h1>
        <div className={styles.grid}>
          <Card title="欢迎" description="这是一个使用 Next.js + React + TS 构建的站点。" />
          <Card title="下一步" description="尝试修改这个页面或新增一个子页面吧！" />
        </div>
      </Container>
    </main>
  );
}
```

你应该看到：页面标题“我的主页”，下面两张样式一致的卡片。若没有，请查看“常见错误与修复”。

检查点：
- 页面能自动刷新且样式生效。
- 控制台无红色报错。

---

## 4. 核心概念速学（HTML/CSS/React/TS）

4.1 语义化 HTML
- 用 `header/nav/main/section/article/footer` 等标签表达结构。
- 页面仅有一个 `h1`，子区块用 `h2/h3`。
- 内部跳转用 `next/link`，外链用 `<a href target="_blank">`；图片提供 `alt`。

示例（主页骨架）：
```tsx
export default function Page() {
  return (
    <main>
      <h1>网站标题</h1>
      <section>
        <h2>最新内容</h2>
      </section>
    </main>
  );
}
```

4.2 CSS：全局样式与 CSS Modules
- 全局：`app/globals.css` 放重置、主题变量、排版规则。
- 组件局部：`*.module.css` + `className={styles.xxx}`，避免全局污染。

4.3 服务器组件 vs 客户端组件
- 默认是服务器组件；涉及交互（事件/状态/浏览器 API）的组件在首行写 `'use client'`。

4.4 TypeScript（Props/数据结构）
- 为组件定义 Props 类型，区分必填/可选。
- 为数据定义类型（如文章、作者）。

示例：
```ts
// app/types/content.ts
export type Article = { id: string; title: string; summary?: string; url: string; tags?: string[] };
```

```tsx
// app/components/ArticleList.tsx
import type { Article } from '../types/content';
export function ArticleList({ items }: { items: Article[] }) {
  return (
    <ul>
      {items.map((a) => (
        <li key={a.id}>
          <a href={a.url} target="_blank" rel="noreferrer noopener">{a.title}</a>
          {a.summary && <p>{a.summary}</p>}
        </li>
      ))}
    </ul>
  );
}
```

---

## 5. 动手实践：从零做“文章列表”页面

1) 定义类型（新建：`app/types/content.ts`）

```ts
export type Article = { id: string; title: string; summary?: string; url: string; tags?: string[] };
```

2) 文章列表组件（新建：`app/components/ArticleList.tsx`）

```tsx
import type { Article } from '../types/content';
export function ArticleList({ items }: { items: Article[] }) {
  return (
    <ul>
      {items.map((a) => (
        <li key={a.id}>
          <a href={a.url} target="_blank" rel="noreferrer noopener">{a.title}</a>
          {a.summary && <p>{a.summary}</p>}
        </li>
      ))}
    </ul>
  );
}
```

3) 在首页使用（修改：`app/page.tsx`）

```tsx
import Container from './components/Container';
import { ArticleList } from './components/ArticleList';
import type { Article } from './types/content';

const articles: Article[] = [
  { id: 'a1', title: 'React 入门', url: 'https://react.dev/learn', summary: '官方学习路线与基础概念。' },
  { id: 'a2', title: 'HTML 基础', url: 'https://www.w3schools.com/html/', summary: '元素、属性、结构与语义。' },
];

export default function Page() {
  return (
    <main>
      <Container>
        <h1>学习资源</h1>
        <ArticleList items={articles} />
      </Container>
    </main>
  );
}
```

你应该看到：“学习资源”标题和两条链接列表。

---

## 6. 可访问性（a11y）最小清单

- 表单元素配对 `label` 与 `htmlFor`。
- 交互元素可键盘操作（Tab 能聚焦，Enter/Space 可触发）。
- 图片提供 `alt`，装饰性图像用空 `alt=""`。
- 颜色对比度达标（WCAG AA）。

---

## 7. 性能与加载优化（入门即可）

- 图片用 `next/image`（自动优化与懒加载）。
- 动态导入拆分代码；减少不必要的客户端组件。
- CSS Modules 仅加载所需样式，避免庞大全局 CSS。

---

## 8. 常见错误与修复（新手高频）

1) Module not found / Cannot find module
- 导入路径写错，检查相对路径与大小写。

2) 忘了 `'use client'`
- 在服务器组件中使用了 Hook/事件，给该文件首行加 `'use client'`。

3) CSS Modules 不生效
- 未按 `className={styles.xxx}` 使用或类名拼错；确认 `*.module.css`。

4) 链接/图片无效
- 站内跳转用 `next/link`；外链用 `<a href target="_blank">`；图片 `alt` 必填。

5) TS 类型不明确（any）
- 为 Props/数据结构显式声明类型；逐步消除 `any`。

6) GitHub Pages 刷新 404
- `next.config.ts` 需 `trailingSlash: true`；项目页设置 `PAGES_BASE_PATH='/<仓库名>'`。

---

## 9. 术语速览（易混淆点）

- 组件（Component）：可复用的 UI 片段，如按钮、卡片。
- Props：组件参数（输入），类似函数形参。
- 状态（State）：组件内部可变数据（仅客户端组件可以使用 React 状态）。
- 服务器组件/客户端组件：默认服务器组件；交互组件需 `'use client'`。
- CSS Modules：仅在导入它的组件中生效的 CSS 文件（避免全局污染）。

---

## 10. 下一步建议（如何继续）

- 抽离文案到 `locales/` 并使用 `useLanguage()` 做国际化。
- 将“资源列表”拆分为更小组件（如 `ArticleItem`）。
- 为导航与按钮补充键盘可访问性（`tabIndex`、`aria-*`）。
- 使用 `next/image` 优化图片。

---

## 11. 参考资料

- React 官方文档：https://react.dev/
- HTML 基础：https://www.w3schools.com/html/
- CSS 基础：https://www.w3schools.com/css/
- TypeScript 基础：https://www.w3schools.com/typescript/

坚持语义化、组件化、类型安全与可访问性，配合 Next.js 的 App Router 与静态导出能力，你可以快速构建高质量、可部署到 GitHub Pages 的站点内容。