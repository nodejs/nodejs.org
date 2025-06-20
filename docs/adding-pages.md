# Adding Pages

This guide explains how to create new pages and content for the Node.js website.

## Table of Contents

- [Page Creation Process](#page-creation-process)
  - [1. Create the Page Content](#1-create-the-page-content)
  - [2. Configure the Frontmatter](#2-configure-the-frontmatter)
  - [3. Choose the Appropriate Layout](#3-choose-the-appropriate-layout)
  - [4. Update Navigation (if needed)](#4-update-navigation-if-needed)
- [Adding Learn Pages](#adding-learn-pages)
  - [Learn Page Structure](#learn-page-structure)
  - [Learn Page Frontmatter](#learn-page-frontmatter)
    - [Frontmatter Fields](#frontmatter-fields)
  - [Update Learn Navigation](#update-learn-navigation)
  - [Add Translation Keys](#add-translation-keys)
- [Content Guidelines](#content-guidelines)
  - [Markdown Features](#markdown-features)
  - [Code Blocks](#code-blocks)
  - [Multiple Code Tabs](#multiple-code-tabs)
  - [Accessible Components](#accessible-components)
- [File Organization](#file-organization)
  - [Content Structure](#content-structure)
  - [Asset Management](#asset-management)
- [Internationalization](#internationalization)
  - [Translation Process](#translation-process)
  - [Translation Guidelines](#translation-guidelines)
- [Page Types and Examples](#page-types-and-examples)
  - [Standard Content Page](#standard-content-page)
  - [Blog Post](#blog-post)
  - [Learn Article](#learn-article)
- [Validation and Testing](#validation-and-testing)
  - [Before Publishing](#before-publishing)
  - [Content Review](#content-review)
- [Advanced Features](#advanced-features)
  - [Custom Layouts](#custom-layouts)
  - [Dynamic Content](#dynamic-content)

## Page Creation Process

### 1. Create the Page Content

Create a new markdown file in `apps/site/pages/en/` with the appropriate subdirectory structure.

```markdown
---
title: Title of the Page
layout: layout-name
---

# Page Title

Your content goes here...
```

### 2. Configure the Frontmatter

The frontmatter (YAML block at the top) configures page metadata:

- `title`: The page title displayed in the browser tab and used for SEO
- `layout`: The layout template to use (see available layouts below)
- `description`: Optional meta description for SEO
- `authors`: For learn pages, list of GitHub usernames

In cases where content has been syndicated from another source, you should also include:

- `canonical`: The original URL of the content

### 3. Choose the Appropriate Layout

Available layouts are defined in `apps/site/layouts/`, and mapped in `components/withLayout`.

### 4. Update Navigation (if needed)

If your page should appear in the site navigation, update `app/site/navigation.json` as needed.

## Adding Learn Pages

The Learn section has special requirements and structure.

### Learn Page Structure

```
apps/site/pages/en/learn/
├── category-name/
│   ├── article-name.md
│   └── another-article.md
└── another-category/
    └── article.md
```

### Update Learn Navigation

Add your new article to `app/site/navigation.json`:

```json
{
  "sideNavigation": {
    "learn": [
      {
        "label": "Category Name",
        "items": {
          "articleName": {
            "link": "/learn/category-name/article-name",
            "label": "components.navigation.learn.category-name.article-name"
          }
        }
      }
    ]
  }
}
```

### Add Translation Keys

Create translation keys for your navigation entries in the appropriate locale files:

```json
// packages/i18n/locales/en.json
{
  "components": {
    "navigation": {
      "learn": {
        "category-name": {
          "article-name": "Your Article Title"
        }
      }
    }
  }
}
```

## Content Guidelines

### Markdown Features

The website supports GitHub Flavored Markdown plus MDX components:

- Standard Markdown syntax
- Code blocks with syntax highlighting
- Tables, lists, and formatting
- Custom React components within content

### Code Blocks

Use fenced code blocks with language specification:

````markdown
```javascript
const example = 'Hello World';
console.log(example);
```
````

### Multiple Code Tabs

Consecutive code blocks create tabbed interfaces:

````markdown
```cjs
const http = require('node:http');
```

```mjs
import http from 'node:http';
```
````

When using multiple code tabs, an optional display name can be used:

````markdown
```cjs displayName="node:http"
const http = require('node:http');
```

```mjs displayName="node:vm"
import vm from 'node:vm';
```
````

## File Organization

### Content Structure

```
apps/site/pages/
├── en/                    # English content (source)
│   ├── learn/            # Learn section
│   ├── blog/             # Blog posts
│   ├── download/         # Download pages
│   └── about/            # About pages
└── {locale}/             # Translated content
    └── ...               # Same structure as en/
```

### Asset Management

- **Images**: Store in `apps/site/public/static/images/`
- **Documents**: Store in `apps/site/public/static/documents/`
- **Icons**: Use existing icon system or add to `@node-core/ui-components/Icons/`

## Internationalization

### Translation Process

1. Create the English version first in `apps/site/pages/en/`
2. Translators will create localized versions in `apps/site/pages/{locale}/`
3. Non-translated pages automatically fall back to English content with localized navigation

### Translation Guidelines

- Keep file paths consistent across locales
- Use the same frontmatter structure
- Reference the [Translation Guidelines](./translation.md) for detailed policies

## Page Types and Examples

### Standard Content Page

```markdown
---
title: About Node.js
layout: page
description: Learn about the Node.js runtime and its ecosystem
---

# About Node.js

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine...
```

### Blog Post

```markdown
---
title: Node.js 20.0.0 Released
layout: blog
date: 2023-04-18
author: Node.js Team
---

# Node.js 20.0.0 Now Available

We're excited to announce the release of Node.js 20.0.0...
```

### Learn Article

```markdown
---
title: Getting Started with Node.js
layout: learn
authors: nodejs-team, community-contributor
---

# Getting Started with Node.js

This tutorial will guide you through...
```

## Validation and Testing

### Before Publishing

1. **Preview locally**: Use `pnpm dev` to preview your changes
2. **Check formatting**: Run `pnpm format` to ensure proper formatting
3. **Validate links**: Ensure all internal links work correctly
4. **Test responsive design**: Check page layout on different screen sizes

### Content Review

- Ensure content follows our style guide
- Verify technical accuracy
- Check for proper grammar and spelling
- Confirm accessibility of any custom elements

## Advanced Features

### Custom Layouts

To create a custom layout:

1. Add your layout component to `apps/site/layouts/`
2. Update the layout mapping in `apps/site/components/withLayout.tsx`
3. Document the layout purpose and usage

### Dynamic Content

For pages that need dynamic data:

1. Use build-time data fetching in `apps/site/next-data/`
2. Configure data sources in the appropriate scripts
3. Access data through layout props or context
