import { MDXRemote } from 'next-mdx-remote';
import { LayoutProvider } from './providers/layoutProvider';
import { MDXProvider } from './providers/mdxProvider';
import HtmlHead from './components/HtmlHead';
import type { FC, PropsWithChildren } from 'react';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

type ThemeProps = PropsWithChildren<{
  content?: MDXRemoteSerializeResult;
}>;

const Theme: FC<ThemeProps> = ({ content, children }) => {
  const frontMatter = content?.frontmatter || {};

  return (
    <>
      <HtmlHead frontMatter={frontMatter} />
      <LayoutProvider frontMatter={frontMatter}>
        <MDXProvider>{content && <MDXRemote {...content} />}</MDXProvider>

        {children}
      </LayoutProvider>
    </>
  );
};

export default Theme;
