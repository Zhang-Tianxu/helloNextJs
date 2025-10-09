# HTML / CSS / TypeScript 零基础入门（配合 Next.js/React 使用）

这是一份面向零基础初学者的语法与用法指南，帮助你快速看懂并写出在本项目中可运行的代码。内容按“讲解 → 例子 → 复现步骤”的方式组织，并贴合 React/TSX 的日常使用场景。

建议学习顺序：HTML → CSS → TypeScript（最后结合到 TSX 组件中）。

---

## 1. HTML 基础

HTML 是网页的“骨架”，由一系列“标签（tag）”组成。每个标签负责表达特定结构或含义。

常见语义化标签：
- `<!DOCTYPE html>`：声明 HTML 文档类型。
- `<html> <head> <body>`：页面结构三件套。
- `<header> <nav> <main> <section> <article> <aside> <footer>`：结构与语义。
- `<h1>~<h6>`：标题层级；一页尽量只有一个 `h1`。
- `<p>`：段落；`<ul>/<ol>/<li>`：列表；`<a>`：链接；`<img>`：图片。

最小页面示例（正规 HTML 文件场景）：
```html
<!doctype html>
<html lang="zh">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>我的网页</title>
  </head>
  <body>
    <header>顶部</header>
    <main>
      <h1>首页标题</h1>
      <p>欢迎来到我的网站！</p>
      <a href="https://react.dev/">React 官网</a>
      <img src="/logo.png" alt="网站 Logo" />
    </main>
    <footer>底部</footer>
  </body>
  </html>
```

在 Next.js 中，我们通常不直接写完整 HTML，而是在 `app/layout.tsx` 中定义 `<html>` 和 `<body>`，页面/组件里只写 `<main>/<section>` 等内容。

可复现（在本项目中）：
- 打开 `app/page.tsx`，在 `return` 里添加一个 `<section>` 包含标题、段落、链接和图片（用 `next/image` 更优）。

---

## 2. CSS 基础

CSS 负责“长相”，给 HTML 结构添加颜色、间距、布局等。CSS 语法由“选择器 + 属性 + 值”组成。

常用属性：
- 颜色/背景：`color`、`background`
- 间距：`margin`（外边距）、`padding`（内边距）
- 边框/圆角：`border`、`border-radius`
- 布局：`display: flex/grid`、`gap`、`justify-content`、`align-items`
- 字体：`font-size`、`font-weight`、`line-height`

在本项目中，推荐使用 CSS Modules（文件名以 `.module.css` 结尾），它的类名只在导入该样式的组件内生效，不会污染全局。

示例：
```css
/* app/components/Hello.module.css */
.box {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  padding: 16px;
  border-radius: 8px;
}
.title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
}
```

对应组件：
```tsx
// app/components/Hello.tsx
'use client';
import styles from './Hello.module.css';

export default function Hello() {
  return (
    <section className={styles.box}>
      <h2 className={styles.title}>你好，CSS Modules！</h2>
      <p>这个样式只会作用在当前组件内。</p>
    </section>
  );
}
```

可复现：
- 新建上述两个文件；在 `app/page.tsx` 导入并使用 `<Hello />`，刷新即可看到样式效果。

---

## 3. TypeScript 基础

TypeScript（TS）是在 JavaScript 基础上增加“类型”的语言。TS 能让你在写代码时更早发现错误并获得更好的智能提示。

常用类型：
- 基础类型：`string`、`number`、`boolean`、`null`、`undefined`
- 数组：`string[]`、`number[]`、`Array<T>`
- 对象：`{ name: string; age: number }`
- 联合类型：`'en' | 'zh'`
- 可选属性：`age?: number`
- 类型别名：`type User = { id: string }`
- 接口：`interface User { id: string }`
- 函数类型：`(a: number, b: number) => number`

例子：
```ts
// app/types/basic.ts
export type User = {
  id: string;
  name: string;
  age?: number; // 可选
};

export function formatUser(u: User): string {
  const ageText = u.age ? `（${u.age}岁）` : '';
  return `${u.name}${ageText}`;
}
```

在组件中使用：
```tsx
// app/components/UserCard.tsx
'use client';
import type { User } from '../types/basic';

export default function UserCard({ user }: { user: User }) {
  return (
    <article>
      <h3>{user.name}</h3>
      {user.age && <p>年龄：{user.age}</p>}
    </article>
  );
}
```

在页面中组合：
```tsx
// app/page.tsx（节选）
import UserCard from './components/UserCard';
import type { User } from './types/basic';

const me: User = { id: 'u1', name: 'Alice', age: 20 };

export default function Page() {
  return (
    <main>
      <UserCard user={me} />
    </main>
  );
}
```

---

## 4. 在 TSX（React 组件）中一起使用

TSX 是“TypeScript + JSX”的组合，允许你在 JavaScript/TypeScript 中写“类似 HTML 的语法”。常见注意点：
- `class` 在 TSX 中写成 `className`
- `for` 写成 `htmlFor`
- 事件用驼峰：`onClick`、`onChange`
- 自闭合标签：`<img />`、`<input />`

示例：
```tsx
// app/components/ContactForm.tsx
'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`提交成功：${name} / ${email}`);
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <label htmlFor="name">姓名：</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="email">邮箱：</label>
      <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <button type="submit">提交</button>
    </form>
  );
}
```

在页面中使用：
```tsx
// app/page.tsx（节选）
import ContactForm from './components/ContactForm';

export default function Page() {
  return (
    <main>
      <h1>联系我</h1>
      <ContactForm />
    </main>
  );
}
```

---

## 5. 练手项目：做一个“名片”组件

目标：综合 HTML（结构）、CSS（样式）、TS（类型）、TSX（组件），实现一个可复用的“名片”组件。

样式：
```css
/* app/components/ProfileCard.module.css */
.card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; max-width: 320px; }
.name { font-weight: 700; margin: 0 0 4px; }
.title { color: #6b7280; margin: 0 0 12px; }
.desc { color: #374151; line-height: 1.6; }
```

组件：
```tsx
// app/components/ProfileCard.tsx
'use client';
import styles from './ProfileCard.module.css';

type Profile = {
  name: string;
  title?: string;
  description?: string;
};

export default function ProfileCard({ profile }: { profile: Profile }) {
  const { name, title, description } = profile;
  return (
    <article className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      {title && <p className={styles.title}>{title}</p>}
      {description && <p className={styles.desc}>{description}</p>}
    </article>
  );
}
```

页面引用：
```tsx
// app/page.tsx（节选）
import ProfileCard from './components/ProfileCard';

export default function Page() {
  return (
    <main>
      <h1>我的名片</h1>
      <ProfileCard profile={{ name: 'Alice', title: '前端工程师', description: '热爱 React/TypeScript。' }} />
    </main>
  );
}
```

---

## 6. 常见易错点

- 在 TSX 中把 `class` 写成了 `class`（应为 `className`）。
- 忘记在需要交互的组件文件首行加 `'use client'`。
- CSS Modules 的类名拼写错误，或忘了 `import styles from '...module.css'`。
- 类型未声明导致 `any`，应为 Props、数据结构显式定义类型。
- `label` 与表单控件未配对 `htmlFor`/`id`，影响可访问性。

---

## 7. 进一步学习

- React 组件与状态管理：https://react.dev/learn
- HTML 标签与语义：https://www.w3schools.com/html/
- CSS 布局（Flex/Grid）：https://www.w3schools.com/css/
- TypeScript 类型系统：https://www.w3schools.com/typescript/

掌握以上基础后，再回到项目主文档“实现网页内容”与“部署到 GitHub Pages”的指南，进行综合练习与上线发布。