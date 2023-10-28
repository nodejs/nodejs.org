'use strict';

import NodeApiVersionLinks from '@/components/Docs/NodeApiVersionLinks';
import DownloadReleasesTable from '@/components/Downloads/DownloadReleasesTable';
import Banner from '@/components/Home/Banner';
import HomeDownloadButton from '@/components/Home/HomeDownloadButton';
import LocalizedLink from '@/components/LocalizedLink';
import { WithNodeRelease } from '@/providers/withNodeRelease';

/**
 * A full list of React Components that we want to passthrough to MDX
 *
 * @type {import('mdx/types').MDXComponents}
 */
export const mdxComponents = {
  NodeApiVersionLinks,
  WithNodeRelease,
  HomeDownloadButton,
  DownloadReleasesTable,
  Banner,
};

/**
 * A full list of wired HTML elements into custom React Components
 *
 * @type {import('mdx/types').MDXComponents}
 */
export const htmlComponents = {
  a: LocalizedLink,
  blockquote: ({ children }) => <div className="highlight-box">{children}</div>,
};
