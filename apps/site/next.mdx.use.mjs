'use strict';

import DownloadReleasesTable from './components/Downloads/DownloadReleasesTable';
import SimplifiedDownloadTable from './components/Downloads/SimplifiedDownloadTable';
import UpcomingMeetings from './components/MDX/Calendar/UpcomingMeetings';
import WithBadgeGroup from './components/withBadgeGroup';
import WithBanner from './components/withBanner';
import WithNodeRelease from './components/withNodeRelease';
import WithSimplifiedDownload from './components/withSimplifiedDownload';

/**
 * A full list of React Components that we want to pass through to MDX
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export const mdxComponents = {
  DownloadReleasesTable: DownloadReleasesTable,
  WithSimplifiedDownload: WithSimplifiedDownload,
  SimplifiedDownloadTable: SimplifiedDownloadTable,
  // HOC for getting Node.js Release Metadata
  WithNodeRelease: WithNodeRelease,
  // HOC for providing Banner Data
  WithBanner: WithBanner,
  // HOC for providing Badge Data
  WithBadgeGroup: WithBadgeGroup,
  // Renders an container for Upcoming Node.js Meetings
  UpcomingMeetings: UpcomingMeetings,
};
