'use strict';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import type { CompileOptions } from '@mdx-js/mdx';

import remarkHeadings from './plugins/headings.mjs';
import rehypeShikiji from './plugins/shiki.mjs';
import remarkTables from './plugins/table.mjs';

export default (output: Record<string, unknown>): CompileOptions => ({
  rehypePlugins: [
    // Generates `id` attributes for headings (H1, ...)
    rehypeSlug,
    // Automatically add anchor links to headings (H1, ...)
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    // Transforms sequential code elements into code tabs and
    // adds our syntax highlighter (Shikiji) to Codeboxes
    rehypeShikiji,
  ],
  remarkPlugins: [
    // Support GFM syntax to be used within Markdown
    remarkGfm,
    // Headings
    [remarkHeadings, { output }],
    // Tables
    remarkTables,
  ],
});
