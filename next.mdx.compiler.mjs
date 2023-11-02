'use strict';

import { evaluate } from '@mdx-js/mdx';
import * as jsxRuntime from 'react/jsx-runtime';
import { matter } from 'vfile-matter';

import { NEXT_REHYPE_PLUGINS, NEXT_REMARK_PLUGINS } from './next.mdx.mjs';

/**
 * This is our custom simple MDX Compiler that is used to compile Markdown and MDX
 * this returns a serializable VFile as a string that then gets passed to our MDX Provider
 *
 * @param {import('vfile').VFile} source
 * @param {'md' | 'mdx'} fileExtension
 * @returns {Promise<{ MDXContent: import('mdx/types').MDXContent; headings: import('@vcarl/remark-headings').Heading[]; frontmatter: Record<string, any>}>}
 */
export async function compileMDX(source, fileExtension) {
  // Parses the Frontmatter to the VFile and removes from the original source
  // cleaning the frontmatter to the source that is going to be parsed by the MDX Compiler
  matter(source, { strip: true });

  // This is a minimal MDX Compiler that is lightweight and only parses the MDX
  const { default: MDXContent } = await evaluate(source, {
    rehypePlugins: NEXT_REHYPE_PLUGINS,
    remarkPlugins: NEXT_REMARK_PLUGINS,
    format: fileExtension,
    // Provide the JSX Runtime to the MDX Compiler
    ...jsxRuntime,
  });

  // Retrieve some parsed data from the VFile metadata
  // such as frontmatter and Markdown headings
  const { headings, matter: frontmatter } = source.data;

  return { MDXContent, headings, frontmatter };
}
