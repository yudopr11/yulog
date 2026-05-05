# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at http://localhost:3000
npm run build     # astro check (TypeScript) + Astro production build
npm run lint      # ESLint — zero warnings policy (--max-warnings 0)
npm run preview   # preview production build on port 3000
```

## Architecture

Astro 5 + React 19 + TypeScript + Tailwind CSS v4 blog/portfolio site that consumes the yupi FastAPI backend.

### How it's structured

Astro handles routing and server-side rendering. React components are **islands** hydrated with `client:load`. Because all blog data comes from an external API (not local files), all pages use SSR (`output: 'server'`, `@astrojs/node` adapter).

### Routing (`src/pages/`)

| Page | Path | Notes |
|------|------|-------|
| `index.astro` | `/` | Renders `<Home client:load />` |
| `blog/index.astro` | `/blog` | Renders `<Blog client:load />` |
| `blog/[slug].astro` | `/blog/:slug` | Server-side fetches post for SEO, passes as `initialPost` prop to `<PostDetail client:load />` |
| `404.astro` | `404` | Renders `<NotFound client:load />` |

### Blog search (`src/components/Blog.tsx`)

Two search modes toggled by a `.period-toggle` segmented control:
- **Keyword**: plain text match via `search` query param
- **Semantic (RAG)**: embedding-based via `use_rag=true` query param

Default mode is controlled by `VITE_USE_RAG_DEFAULT` env var. Search is debounced 300 ms. Posts load 4 at a time with a "load more" button.

### Markdown rendering (`src/components/blog/MarkdownRenderers.tsx`)

Custom renderers handle:
- Syntax highlighting via Shiki (`github-dark` theme) with copy-to-clipboard and line numbers
- Math via KaTeX (`$$...$$` block delimiters) — KaTeX CSS loaded in `BaseLayout.astro`
- Auto-generated heading IDs for ToC anchor links

### Layout (`src/layouts/BaseLayout.astro`)

HTML shell: Google Fonts, global CSS, page background, server-side `<head>` meta tags, and the `<Navbar>` island. Props: `title`, `description`, `pathname`, `image`, `type`.

### Styling (Cuan Design System)

CSS custom properties defined in `src/index.css` provide the design token layer. Key classes:
- `.cuan-card` — glassmorphic gradient card
- `.cuan-btn`, `.cuan-btn-primary`, `.cuan-btn-secondary`, `.cuan-btn-ghost` — button variants
- `.chip`, `.chip-brand` — tag pills
- `.period-toggle` — segmented toggle
- `.cuan-slide-up`, `.cuan-fade-in` — entrance animations

Use these classes rather than ad-hoc Tailwind utilities for consistent theming.

### Navigation in React components

There is no React Router — all navigation uses native `<a href="...">` anchors and `window.location.href` for imperative navigation. The `Navbar` component accepts a `pathname` prop (passed from the Astro page) for active-link detection.

### API (`src/services/api.ts`)

Two functions — `fetchBlogPosts` and `fetchBlogPostBySlug` — call the yupi backend. Base URL is `VITE_API_BASE_URL` (defaults to `https://yupi-dev.up.railway.app`).

### Toast notifications

`<Toaster>` from `react-hot-toast` is mounted inside `PostDetail.tsx` (only the post page uses toasts, for the share/copy-link feature).

### Deployment (Railway)

`@astrojs/node` adapter in `standalone` mode generates a Node.js server. Railway runs it with `node ./dist/server/entry.mjs`. The `build` command is `npm run build`.

## Environment Variables

Copy `.env.example`. Required:

| Variable | Purpose |
|----------|---------|
| `VITE_API_BASE_URL` | yupi backend URL |
| `VITE_USE_RAG_DEFAULT` | `true`/`false` — default search mode |
