# 多语言支持功能说明

本项目已成功添加了中英文多语言切换功能。

## 功能特性

- ✅ 支持中文和英文两种语言
- ✅ 语言选择会保存在本地存储中
- ✅ 动态加载语言包，提高性能
- ✅ 全站内容国际化，包括：
  - 网站标题和描述
  - 导航菜单
  - 论文页面内容（标题、摘要、按钮等）
  - 复制按钮的状态提示

## 技术实现

### 架构设计
- 使用React Context API管理语言状态
- 自定义Hook `useLanguage()` 提供翻译功能
- 客户端语言文件动态加载
- 响应式语言切换器组件

### 文件结构
```
├── app/
│   ├── contexts/
│   │   └── LanguageContext.tsx     # 语言上下文和Hook
│   ├── components/
│   │   ├── LanguageSwitcher.tsx    # 语言切换器组件
│   │   ├── LanguageSwitcher.module.css
│   │   ├── Navigation.tsx          # 导航组件
│   │   └── Navigation.module.css
│   ├── layout.tsx                  # 根布局（包含LanguageProvider）
│   ├── page.tsx                    # 主页（国际化）
│   └── papers/
│       └── page.tsx                # 论文页面（国际化）
└── locales/
    ├── en.json                     # 英文翻译
    └── zh.json                     # 中文翻译
```

## 使用方法

### 在组件中使用翻译
```tsx
'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('site.title')}</h1>
      <p>{t('site.description')}</p>
    </div>
  );
}
```

### 添加新的翻译内容
1. 在 `locales/en.json` 中添加英文翻译
2. 在 `locales/zh.json` 中添加对应的中文翻译
3. 使用 `t('key.path')` 格式在组件中调用

### 翻译键的嵌套结构
```json
{
  "site": {
    "title": "网站标题",
    "description": "网站描述"
  },
  "paper": {
    "title": "论文标题",
    "abstract": "摘要"
  }
}
```

## 特色功能

1. **语言持久化**：用户选择的语言会保存到localStorage
2. **性能优化**：语言文件按需加载，避免重复加载
3. **容错处理**：如果翻译键不存在，会显示原始键名
4. **类型安全**：使用TypeScript确保类型安全

## 开发和构建

```bash
# 开发模式
npm run dev

# 构建静态网站
npm run build
```

## 扩展语言支持

要添加新语言（如法语），需要：

1. 在 `locales/` 目录下创建 `fr.json`
2. 在 `LanguageContext.tsx` 中添加语言类型：
   ```tsx
   type Language = 'en' | 'zh' | 'fr';
   ```
3. 在语言切换器中添加新选项
4. 更新语言加载逻辑

## 注意事项

- 本项目配置为静态导出模式，适合部署到GitHub Pages
- 语言切换是客户端功能，无需服务器端渲染
- 所有文本内容都应该通过翻译系统处理，避免硬编码