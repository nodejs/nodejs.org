import { evaluate } from '@mdx-js/mdx';
import type { Heading } from '@vcarl/remark-headings';
import type { MDXContent } from 'mdx/types';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import type { ReadTimeResults } from 'reading-time';
import type { VFile } from 'vfile';
import { matter } from 'vfile-matter';

import { NEXT_REHYPE_PLUGINS, NEXT_REMARK_PLUGINS } from '@/next.mdx';
import { createGitHubSlugger } from '@/util/gitHubUtils';

// Defines the React Runtime Components
const reactRuntime = { Fragment, jsx, jsxs };

/**
 * This is our custom simple MDX Compiler that is used to compile Markdown and MDX
 * this returns a serializable VFile as a string that then gets passed to our MDX Provider
 */
export async function compileMDX(
  source: VFile,
  fileExtension: 'md' | 'mdx'
): Promise<{
  MDXContent: MDXContent;
  headings: Array<Heading>;
  frontmatter: Record<string, unknown>;
  readingTime: ReadTimeResults;
}> {
  // Parses the Frontmatter to the VFile and removes from the original source
  // cleaning the frontmatter to the source that is going to be parsed by the MDX Compiler
  matter(source, { strip: true });

  const slugger = createGitHubSlugger();

  // This is a minimal MDX Compiler that is lightweight and only parses the MDX
  const { default: MDXContent } = await evaluate(source, {
    rehypePlugins: NEXT_REHYPE_PLUGINS,
    remarkPlugins: NEXT_REMARK_PLUGINS,
    format: fileExtension,
    ...reactRuntime,
  });

  // Retrieve some parsed data from the VFile metadata
  // such as frontmatter and Markdown headings
  const {
    headings,
    matter: frontmatter,
    readingTime,
  } = source.data as {
    headings: Array<Heading>;
    matter: Record<string, unknown>;
    readingTime: ReadTimeResults;
  };

  headings.forEach(heading => {
    // we re-sluggify the links to match the GitHub slugger
    // since some also do not come with sluggifed links
    heading.data = { ...heading.data, id: slugger(heading.value) };
  });

  return { MDXContent, headings, frontmatter, readingTime };
}
