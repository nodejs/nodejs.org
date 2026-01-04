'use strict';

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/**
 * Provides all our Rehype Plugins that are used within MDX
 */
export const rehypePlugins = [
  // Generates `id` attributes for headings (H1, ...)
  'rehype-slug',
  // Automatically add anchor links to headings (H1, ...)
  ['rehype-autolink-headings', { behavior: 'wrap' }],
  // Transforms sequential code elements into code tabs and
  // adds our syntax highlighter (Shikiji) to Codeboxes
  require.resolve('./plugins/shiki.mjs'),
];

/**
 * Provides all our Remark Plugins that are used within MDX
 */
export const remarkPlugins = [
  // Support GFM syntax to be used within Markdown
  'remark-gfm',
  // Frontmatter
  'remark-frontmatter',
  'remark-mdx-frontmatter',
  // Generates metadata regarding headings
  '@vcarl/remark-headings',
  // Calculates the reading time of the content
  'remark-reading-time',
  'remark-reading-time/mdx',
  // Tables
  require.resolve('./plugins/table.mjs'),
  // MDX Layout Injector
  require.resolve('./plugins/layout.mjs'),
];
