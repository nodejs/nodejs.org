'use strict';

import BadgeGroup from '@node-core/ui-components/Common/BadgeGroup';
import Blockquote from '@node-core/ui-components/Common/Blockquote';
import MDXCodeTabs from '@node-core/ui-components/MDX/CodeTabs';

import Button from '../components/Common/Button';
import LinkWithArrow from '../components/Common/LinkWithArrow';
import DownloadButton from '../components/Downloads/DownloadButton';
import DownloadsTable from '../components/Downloads/DownloadsTable';
import BlogPostLink from '../components/Downloads/Release/BlogPostLink';
import ChangelogLink from '../components/Downloads/Release/ChangelogLink';
import ReleaseDownloadLink from '../components/Downloads/Release/DownloadLink';
import ReleaseInstallationMethodDropdown from '../components/Downloads/Release/InstallationMethodDropdown';
import ReleaseOperatingSystemDropdown from '../components/Downloads/Release/OperatingSystemDropdown';
import ReleasePackageManagerDropdown from '../components/Downloads/Release/PackageManagerDropdown';
import ReleasePlatformDropdown from '../components/Downloads/Release/PlatformDropdown';
import ReleasePrebuiltDownloadButtons from '../components/Downloads/Release/PrebuiltDownloadButtons';
import ReleaseCodeBox from '../components/Downloads/Release/ReleaseCodeBox';
import ReleaseVersionDropdown from '../components/Downloads/Release/VersionDropdown';
import EOLAlertBox from '../components/EOL/EOLAlert';
import EOLReleaseTable from '../components/EOL/EOLReleaseTable';
import Link from '../components/Link';
import UpcomingMeetings from '../components/MDX/Calendar/UpcomingMeetings';
import MDXCodeBox from '../components/MDX/CodeBox';
import MDXImage from '../components/MDX/Image';
import MinorReleasesTable from '../components/Releases/MinorReleasesTable';
import PreviousReleasesTable from '../components/Releases/PreviousReleasesTable';
import ReleaseOverview from '../components/Releases/ReleaseOverview';
import WithBadgeGroup from '../components/withBadgeGroup';
import WithBanner from '../components/withBanner';
import WithDownloadArchive from '../components/withDownloadArchive';
import WithNodeRelease from '../components/withNodeRelease';
import WithReleaseAlertBox from '../components/withReleaseAlertBox';
import WithReleaseSelect from '../components/withReleaseSelect';
import { ReleaseProvider } from '../providers/releaseProvider';

/**
 * A full list of React Components that we want to pass through to MDX
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export default {
  // HTML overrides
  a: Link,
  blockquote: Blockquote,
  pre: MDXCodeBox,
  img: MDXImage,
  // Renders MDX CodeTabs
  CodeTabs: MDXCodeTabs,
  // Renders a Download Button
  DownloadButton,
  // Renders a stateless Release Select Component
  WithReleaseSelect,
  // Group of components that enable you to select versions for Node.js
  // releases and download selected versions. Uses `releaseProvider` as a provider
  Release: {
    Provider: ReleaseProvider,
    VersionDropdown: ReleaseVersionDropdown,
    InstallationMethodDropdown: ReleaseInstallationMethodDropdown,
    PackageManagerDropdown: ReleasePackageManagerDropdown,
    PlatformDropdown: ReleasePlatformDropdown,
    OperatingSystemDropdown: ReleaseOperatingSystemDropdown,
    BlogPostLink,
    PrebuiltDownloadButtons: ReleasePrebuiltDownloadButtons,
    ReleaseCodeBox,
    ChangelogLink,
    DownloadLink: ReleaseDownloadLink,
  },
  // HOC for providing the Download Archive Page properties
  WithDownloadArchive,
  DownloadsTable,
  PreviousReleasesTable,
  WithNodeRelease,
  WithReleaseAlertBox,
  WithBanner,
  WithBadgeGroup,
  BadgeGroup,
  ReleaseOverview,
  MinorReleasesTable,
  UpcomingMeetings,
  EOLAlertBox,
  EOLReleaseTable,
  Button,
  Link,
  LinkWithArrow,
};
