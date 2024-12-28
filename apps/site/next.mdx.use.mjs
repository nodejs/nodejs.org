'use strict';

import DownloadReleasesTable from './components/Downloads/DownloadReleasesTable';
import UpcomingMeetings from './components/MDX/Calendar/UpcomingMeetings';
import WithBadge from './components/withBadge';
import WithBanner from './components/withBanner';
import WithNodeRelease from './components/withNodeRelease';

/**
 * A full list of React Components that we want to pass through to MDX
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export const mdxComponents = {
  DownloadReleasesTable: DownloadReleasesTable,
  // HOC for getting Node.js Release Metadata
  WithNodeRelease: WithNodeRelease,
  // HOC for providing Banner Data
  WithBanner: WithBanner,
  // HOC for providing Badge Data
  WithBadge: WithBadge,
  // Renders an container for Upcoming Node.js Meetings
  UpcomingMeetings: UpcomingMeetings,
};
