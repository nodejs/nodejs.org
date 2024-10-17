import rehypeShikiji from '@node-core/compile-mdx/shiki';
import remarkHeadings from '@vcarl/remark-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkReadingTime from 'remark-reading-time';

import { DEFAULT_THEME, LANGUAGES } from './shiki.config.mjs';

/**
 * Provides all our Rehype Plugins that are used within MDX
 *
 * @type {Array<import('unified').Plugin>}
 */
export const REHYPE_PLUGINS = [
  // Generates `id` attributes for headings (H1, ...)
  rehypeSlug,
  // Automatically add anchor links to headings (H1, ...)
  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
  // Transforms sequential code elements into code tabs and
  // adds our syntax highlighter (Shikiji) to Codeboxes
  rehypeShikiji(LANGUAGES, DEFAULT_THEME),
];

/**
 * Provides all our Remark Plugins that are used within MDX
 *
 * @type {Array<import('unified').Plugin>}
 */
export const REMARK_PLUGINS = [remarkGfm, remarkHeadings, remarkReadingTime];
