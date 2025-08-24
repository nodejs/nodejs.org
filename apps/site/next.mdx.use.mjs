'use strict';

import BadgeGroup from '@node-core/ui-components/Common/BadgeGroup';

import Button from './components/Common/Button';
import LinkWithArrow from './components/Common/LinkWithArrow';
import DownloadsTable from './components/Downloads/DownloadsTable';
import EOLAlertBox from './components/EOL/EOLAlert';
import EOLReleaseTable from './components/EOL/EOLReleaseTable';
import Link from './components/Link';
import UpcomingMeetings from './components/MDX/Calendar/UpcomingMeetings';
import MinorReleasesTable from './components/Releases/MinorReleasesTable';
import PreviousReleasesTable from './components/Releases/PreviousReleasesTable';
import ReleaseOverview from './components/Releases/ReleaseOverview';
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
  // HOC for providing the Download Archive Page properties
  WithDownloadArchive,
  // Renders a table with Node.js Releases with different platforms and architectures
  DownloadsTable,
  PreviousReleasesTable,
  // HOC for getting Node.js Release Metadata
  WithNodeRelease,
  // Renders an alert box with the given release status
  WithReleaseAlertBox,
  // HOC for providing Banner Data
  WithBanner,
  // HOC for providing Badge Data
  WithBadgeGroup,
  // Standalone Badge Group
  BadgeGroup,
  // Renders the Release Overview for a specified version
  ReleaseOverview,
  // Renders a table with all the Minor Releases for a Major Version
  MinorReleasesTable,
  // Renders an container for Upcoming Node.js Meetings
  UpcomingMeetings,
  // Renders an EOL alert
  EOLAlertBox,
  // Renders the EOL Table
  EOLReleaseTable,
  // Renders a Button Component for `button` tags
  Button,
  // Regular links (without arrow)
  Link,
  // Links with External Arrow
  LinkWithArrow,
};
