'use strict';

import Blockquote from '@node-core/ui-components/Common/Blockquote';

import WithButton from '@/components/withButton';

import LinkWithArrow from './components/Downloads/Release/LinkWithArrow';
import Link from './components/Link';
import MDXCodeBox from './components/MDX/CodeBox';
import MDXCodeTabs from './components/MDX/CodeTabs';
import MDXImage from './components/MDX/Image';

/**
 * A full list of React Components that we want to pass through to MDX
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export const clientMdxComponents = {
  // Renders MDX CodeTabs
  CodeTabs: MDXCodeTabs,
  // Renders a Button Component for `button` tags
  Button: WithButton,
  // Links with External Arrow
  LinkWithArrow: LinkWithArrow,
  // Regular links (without arrow)
  Link: Link,
};

/**
 * A full list of wired HTML elements into custom React Components
 *
 * @type {import('mdx/types').MDXComponents}
 */
export const htmlComponents = {
  // Renders a Link Component for `a` tags
  a: Link,
  // Renders a Blockquote Component for `blockquote` tags
  blockquote: Blockquote,
  // Renders a CodeBox Component for `pre` tags
  pre: MDXCodeBox,
  // Renders an Image Component for `img` tags
  img: MDXImage,
};
