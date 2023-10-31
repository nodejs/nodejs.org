'use strict';

import remarkHeadings from '@vcarl/remark-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShikiji from 'rehype-shikiji';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { LANGUAGES, DEFAULT_THEME } from './shiki.config.mjs';

// Provides a somewhat memoized version of Shikiji
// Note: this applies only for client-side usage as SSR requests
// have a lifecycle
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
  [
    // Automatically add anchor links to headings (H1, ...)
    rehypeAutolinkHeadings,
    {
      behaviour: 'append',
      properties: { ariaHidden: true, tabIndex: -1, class: 'anchor' },
    },
  ],
  memoizedShikiji,
];

/**
 * Provides all our Remark Plugins that are used within MDX
 *
 * @type {import('unified').Plugin[]}
 */
export const NEXT_REMARK_PLUGINS = [remarkGfm, remarkHeadings];
