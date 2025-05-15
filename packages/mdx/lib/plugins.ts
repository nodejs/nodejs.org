'use strict';

import remarkHeadings from '@vcarl/remark-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import readingTime from 'remark-reading-time';
import type { PluggableList } from 'unified';

import rehypeShikiji from './shiki';

/**
 * Provides all our Rehype Plugins that are used within MDX
 */
export const REHYPE_PLUGINS: PluggableList = [
  // Generates `id` attributes for headings (H1, ...)
  rehypeSlug,
  // Automatically add anchor links to headings (H1, ...)
  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
  // Transforms sequential code elements into code tabs and
  // adds our syntax highlighter (Shikiji) to Codeboxes
  rehypeShikiji,
];

/**
 * Provides all our Remark Plugins that are used within MDX
 */
export const REMARK_PLUGINS: PluggableList = [
  // Support GFM syntax to be used within Markdown
  remarkGfm,
  // Generates metadata regarding headings
  remarkHeadings,
  // Calculates the reading time of the content
  readingTime,
];
