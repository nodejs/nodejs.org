'use strict';

import DownloadReleasesTable from './components/Downloads/DownloadReleasesTable';
import DownloadsTable from './components/Downloads/DownloadsTable';
import { MinorReleasesTable } from './components/Downloads/MinorReleasesTable';
import { ReleaseOverview } from './components/Downloads/ReleaseOverview';
import UpcomingMeetings from './components/MDX/Calendar/UpcomingMeetings';
import WithBadgeGroup from './components/withBadgeGroup';
import WithBanner from './components/withBanner';
import WithDownloadArchive from './components/withDownloadArchive';
import WithNodeRelease from './components/withNodeRelease';
import WithReleaseAlertBox from './components/withReleaseAlertBox';

/**
 * A full list of React Components that we want to pass through to MDX
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export const mdxComponents = {
  DownloadReleasesTable: DownloadReleasesTable,
  // HOC for providing the Download Archive Page properties
  WithDownloadArchive: WithDownloadArchive,
  // Renders a table with Node.js Releases with different platforms and architectures
  DownloadsTable: DownloadsTable,
  // HOC for getting Node.js Release Metadata
  WithNodeRelease: WithNodeRelease,
  // Renders an alert box with the given release status
  WithReleaseAlertBox: WithReleaseAlertBox,
  // HOC for providing Banner Data
  WithBanner: WithBanner,
  // HOC for providing Badge Data
  WithBadgeGroup: WithBadgeGroup,
  // Renders an container for Upcoming Node.js Meetings
  UpcomingMeetings: UpcomingMeetings,
  // Renders the Release Overview for a specified version
  ReleaseOverview: ReleaseOverview,
  // Renders a table with all the Minor Releases for a Major Version
  MinorReleasesTable: MinorReleasesTable,
};
