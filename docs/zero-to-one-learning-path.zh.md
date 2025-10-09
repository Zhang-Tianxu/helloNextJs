# 从 0 到 1：HTML/CSS/TypeScript + React/Next.js 学习与实战路线图

本路线图把三类知识串起来：
1) HTML/CSS/TypeScript 基础语法
2) React 组件与 TSX 的基本用法
3) Next.js（App Router）项目实践与 GitHub Pages 部署

目标是给零基础初学者一条“能跑通、能看见结果、能逐步进阶”的路径。所有步骤都配有项目中的对应文件与参考链接，便于你边学边做。

---

## 总览（你将完成什么）

- 本地跑起一个 Next.js + TypeScript 项目
- 学会用 HTML/CSS/TS 表达结构、样式和类型
- 在 React/TSX 中组合它们写出可复用组件
- 基于 App Router 组织页面
- 静态导出并部署到 GitHub Pages

推荐顺序与时间指引（可根据自身情况调整）：
- 基础语法（HTML/CSS/TS）：1–2 天
- React/TSX 基本使用：1 天
- Next.js 项目实践：1 天
- 部署与发布：0.5 天

---

## 第 1 阶段：夯实基础（HTML / CSS / TS）

阅读：`docs/basics-html-css-typescript.zh.md`

你需要掌握：
- HTML：语义化标签、标题层级、列表、链接、图片、`main/section/article`
- CSS：盒模型（margin/padding/border）、字体、颜色、布局（Flex/Grid）
- TypeScript：基础类型、对象/数组、联合类型、可选属性、类型别名/接口、函数类型

动手里程碑：
- 在 `app/components/Hello.tsx` + `Hello.module.css` 做出一个样式盒子
- 在 `app/types/basic.ts` 定义一个 `User` 类型，并在 `UserCard` 组件中使用

检查点：
- 页面能正常显示 `Hello` 与 `UserCard`
- 控制台无红色报错；类型提示正常

---

## 第 2 阶段：把基础放进 React/TSX

阅读：`docs/build-content-with-react-html-css-ts.zh.md`（第 3/4 章）

你需要掌握：
- TSX 语法注意点（`className`、`htmlFor`、事件命名、自闭合标签）
- 客户端组件 vs 服务器组件，何时在文件首行写 `'use client'`
- CSS Modules 的使用方式与好处（避免全局污染）

动手里程碑：
- 完成“快速开始：10 分钟做出主页卡片”
- 让首页出现 2–3 张 `Card`，并使用 `Container` 居中 + `grid` 响应式布局

检查点：
- 页面标题“我的主页”与卡片内容展示正常
- 在不同窗口宽度下，卡片能自动换列

---

## 第 3 阶段：组件与数据（类型驱动）

阅读：`docs/build-content-with-react-html-css-ts.zh.md`（第 5 章）

你需要掌握：
- 用 TypeScript 定义数据模型（如 `Article`）
- 编写列表组件（如 `ArticleList`）并通过 Props 传入数据
- 拆分：页面负责装配，组件负责展示

动手里程碑：
- 新增 `app/types/content.ts` 与 `app/components/ArticleList.tsx`
- 在 `app/page.tsx` 中传入 `articles` 并渲染

检查点：
- 页面出现“学习资源”标题和两条链接列表
- 修改 `articles` 数据后页面能按预期变化

---

## 第 4 阶段：国际化与上下文（可选进阶）

阅读：`MULTILINGUAL_README.md`

你需要掌握：
- 使用 `LanguageContext` 与 `useLanguage()` 获取 `t('key')` 文案
- 在组件中替换硬编码文本，做中英文切换

动手里程碑：
- 在任意组件（如 `Hero`）中使用 `t('site.title')`、`t('site.description')`
- 切换语言后，页面文本随之变化

检查点：
- 语言选择可持久化（localStorage）
- 页面刷新后仍保持之前选择

---

## 第 5 阶段：可访问性与性能（入门即可）

阅读：`docs/build-content-with-react-html-css-ts.zh.md`（第 6/7 章）

你需要掌握：
- a11y 最小清单：`label/htmlFor`、键盘可操作、图片 `alt`、色彩对比度
- 性能基础：`next/image`、减少不必要的客户端组件、动态导入代码分割

动手里程碑：
- 给表单配对 `label` / `htmlFor`
- 将页面图片替换为 `next/image`

检查点：
- Tab 键可遍历主要交互元素
- 图片加载更平滑，Lighthouse 基本分数提升

---

## 第 6 阶段：项目发布（GitHub Pages）

阅读：`docs/deploy-nextjs-to-github-pages.zh.md`

你需要掌握：
- 静态导出配置：`next.config.ts` 中 `output: 'export'`、`trailingSlash: true`
- `basePath` 与 GitHub Pages 的关系：项目页 `PAGES_BASE_PATH='/<仓库名>'`
- 使用 GitHub Actions 自动构建并发布到 Pages

动手里程碑：
- 在 `.github/workflows/deploy.yml` 中配置构建与部署
- 推送 `main` 分支后，访问 `https://<用户名>.github.io/<仓库名>/`

检查点：
- 刷新不 404（因为 `trailingSlash: true`）
- 资源路径加载正常（`basePath` 设置正确）

---

## 常见问题（跨阶段）

- 忘写 `'use client'`：客户端 Hook/事件只能在客户端组件使用。
- CSS 不生效：确认是 `*.module.css` 并用 `className={styles.xxx}`。
- 模块找不到：检查相对路径与大小写。
- 类型报错：为 Props/数据结构显式声明类型，避免 `any`。
- Pages 刷新 404：检查 `trailingSlash` 与 `PAGES_BASE_PATH`。

---

## 学习资源索引（本仓库内）

- 语法入门：`docs/basics-html-css-typescript.zh.md`
- 内容实现：`docs/build-content-with-react-html-css-ts.zh.md`
- 部署指南：`docs/deploy-nextjs-to-github-pages.zh.md`
- 多语言说明：`MULTILINGUAL_README.md`

---

## 建议的练习路线（可打卡）

1) 完成“快速开始”卡片页面（2–3 张卡片 + 响应式）
2) 完成“文章列表”页面（包含类型与组件）
3) 在一个组件中接入 `useLanguage()` 完成中英文切换
4) 将图片替换为 `next/image`，并检查 a11y 最小清单
5) 配好 GitHub Actions，成功发布到 Pages

每完成一步，记录你遇到的错误与解决方法（作为“错题本”）。

---

坚持“从能运行开始”，把可见的小目标串起来，你就能从 0 到 1 构建出一个真正可用、可上线的 Next.js 站点。祝学习顺利！