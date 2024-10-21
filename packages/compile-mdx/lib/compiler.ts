import { evaluate } from '@mdx-js/mdx';
import type { RunOptions, Jsx } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime'
import type { PluggableList } from 'unified';
import type { VFile } from 'vfile';
import { matter } from 'vfile-matter';

type CompileMDXArgs = {
  source: VFile;
  rehypePlugins?: PluggableList;
  remarkPlugins?: PluggableList;
  fileExtension: 'md' | 'mdx';
};

// Define the runtime for the MDX Compiler
const reactRuntime = {
  Fragment: runtime.Fragment,
  jsx: runtime.jsx as Jsx,
  jsxs: runtime.jsxs as Jsx,
} satisfies RunOptions;

/**
 * This is our custom simple MDX Compiler that is used to compile Markdown and MDX
 * this returns a serializable VFile as a string that then gets passed to our MDX Provider
 */
export async function compileMDX({
  source,
  fileExtension,
  rehypePlugins,
  remarkPlugins,
}: CompileMDXArgs) {
  // Parses the Frontmatter to the VFile and removes from the original source
  // cleaning the frontmatter to the source that is going to be parsed by the MDX Compiler
  matter(source, { strip: true });

  // This is a minimal MDX Compiler that is lightweight and only parses the MDX
  const { default: MDXContent } = await evaluate(source,
    {
    rehypePlugins,
    remarkPlugins,
    format: fileExtension,
    ...reactRuntime,
    }
  );

  return {
    MDXContent,
    source,
  };
}
