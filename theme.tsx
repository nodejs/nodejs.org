import { memo } from 'react';
import { LayoutProvider } from './providers/layoutProvider';
import { MDXProvider } from './providers/mdxProvider';
import HtmlHead from './components/HtmlHead';
import type { FC, PropsWithChildren } from 'react';
import type { DynamicStaticProps } from './types';

type ThemeProps = PropsWithChildren<DynamicStaticProps>;

// This is the Dynamic Page Theme Component that supports Dynamic MDX Page Rendering
// With the dynamic MDXProvider Component.
// @TODO: When migrating to the new Layout approach, each Layout should manually invoke the MDXProvider
// @TODO: And use the MDX Content, Frontmatter, Headings and Children as seemed fit.
const Theme: FC<ThemeProps> = ({ content, frontmatter = {}, children }) => (
  <>
    <HtmlHead frontMatter={frontmatter} />
    <LayoutProvider frontMatter={frontmatter}>
      {content && <MDXProvider content={content} />}

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
  (
    { content: pContent, frontmatter: pFrontmatter },
    { content: nContent, frontmatter: nFrontmatter }
  ) =>
    JSON.stringify([pContent, pFrontmatter]) ===
    JSON.stringify([nContent, nFrontmatter])
);
