import remarkHeadings from '@vcarl/remark-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import readingTime from 'remark-reading-time';
import type { Pluggable } from 'unified';

import rehypeShikiji from './next.mdx.shiki.mjs';

/**
 * Provides all our Rehype Plugins that are used within MDX
 */
export const NEXT_REHYPE_PLUGINS: Array<Pluggable> = [
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
export const NEXT_REMARK_PLUGINS: Array<Pluggable> = [
  remarkGfm,
  remarkHeadings,
  readingTime,
];
