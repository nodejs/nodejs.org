'use strict';

import rehypeShikiji from '@node-core/rehype-shiki/plugin';
import remarkHeadings from '@vcarl/remark-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import readingTime from 'remark-reading-time';

import platform from '#platform/next.platform.config.mjs';

import remarkTableTitles from '../util/table';

// Shiki is created out here to avoid an async rehype plugin
const singletonShiki = await rehypeShikiji(platform.mdx);

/**
 * Provides all our Rehype Plugins that are used within MDX
 */
export const rehypePlugins = [
  // Generates `id` attributes for headings (H1, ...)
  rehypeSlug,
  // Automatically add anchor links to headings (H1, ...)
  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
  // Transforms sequential code elements into code tabs and
  // adds our syntax highlighter (Shikiji) to Codeboxes
  () => singletonShiki,
];

/**
 * Provides all our Remark Plugins that are used within MDX
 */
export const remarkPlugins = [
  // Support GFM syntax to be used within Markdown
  remarkGfm,
  // Generates metadata regarding headings
  remarkHeadings,
  // Calculates the reading time of the content
  readingTime,
  remarkTableTitles,
];
