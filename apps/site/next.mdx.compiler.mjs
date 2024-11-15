'use strict';

import { evaluate } from '@mdx-js/mdx';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { matter } from 'vfile-matter';

import { MDX_COMPONENTS } from './next.mdx.components.mjs';
import { REHYPE_PLUGINS, REMARK_PLUGINS } from './next.mdx.plugins.mjs';
import { createGitHubSlugger } from './util/gitHubUtils';

// Defines the React Runtime Components
const reactRuntime = { Fragment, jsx, jsxs };

/**
 * This is our custom Markdown Compiler that is used to compile Markdown files
 *
 * @todo Implement the MDX parsing capabilities for source containing ESTree code
 * @see https://github.com/mdx-js/mdx/blob/main/packages/mdx/lib/node-types.js
 * @see https://www.npmjs.com/package/sval
 * @see https://github.com/syntax-tree/hast-util-to-jsx-runtime
 *
 * @param {string} source The source content of the Markdown file
 * @param {import('mdx/types').MDXComponents} components
 *
 * @returns {Promise<import('react').ReactElement>} The compiled MD into React
 */
const getMarkdownParser = async (source, components) => {
  const parser = unified()
    .use(remarkParse)
    .use(REMARK_PLUGINS)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(REHYPE_PLUGINS)
    .use(rehypeReact, { ...reactRuntime, components });

  const { result } = await parser.process(source);

  return result;
};

/**
 * This is our custom MDX Compiler that is used to compile MDX files
 * this returns a serializable VFile as a string that then gets passed to our MDX Provider
 *
 * @deprecated This should be replaced by a non eval'd approach
 * @param {string} source MDX source content from the MDX file
 * @param {import('mdx/types').MDXComponents} components
 *
 * @returns {Promise<import('react').ReactElement>} The compiled MDX into React
 */
const getMdxParser = async (source, components) => {
  const { default: MDXContent } = await evaluate(source, {
    rehypePlugins: REHYPE_PLUGINS,
    remarkPlugins: REMARK_PLUGINS,
    format: 'mdx',
    ...reactRuntime,
  });

  return <MDXContent components={components} />;
};

/**
 * This is our custom simple MDX Compiler that is used to compile Markdown and MDX
 * this returns a serializable VFile as a string that then gets passed to our MDX Provider
 *
 * @param {import('vfile').VFile} source
 * @param {'md' | 'mdx'} fileExtension
 * @param {import('mdx/types').MDXComponents} components
 *
 * @returns {Promise<{
 *   content: import('react').ReactElement;
 *   headings: Array<import('@vcarl/remark-headings').Heading>;
 *   frontmatter: Record<string, any>;
 *   readingTime: import('reading-time').ReadTimeResults;
 * }>}
 */
export async function compile(
  source,
  fileExtension,
  components = MDX_COMPONENTS
) {
  // Parses the Frontmatter to the VFile and removes from the original source
  // cleaning the frontmatter to the source that is going to be parsed by the MDX Compiler
  matter(source, { strip: true });

  // Creates a GitHub slugger to generate the same slugs as GitHub
  const slugger = createGitHubSlugger();

  const content =
    fileExtension === 'mdx'
      ? await getMdxParser(source, components)
      : await getMarkdownParser(source, components);

  // Retrieve some parsed data from the VFile metadata
  // such as frontmatter and Markdown headings
  const { headings = [], matter: frontmatter, readingTime } = source.data;

  headings.forEach(heading => {
    // we re-sluggify the links to match the GitHub slugger
    // since some also do not come with sluggifed links
    heading.data = { ...heading.data, id: slugger(heading.value) };
  });

  return { content, headings, frontmatter, readingTime };
}
