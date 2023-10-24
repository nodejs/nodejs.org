'use strict';

/// <reference types="remark-parse" />
/// <reference types="remark-stringify" />

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('unified').Processor<Root>} Processor
 */

import * as remarkHeadings from '@vcarl/remark-headings';
import * as mdastAutoLink from 'mdast-util-gfm-autolink-literal';
import * as mdastTable from 'mdast-util-gfm-table';
import * as rehypeAutolinkHeadings from 'rehype-autolink-headings';
import * as rehypePrettyCode from 'rehype-pretty-code';
import * as rehypeRaw from 'rehype-raw';
import * as rehypeSlug from 'rehype-slug';
import { getHighlighter } from 'shiki';
import shikiNordTheme from 'shiki/themes/nord.json';

import { SUPPORTED_LANGUAGES } from './shiki.config.mjs';

/**
 * This function is used to add individual `mdast` plugins to the unified/mdx
 * processor with the intent of being able to customize plugins
 *
 * @returns {void}
 */
function nextMdastPlugins() {
  const self = /** @type {Processor} */ (this);
  const data = self.data();

  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);

  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = []);

  // Converts plain URLs on Markdown to HTML Anchor Tags
  fromMarkdownExtensions.push(mdastAutoLink.gfmAutolinkLiteralFromMarkdown());
  toMarkdownExtensions.push(mdastAutoLink.gfmAutolinkLiteralToMarkdown());

  // Converts plain Markdown Tables (GFM) to HTML Tables
  fromMarkdownExtensions.push(mdastTable.gfmTableFromMarkdown);
  toMarkdownExtensions.push(mdastTable.gfmTableToMarkdown());
}

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
      rehypePrettyCode.default,
      {
        theme: shikiNordTheme,
        defaultLang: 'plaintext',
        getHighlighter: options =>
          getHighlighter({ ...options, langs: SUPPORTED_LANGUAGES }),
      },
    ],
  ];

  if (fileExtension === 'md') {
    // We add the rehype-raw at the too (first plugin) as it should parse raw HTML
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
  return [remarkHeadings.default, nextMdastPlugins];
}
