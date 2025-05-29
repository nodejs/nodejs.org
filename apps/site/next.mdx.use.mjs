'use strict';

import DownloadReleasesTable from './components/Downloads/DownloadReleasesTable';
import DownloadsTable from './components/Downloads/DownloadsTable';
import UpcomingMeetings from './components/MDX/Calendar/UpcomingMeetings';
import Details from './components/MDX/Details';
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
  // Renders a table with Node.js Releases with diffrent platforms and architectures
  DownloadReleasesTable: DownloadReleasesTable,
  // HOC for providing the Simplified Download Page properties
  WithSimplifiedDownload: WithSimplifiedDownload,
  // Renders a Details Component with a summary and content
  Details: Details,
  // Renders a table with all Node.js Downloads
  DownloadsTable: DownloadsTable,
  // HOC for getting Node.js Release Metadata
  WithNodeRelease: WithNodeRelease,
  // HOC for providing Banner Data
  WithBanner: WithBanner,
  // HOC for providing Badge Data
  WithBadgeGroup: WithBadgeGroup,
  // Renders an container for Upcoming Node.js Meetings
  UpcomingMeetings: UpcomingMeetings,
};
