'use strict';

import { compile as mdxCompile } from '@mdx-js/mdx';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { matter } from 'vfile-matter';

import { createSval } from './next.jsx.compiler.mjs';
import { REHYPE_PLUGINS, REMARK_PLUGINS } from './next.mdx.plugins.mjs';
import { createGitHubSlugger } from './util/gitHubUtils';

// Defines a JSX Fragment and JSX Runtime for the MDX Compiler
export const reactRuntime = { Fragment, jsx, jsxs };

/**
 * This is our custom simple MDX Compiler that is used to compile Markdown and MDX
 * this returns a serializable VFile as a string that then gets passed to our MDX Provider
 *
 * @param {import('vfile').VFile} source The source Markdown/MDX content
 * @param {'md' | 'mdx'} fileExtension If it should use the MDX or a plain Markdown parser/compiler
 * @param {import('mdx/types').MDXComponents} components The MDX Components to be used in the MDX Provider
 * @param {Record<string, any>} props Extra optional React props for the MDX Provider
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
  components = {},
  props = {}
) {
  // Parses the Frontmatter to the VFile and removes from the original source
  // cleaning the frontmatter to the source that is going to be parsed by the MDX Compiler
  matter(source, { strip: true });

  // Creates a GitHub slugger to generate the same slugs as GitHub
  const slugger = createGitHubSlugger();

  // Compiles the MDX/Markdown source into a serializable VFile
  const compiled = await mdxCompile(source, {
    rehypePlugins: REHYPE_PLUGINS,
    remarkPlugins: REMARK_PLUGINS,
    format: fileExtension,
  });

  const interpreter = createSval({
    ...components,
    'react/jsx-runtime': reactRuntime,
  });

  // Run the compiled JavaScript code from MDX
  interpreter.run(compiled.toString());

  // Retrieve the default export from the compiled MDX
  const MDXContent = interpreter.exports.default;

  // Render the MDX content directly from the compiler
  const content = <MDXContent {...props} components={components} />;

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
