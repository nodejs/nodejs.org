'use strict';

import remarkHeadings from '@vcarl/remark-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import readingTime from 'remark-reading-time';

import rehypeShikiji from './next.mdx.shiki.mjs';

/**
 * Provides all our Rehype Plugins that are used within MDX
 *
 * @type {Array<import('unified').Plugin>}
 */
export const NEXT_REHYPE_PLUGINS = [
  // Generates `id` attributes for headings (H1, ...)
  rehypeSlug,
  // Automatically add anchor links to headings (H1, ...)
  [
    rehypeAutolinkHeadings,
    { properties: { ariaHidden: true, tabIndex: -1, class: 'anchor' } },
  ],
  // Transforms sequential code elements into code tabs and
  // adds our syntax highlighter (Shikiji) to Codeboxes
  rehypeShikiji,
];

/**
 * Provides all our Remark Plugins that are used within MDX
 *
 * @type {Array<import('unified').Plugin>}
 */
export const NEXT_REMARK_PLUGINS = [remarkGfm, remarkHeadings, readingTime];
