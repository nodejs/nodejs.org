'use strict';

import { compile, runSync } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { matter } from 'vfile-matter';

import { NEXT_REHYPE_PLUGINS, NEXT_REMARK_PLUGINS } from './next.mdx.mjs';

/**
 * This is our custom simple MDX Compiler that is used to compile Markdown and MDX
 * this returns a serializable VFile as a string that then gets passed to our MDX Provider
 *
 * @param {VFile} source
 * @param {'md' | 'mdx'} fileExtension
 * @returns {Promise<{ content: VFile; headings: import('@vcarl/remark-headings').Heading[]; frontmatter: Record<string, any>}>}
 */
export async function compileMDX(source, fileExtension) {
  // Parses the Frontmatter to the VFile and removes from the original source
  // cleaning the frontmatter to the source that is going to be parsed by the MDX Compiler
  matter(source, { strip: true });

  // This is a minimal MDX Compiler that is lightweight and only parses the MDX
  const compiledSource = await compile(source, {
    rehypePlugins: NEXT_REHYPE_PLUGINS,
    remarkPlugins: NEXT_REMARK_PLUGINS,
    format: fileExtension,
    // This results on the minimal possible MDX parsed, and delegates
    // another parser to actualy evaluate the MDX into JSX
    outputFormat: 'function-body',
  });

  // Retrieve some parsed data from the VFile metadata
  // such as frontmatter and Markdown headings
  const { headings, matter: frontmatter } = source.data;

  return { content: compiledSource, headings, frontmatter };
}

/**
 * This evaluates our MDX VFile into actual JSX eval'd code
 * which is actually used by the MDX Provider
 *
 * @param {VFile} source
 * @returns {import('mdx/types').MDXContent}
 */
export function runMDX(source) {
  const { default: content } = runSync(source, {
    // We need to pass the current JSX runtime down the road to the MDX Runtime
    // so that it can properly evaluate the MDX into JSX
    ...runtime,
    baseUrl: import.meta.url,
  });

  return content;
}
