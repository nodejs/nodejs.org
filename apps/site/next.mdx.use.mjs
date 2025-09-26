'use strict';

import AlertBox from '@node-core/ui-components/Common/AlertBox/index.js';
import BadgeGroup from '@node-core/ui-components/Common/BadgeGroup';

import Button from './components/Common/Button';
import LinkWithArrow from './components/Common/LinkWithArrow';
import EOLAlertBox from './components/EOL/EOLAlert';
import EOLReleaseTable from './components/EOL/EOLReleaseTable';
import Link from './components/Link';
import UpcomingMeetings from './components/MDX/Calendar/UpcomingMeetings';
import PreviousReleasesTable from './components/Releases/PreviousReleasesTable';
import WithBadgeGroup from './components/withBadgeGroup';
import WithBanner from './components/withBanner';
import WithNodeRelease from './components/withNodeRelease';

/**
 * A full list of React Components that we want to pass through to MDX
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export const mdxComponents = {
  AlertBox,
  PreviousReleasesTable,
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
