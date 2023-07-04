import { memo } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { LayoutProvider } from './providers/layoutProvider';
import { MDXProvider } from './providers/mdxProvider';
import HtmlHead from './components/HtmlHead';
import type { FC, PropsWithChildren } from 'react';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

type ThemeProps = PropsWithChildren<{
  content?: MDXRemoteSerializeResult;
}>;

const Theme: FC<ThemeProps> = ({ content, children }) => (
  <>
    <HtmlHead frontMatter={content?.frontmatter || {}} />
    <LayoutProvider frontMatter={content?.frontmatter || {}}>
      <MDXProvider>{content && <MDXRemote {...content} />}</MDXProvider>

      {children}
    </LayoutProvider>
  </>
);

export default memo(
  Theme,
  // The Theme Component is supposed to be used only for static Children or MDXRemote content
  // that comes from `getStaticProps`. This means that the `props` should never change.
  // At least the `props.content` should never. We should not calculate based on `children`
  // As this component should never have a dynamic children
  (prev, next) => JSON.stringify(prev.content) === JSON.stringify(next.content)
);
