# Technologies & Architecture

This document provides an overview of the technologies used in the Node.js website and explains key architectural decisions.

## Table of Contents

- [Core Technologies](#core-technologies)
  - [Frontend Framework](#frontend-framework)
    - [Why Next.js?](#why-nextjs)
  - [Styling System](#styling-system)
    - [PostCSS Plugins](#postcss-plugins)
  - [Content Management](#content-management)
    - [Content Processing Plugins](#content-processing-plugins)
  - [UI Components](#ui-components)
    - [Why Radix UI?](#why-radix-ui)
  - [Internationalization](#internationalization)
  - [Development Tools](#development-tools)
- [Repository Structure](#repository-structure)
- [Architecture Decisions](#architecture-decisions)
  - [Static Build Support](#static-build-support)
  - [Custom Page Rendering](#custom-page-rendering)
    - [`[...path].tsx` - Dynamic Route Handler](#pathts---dynamic-route-handler)
    - [`next.dynamic.mjs` - Page Generation](#nextdynamicmjs---page-generation)
    - [`next.data.mjs` - Build-time Data](#nextdatamjs---build-time-data)
  - [Internationalization Strategy](#internationalization-strategy)
    - [Why Not Next.js Built-in i18n?](#why-not-nextjs-built-in-i18n)
    - [Locale Detection and Routing](#locale-detection-and-routing)
  - [Content Structure](#content-structure)
    - [Layouts System](#layouts-system)
    - [Content Processing Pipeline](#content-processing-pipeline)
  - [Rewrite and Redirect System](#rewrite-and-redirect-system)
    - [`next.rewrites.mjs`](#nextrwritesmjs)
    - [`redirects.json`](#redirectsjson)
- [Configuration Files](#configuration-files)
  - [`site.json`](#sitejson)
  - [`next.locales.mjs`](#nextlocalesmjs)
- [Development Environment](#development-environment)
  - [VSCode Configuration](#vscode-configuration)
  - [Build and Deployment](#build-and-deployment)
    - [Multiple Build Targets](#multiple-build-targets)
    - [Vercel Integration](#vercel-integration)
  - [Package Management](#package-management)
    - [Multi-package Workspace](#multi-package-workspace)
    - [Publishing Process](#publishing-process)
- [Performance Optimizations](#performance-optimizations)
  - [Static Generation](#static-generation)
  - [Bundle Optimization](#bundle-optimization)
  - [Image Optimization](#image-optimization)
- [Testing Infrastructure](#testing-infrastructure)
  - [Visual Regression Testing](#visual-regression-testing)
  - [End-to-End Testing](#end-to-end-testing)

## Core Technologies

### Frontend Framework

The Node.js Website is built with [React](https://react.dev/) and [Next.js](https://nextjs.org/):

- **React**: UI rendering engine for component-based development
- **Next.js**: Full-stack framework providing SSG, routing, and build optimization

#### Why Next.js?

We chose Next.js because it is:

- Versatile and hackable for custom requirements
- Stable with strong community maintenance
- Well-suited as a long-term framework choice
- Capable of supporting static builds (requirement from TSC)

### Styling System

- **[PostCSS](https://postcss.org/)**: CSS preprocessing with plugin-based architecture
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework and design system foundation
- **CSS Modules**: Scoped styling for components

#### PostCSS Plugins

- `postcss-calc`: Resolves `calc()` expressions at build time
- `@tailwindcss/postcss`: Enables Tailwind integration

### Content Management

- **[MDX](https://mdxjs.com/)**: Markdown with JSX component support
- **[Remark](https://github.com/remarkjs/remark)**: Markdown processing plugins
- **[Rehype](https://github.com/rehypejs/rehype)**: HTML processing plugins

#### Content Processing Plugins

- `remark-gfm`: GitHub Flavored Markdown support
- `remark-headings`: Generates metadata for table of contents
- `rehype-autolink-headings`: Automatic anchor links for headings
- `rehype-slug`: Automatic ID generation for headings

### UI Components

- **[Radix UI](https://www.radix-ui.com/)**: Accessible, unstyled component primitives
- **[Hero Icons](https://heroicons.com/)**: SVG icon library
- **[Shiki](https://github.com/shikijs/shiki)**: Syntax highlighting for code blocks

#### Why Radix UI?

- Minimalistic, component-focused approach
- Built-in WAI-ARIA and accessibility features
- Allows focus on design without accessibility implementation overhead
- Modular package structure

### Internationalization

- **[`next-intl`](https://next-intl-docs.vercel.app)**: i18n library with Next.js integration
- **[ICU Message Syntax](https://next-intl.dev/docs/usage/messages)**: Translation message format

### Development Tools

- **[Storybook](https://storybook.js.org/)**: Component development and visual testing
- **[Chromatic](https://www.chromatic.com/)**: Automated visual regression testing
- **[Husky](https://typicode.github.io/husky/)**: Git hooks for code quality

## Repository Structure

```
nodejs.org/
├── apps/
│   └── site/                    # Main website application
│       ├── components/          # Website-specific React components
│       ├── layouts/             # Page layout templates
│       ├── pages/               # Content pages (Markdown/MDX)
│       │   ├── en/              # English content (source)
│       │   └── {locale}/        # Translated content
│       ├── public/              # Static assets
│       │   └── static/          # Images, documents, etc.
│       ├── hooks/               # React hooks
│       ├── providers/           # React context providers
│       ├── types/               # TypeScript definitions
│       ├── next-data/           # Build-time data fetching
│       ├── scripts/             # Utility scripts
│       ├── snippets/            # Code snippets for download page
│       └── tests/               # Test files
│           └── e2e/             # End-to-end tests
└── packages/
    ├── ui-components/           # Reusable UI components
    │   ├── styles/             # Global stylesheets
    │   └── .storybook/         # Storybook configuration
    ├── i18n/                # Internationalization
    │   ├── locales/         # Translation files
    │   └── config.json      # Locale configuration
    ├── rehype-shiki/        # Syntax highlighting plugin
   ...
```

## Architecture Decisions

### Static Build Support

The website supports fully static builds to ensure independence from third-party services:

- Content can be served without external dependencies
- Maintains availability even if hosting providers change

### Custom Page Rendering

The website uses a custom rendering system instead of Next.js default routing:

#### `[...path].tsx` - Dynamic Route Handler

- Catches all routes and renders them through a custom system
- Enables dynamic page generation from Markdown files
- Supports incremental static generation (ISG)

#### `next.dynamic.mjs` - Page Generation

This file handles:

- Discovering all source pages in `apps/site/pages/en`
- Identifying translated pages
- Generating localized paths for untranslated content
- Creating fallback pages with English content but localized navigation

#### `next.data.mjs` - Build-time Data

Responsible for:

- Node.js release data fetching
- Blog post metadata generation
- RSS feed creation
- Build-time indexing

### Internationalization Strategy

#### Why Not Next.js Built-in i18n?

We use a custom i18n solution because:

- Need comprehensive locale and page listing capabilities
- Use subfolder content structure (`/pages/en/`, `/pages/fr/`) vs. extension-based (`file.en.md`)
- Maintain consistency with previous website structure
- Ensure long-term maintainability

#### Locale Detection and Routing

- `next.middleware.js`: Handles browser locale detection and redirects
- Falls back to `/en` for unsupported locales
- Provides seamless user experience across languages

### Content Structure

#### Layouts System

```typescript
// Each page specifies its layout in frontmatter
---
title: Page Title
layout: layout-name
---

// Layouts wrap content and provide structure
const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="layout">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);
```

#### Content Processing Pipeline

1. **Markdown files** → MDX compiler
2. **Rehype/Remark plugins** → Content transformation
3. **Shiki integration** → Syntax highlighting
4. **Layout system** → Page structure
5. **i18n integration** → Localized rendering

### Rewrite and Redirect System

#### `next.rewrites.mjs`

Handles URL rewriting and redirects:

```javascript
// Internal rewrites (same content, different URL)
{ source: '/old-path', destination: '/new-path' }

// External redirects (different domain)
{ source: '/docs', destination: 'https://nodejs.org/docs' }

// Locale template support
{ source: '/:locale/old-path', destination: '/:locale/new-path' }
```

#### `redirects.json`

Configuration file supporting:

- Internal and external redirects
- Locale templating with `/:locale` placeholder
- Simple template engine for dynamic paths

## Configuration Files

### `site.json`

Website metadata configuration:

- RSS feed definitions
- Social media information
- Build-time metadata
- Uses JSON format for easy collaboration

### `next.locales.mjs`

Locale configuration and management:

- Supported locale definitions
- Locale-specific settings
- Page availability per locale

## Development Environment

### VSCode Configuration

The `.vscode` directory provides:

- **`extensions.json`**: Recommended extensions for optimal development
- **`settings.json`**: Consistent formatting and linting configuration

Benefits:

- Uniform developer experience
- Automatic code formatting and linting
- Tailwind CSS IntelliSense
- Works with GitHub Codespaces

### Build and Deployment

#### Multiple Build Targets

- **`pnpm build`**: Production build for Vercel
- **`pnpm deploy`**: Export build for legacy servers
- **`pnpm dev`**: Development server

#### Vercel Integration

- Automatic deployments for branches (excluding `dependabot/*` and `gh/*`)
- Custom install script: `pnpm install --prod --frozen-lockfile`
- Dependency management: Build-time dependencies must be in `dependencies`, not `devDependencies`
- Sponsorship maintained by OpenJS Foundation

### Package Management

#### Multi-package Workspace

- Individual packages published to npm registry
- Automated publishing via GitHub Actions
- Triggered after successful CI or manual workflow dispatch

#### Publishing Process

1. **Automatic**: After merging to main (via merge queue)
2. **Manual**: Workflow dispatch for specific packages
3. **Notifications**: Slack alerts for manual triggers

## Performance Optimizations

### Static Generation

- Build-time page generation reduces server load
- Incremental Static Regeneration (ISR) for dynamic content
- Optimized asset handling and compression

### Bundle Optimization

- Code splitting at component and route levels
- Dynamic imports for large components
- Tree shaking for unused code elimination

### Image Optimization

- Next.js Image component for automatic optimization
- WebP conversion and responsive images
- Lazy loading for performance

## Testing Infrastructure

### Visual Regression Testing

- Storybook integration with Chromatic
- Automated visual diff detection
- Component isolation and testing

### End-to-End Testing

- Playwright for full application testing
- Critical user journey validation
- Cross-browser compatibility testing
