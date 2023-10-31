'use strict';

import * as remarkHeadings from '@vcarl/remark-headings';
import * as rehypeAutolinkHeadings from 'rehype-autolink-headings';
import * as rehypeRaw from 'rehype-raw';
import * as rehypeShikiji from 'rehype-shikiji';
import * as rehypeSlug from 'rehype-slug';
import * as remarkGfm from 'remark-gfm';

import { LANGUAGES, DEFAULT_THEME } from './shiki.config.mjs';

/**
 * Provides all our Rehype Plugins that are used within MDX
 *
 * @param {'md' | 'mdx'} fileExtension
 * @returns {import('unified').Plugin[]}
 */
export function nextRehypePlugins(fileExtension) {
  const rehypePlugins = [
    // Generates `id` attributes for headings (H1, ...)
    rehypeSlug.default,
    [
      // Automatically add anchor links to headings (H1, ...)
      rehypeAutolinkHeadings.default,
      {
        behaviour: 'append',
        properties: { ariaHidden: true, tabIndex: -1, class: 'anchor' },
      },
    ],
    [
      // Syntax Highlighter for Code Blocks
      rehypeShikiji.default,
      { theme: DEFAULT_THEME, langs: LANGUAGES },
    ],
  ];

  if (fileExtension === 'md') {
    // We add this plugin at the top of the array as it is supposed to parse raw HTML
    // before any other plugins (such as adding headings, etc)
    // before any of the other plugins being applied
    rehypePlugins.unshift(rehypeRaw.default);
  }

  return rehypePlugins;
}

/**
 * Provides all our Remark Plugins that are used within MDX
 *
 * @param {'md' | 'mdx'} fileExtension
 * @returns {import('unified').Plugin[]}
 */
export function nextRemarkPlugins() {
  return [remarkGfm.default, remarkHeadings.default];
}
