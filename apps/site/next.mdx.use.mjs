'use strict';

import BadgeGroup from '@node-core/ui-components/Common/BadgeGroup';

import Button from './components/Common/Button';
import DownloadReleasesTable from './components/Downloads/DownloadReleasesTable';
import Link from './components/Link';
import LinkWithArrow from './components/LinkWithArrow';
import UpcomingMeetings from './components/MDX/Calendar/UpcomingMeetings';
import WithBadgeGroup from './components/withBadgeGroup';
import WithBanner from './components/withBanner';
import WithNodeRelease from './components/withNodeRelease';

/**
 * A full list of React Components that we want to pass through to MDX
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export const mdxComponents = {
  DownloadReleasesTable,
  // HOC for getting Node.js Release Metadata
  WithNodeRelease,
  // HOC for providing Banner Data
  WithBanner,
  // HOC for providing Badge Data
  WithBadgeGroup,
  // Standalone Badge Group
  BadgeGroup,
  // Renders an container for Upcoming Node.js Meetings
  UpcomingMeetings,
  // Renders a Button Component for `button` tags
  Button,
  // Regular links (without arrow)
  Link,
  // Links with External Arrow
  LinkWithArrow,
};
