import type { MDXComponents } from 'mdx/types';

import Blockquote from './components/Common/Blockquote';
import Button from './components/Common/Button';
import LinkWithArrow from './components/Downloads/Release/LinkWithArrow';
import Link from './components/Link';
import MDXCodeBox from './components/MDX/CodeBox';
import MDXCodeTabs from './components/MDX/CodeTabs';
import MDXImage from './components/MDX/Image';

/**
 * A full list of React Components that we want to pass through to MDX
 */
export const clientMdxComponents = {
  // Renders MDX CodeTabs
  CodeTabs: MDXCodeTabs,
  // Renders a Button Component for `button` tags
  Button: Button,
  // Links with External Arrow
  LinkWithArrow: LinkWithArrow,
  // Regular links (without arrow)
  Link: Link,
} satisfies MDXComponents;

/**
 * A full list of wired HTML elements into custom React Components
 */
export const htmlComponents: MDXComponents = {
  // Renders a Link Component for `a` tags
  a: Link,
  // Renders a Blockquote Component for `blockquote` tags
  blockquote: Blockquote,
  // Renders a CodeBox Component for `pre` tags
  pre: MDXCodeBox,
  // Renders an Image Component for `img` tags
  // @ts-expect-error - MDXImage is a wrapper of Next Image so it's didn't have same props as HTMLImageElement
  img: MDXImage,
};
