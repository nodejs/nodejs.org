'use strict';

import Blockquote from './components/Common/Blockquote';
import Button from './components/Common/Button';
import DownloadButton from './components/Downloads/DownloadButton';
import DownloadLink from './components/Downloads/DownloadLink';
import DownloadReleasesTable from './components/Downloads/DownloadReleasesTable';
import HomeDownloadButton from './components/Home/HomeDownloadButton';
import Link from './components/Link';
import UpcomingEvents from './components/MDX/Calendar/UpcomingEvents';
import UpcomingSummits from './components/MDX/Calendar/UpcomingSummits';
import MDXCodeBox from './components/MDX/CodeBox';
import MDXCodeTabs from './components/MDX/CodeTabs';
import SearchPage from './components/MDX/SearchPage';
import WithBadge from './components/withBadge';
import WithBanner from './components/withBanner';
import WithNodeRelease from './components/withNodeRelease';
import { ENABLE_WEBSITE_REDESIGN } from './next.constants.mjs';

/**
 * A full list of React Components that we want to pass through to MDX
 *
 * @type {import('mdx/types').MDXComponents}
 */
export const mdxComponents = {
  // Legacy Component
  HomeDownloadButton: HomeDownloadButton,
  // Legacy Component
  DownloadReleasesTable: DownloadReleasesTable,
  // HOC for getting Node.js Release Metadata
  WithNodeRelease: WithNodeRelease,
  // HOC for providing Banner Data
  WithBanner: WithBanner,
  // HOC for providing Badge Data
  WithBadge: WithBadge,
  // Renders MDX CodeTabs
  CodeTabs: MDXCodeTabs,
  // Renders a Download Button
  DownloadButton: DownloadButton,
  // Renders a Download Link
  DownloadLink: DownloadLink,
  // Renders a Button Component for `button` tags
  Button: Button,
  // Renders a Search Page
  SearchPage: SearchPage,
  // Renders an container for Upcoming Node.js Summits
  UpcomingSummits: UpcomingSummits,
  // Renders an container for Upcoming Node.js Events
  UpcomingEvents: UpcomingEvents,
};

/**
 * A full list of wired HTML elements into custom React Components
 *
 * @type {import('mdx/types').MDXComponents}
 */
export const htmlComponents = {
  // Renders a Link Component for `a` tags
  a: Link,
  // @deprecated once the website redesign happens
  // switch to only use the Blockquote Component
  blockquote: ENABLE_WEBSITE_REDESIGN
    ? Blockquote
    : ({ children }) => <div className="highlight-box">{children}</div>,
  // Renders a CodeBox Component for `pre` tags
  pre: MDXCodeBox,
};
