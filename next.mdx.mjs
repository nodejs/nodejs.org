'use strict';

import remarkHeadings from '@vcarl/remark-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShikiji from 'rehype-shikiji';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { LANGUAGES, DEFAULT_THEME } from './shiki.config.mjs';

// This memoizes Shikiji Syntax Highlighter as `getStaticProps` from within Next.js context
// are called independently for each page, which recreates the Shikiji promise for each call
const memoizedShikiji = rehypeShikiji({
  theme: DEFAULT_THEME,
  langs: LANGUAGES,
});

/**
 * Provides all our Rehype Plugins that are used within MDX
 *
 * @type {import('unified').Plugin[]}
 */
export const NEXT_REHYPE_PLUGINS = [
  // Generates `id` attributes for headings (H1, ...)
  rehypeSlug,
  // Automatically add anchor links to headings (H1, ...)
  [rehypeAutolinkHeadings, { properties: { tabIndex: -1, class: 'anchor' } }],
  // Adds our syntax highlighter (Shikiji) to Codeboxes
  function rehypeShikiji() {
    return memoizedShikiji;
  },
];

/**
 * Provides all our Remark Plugins that are used within MDX
 *
 * @type {import('unified').Plugin[]}
 */
export const NEXT_REMARK_PLUGINS = [remarkGfm, remarkHeadings];
