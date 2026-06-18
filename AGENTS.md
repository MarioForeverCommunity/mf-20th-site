# mf-20th-site 项目指南

这是一个基于 Astro 的静态网站项目，用于庆祝”百度永远的玛丽吧“20 周年纪念活动。

## 项目概述

- **框架**: Astro 6.x + Tailwind CSS 4.x
- **包管理器**: Bun（不使用 npm/pnpm/yarn）
- **语言**: TypeScript（严格模式）
- **数据源**: `src/data/` 目录下的 YAML 文件
- **测试**: 无测试框架

## 常用命令

```sh
# 开发
bun dev              # 启动开发服务器（localhost:4321）
bun build            # 构建生产版本到 ./dist/
bun preview          # 本地预览构建结果

# Astro CLI
bun astro check      # 类型检查
bun astro --help     # 查看 Astro CLI 帮助

# 部署
bun deploy           # 运行 deploy.sh 部署脚本
```

**注意**: 项目未配置 lint、format 或 test 脚本。类型检查通过 `bun astro check` 执行。

## 文件结构

```
src/
├── components/    # Astro 组件（PascalCase.astro）
│   ├── AvatarCluster.astro
│   ├── Footer.astro
│   ├── Logo.astro
│   ├── MessageCard.astro
│   ├── Navbar.astro
│   ├── SplashScreen.astro
│   ├── ThemeToggle.astro
│   ├── Timeline.astro
│   ├── TimelineCard.astro
│   └── YearNav.astro
├── data/          # YAML 数据文件
│   ├── history.yaml
│   └── messages.yaml
├── layouts/       # 页面布局
│   └── BaseLayout.astro
├── pages/         # 路由页面
│   ├── history.astro
│   ├── index.astro
│   ├── messages.astro
│   └── works.astro
├── styles/        # 全局样式（Tailwind v4）
│   └── global.css
├── types/         # TypeScript 类型定义
│   ├── history.ts
│   └── message.ts
└── utils/         # 工具函数
    └── loadYaml.ts

public/
├── images/        # 静态图片资源
│   ├── avatars/   # 用户头像
│   ├── history/   # 历史图片
│   ├── logo/      # Logo 图片
│   └── works/     # 作品图片
└── favicon.ico
```

## 代码风格指南

### TypeScript

- 通过 `astro/tsconfigs/strict` 启用严格模式
- 所有数据结构需在 `src/types/` 中定义接口
- 从独立文件导出接口：`export interface MessageItem { ... }`
- 类型导入使用 `import type`：`import type { HistoryItem } from '../types/history'`
- 解构 props 时提供默认值：`const { title, description = 'default' } = Astro.props`

### Astro 组件

- Frontmatter 使用 `---` 分隔符
- 在 frontmatter 顶部定义 `Props` 接口
- 接口定义后解构 `Astro.props`
- 布局组件使用 `<slot />` 进行内容投影
- 条件类名使用 `class:list` 指令
- 客户端脚本使用 `<script>` 标签
- 不需要打包的脚本使用 `is:inline` 属性

### 导入规范

- 使用相对路径：`'../components/...'`、`'../utils/...'`
- 导入顺序：Node 内置模块 → 外部包 → 本地模块
- 仅类型导入使用 `import type`

### 样式（Tailwind v4）

- Tailwind v4 使用基于 CSS 的配置（无 `tailwind.config.js`）
- 主题在 `global.css` 中使用 `@theme { ... }` 定义
- 主题变量：`var(--color-text-primary)`、`var(--color-bg-secondary)` 等
- 深色模式通过 `<html>` 元素上的 `.dark` 类实现（在 `BaseLayout` 中检测）
- 自定义变体：`@custom-variant dark (&:where(.dark, .dark *))`
- 使用 Tailwind 工具类；避免内联 `style`，动态值除外

### 组件模式

- 交错动画使用内联 `style={`animation-delay: ${index * 0.05}s`}`
- 图片添加 `loading="lazy"` 属性
- 图片回退使用 `onerror`：`onerror="this.src='/images/avatars/default.svg'"`
- Astro 自动为 `<style>` 块添加作用域

### 错误处理

- 使用带上下文的描述性错误信息
- 操作前检查文件是否存在
- 示例：`throw new Error(\`YAML 文件未找到: ${filePath}\`)`

### YAML 数据文件

- 存储在 `src/data/` 目录
- 自定义 Vite 插件提供 HMR（文件变更时整页重载）
- 使用通用工具函数加载：`loadYaml<MessageItem[]>('messages.yaml')`

### 命名规范

- 组件：`PascalCase`（如 `MessageCard.astro`、`Timeline.astro`）
- 工具函数：`camelCase`（如 `loadYaml.ts`）
- 类型/接口：`PascalCase`（如 `MessageItem`、`HistoryItem`）
- CSS 类：Tailwind 工具类或 kebab-case 自定义类

### Astro 配置

- 开发服务器绑定所有主机（`host: true`）
- 自定义 YAML HMR 插件监听 `.yaml`/`.yml` 文件变更
- Tailwind 通过 `@tailwindcss/vite` 插件集成

## 主题配置

项目使用玻璃拟态设计风格，支持亮色/深色模式切换。

### 颜色变量

```css
/* 亮色模式 */
--color-bg-primary: #ffffff
--color-bg-secondary: rgba(255, 255, 255, 0.45)
--color-text-primary: #1d1d1f
--color-text-secondary: #424245
--color-accent: #0071e3

/* 深色模式 */
--color-bg-primary: #000000
--color-bg-secondary: rgba(28, 28, 30, 0.35)
--color-text-primary: #f5f5f7
--color-text-secondary: #a1a1a6
```

### 动画

- `--animate-fade-in`: 淡入动画
- `--animate-fade-out`: 淡出动画
- `--animate-scale-in`: 缩放淡入动画

## 快速参考

| 任务 | 命令 |
|------|------|
| 启动开发服务器 | `bun dev` |
| 类型检查 | `bun astro check` |
| 生产构建 | `bun build` |
| 预览构建 | `bun preview` |
| 部署 | `bun deploy` |

## 部署说明

部署脚本 `deploy.sh` 会执行以下操作：
1. 拉取最新代码
2. 安装依赖
3. 构建项目
4. 将构建结果同步到服务器目录 `/data/wwwroot/20th.marioforever.net/`