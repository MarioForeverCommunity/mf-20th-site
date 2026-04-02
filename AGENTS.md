# Agent Guidelines for mf-20th-site

This is an Astro-based static site project for a 20th anniversary celebration.

## Project Overview

- **Framework**: Astro 6.x with Tailwind CSS 4.x
- **Package Manager**: Bun (not npm/yarn)
- **Language**: TypeScript (strict mode)
- **Data**: YAML files in `src/data/`
- **No test framework** - this project does not have tests

## Commands

```sh
# Development
bun dev              # Start dev server at localhost:4321
bun build            # Build production site to ./dist/
bun preview          # Preview build locally

# Astro CLI
bun astro check      # Type-check the project
bun astro --help     # Get help with Astro CLI

# Deployment
bun deploy           # Run deploy.sh script
```

**Note**: There are no lint, format, or test scripts defined. Type checking is done via `bun astro check`.

## File Structure

```
src/
├── components/    # Astro components (PascalCase.astro)
├── data/          # YAML data files (messages.yaml, history.yaml)
├── layouts/       # Page layouts (BaseLayout.astro)
├── pages/         # Route pages (index, messages, history, works)
├── styles/        # Global CSS (Tailwind v4)
├── types/         # TypeScript interfaces
└── utils/         # Utility functions
```

## Code Style Guidelines

### TypeScript

- Strict mode enabled via `astro/tsconfigs/strict`
- Define interfaces for all data structures in `src/types/`
- Export interfaces from dedicated files: `export interface MessageItem { ... }`
- Use `import type` for type-only imports: `import type { HistoryItem } from '../types/history'`
- Destructure props with defaults: `const { title, description = 'default' } = Astro.props`

### Astro Components

- Frontmatter uses `---` fences
- Define `Props` interface at top of frontmatter
- Destructure `Astro.props` after interface
- Use `<slot />` for content projection in layouts
- Use `class:list` directive for conditional classes
- Client-side scripts use `<script>` tags (not `<script>`)
- Use `is:inline` for scripts that should not be bundled

### Imports

- Use relative paths: `'../components/...'`, `'../utils/...'`
- Import order: built-in Node modules → external packages → local modules
- Use `import type` for type-only imports

### Styling (Tailwind v4)

- Tailwind v4 uses CSS-based configuration (no `tailwind.config.js`)
- Theme defined in `global.css` using `@theme { ... }`
- CSS variables for theming: `var(--color-text-primary)`, `var(--color-bg-secondary)`
- Dark mode via `.dark` class on `<html>` element (detected in `BaseLayout`)
- Custom variant defined: `@custom-variant dark (&:where(.dark, .dark *))`
- Use Tailwind utility classes; avoid inline `style` except for dynamic values

### Component Patterns

- Stagger animations with inline `style={`animation-delay: ${index * 0.05}s`}`
- Use `loading="lazy"` on images
- Use `onerror` for image fallbacks: `onerror="this.src='/images/avatars/default.svg'"`
- Scoped styles in `<style>` blocks (auto-scoped by Astro)

### Error Handling

- Use descriptive error messages with context
- Check file existence before operations
- Example: `throw new Error(\`YAML file not found: ${filePath}\`)`

### YAML Data Files

- Stored in `src/data/`
- Custom Vite plugin provides HMR (full page reload on change)
- Load with generic utility: `loadYaml<MessageItem[]>('messages.yaml')`

### Naming Conventions

- Components: `PascalCase` (e.g., `MessageCard.astro`, `Timeline.astro`)
- Utilities: `camelCase` (e.g., `loadYaml.ts`)
- Types/Interfaces: `PascalCase` (e.g., `MessageItem`, `HistoryItem`)
- CSS classes: Tailwind utilities or kebab-case custom classes

### Astro Config

- Dev server binds to all hosts (`host: true`)
- Custom YAML HMR plugin watches `.yaml`/`.yml` files
- Tailwind via `@tailwindcss/vite` plugin

## Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `bun dev` |
| Type check | `bun astro check` |
| Production build | `bun build` |
| Preview build | `bun preview` |
| Deploy | `bun deploy` |
