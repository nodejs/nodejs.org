'use strict';

import rehypeShikiji from '@node-core/rehype-shiki/plugin';
import remarkHeadings from '@vcarl/remark-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import readingTime from 'remark-reading-time';

import { DEPLOY_TARGET } from '../next.constants.mjs';
import remarkTableTitles from '../util/table';

// Load MDX overrides contributed by the active deployment target. Keeps
// this module free of platform-specific branches — each platform owns
// its own `{ wasm, twoslash }` defaults via `next.platform.config.mjs`,
// with the in-repo default config serving as the standalone fallback.
const { default: platform } = DEPLOY_TARGET
  ? await import(`@node-core/platform-${DEPLOY_TARGET}/next.platform.config`)
  : await import('../next.platform.config.mjs');

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
