'use strict';

import AlertBox from '@node-core/ui-components/Common/AlertBox';
import BadgeGroup from '@node-core/ui-components/Common/BadgeGroup';
import Blockquote from '@node-core/ui-components/Common/Blockquote';
import MDXCodeTabs from '@node-core/ui-components/MDX/CodeTabs';
import {
  MDXTooltip,
  MDXTooltipContent,
  MDXTooltipTrigger,
} from '@node-core/ui-components/MDX/Tooltip';

import Button from '#site/components/Common/Button';
import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import PartnersIconList from '#site/components/Common/Partners/PartnersIconList';
import PartnersLogoList from '#site/components/Common/Partners/PartnersLogoList';
import DownloadButton from '#site/components/Downloads/DownloadButton';
import DownloadsTable from '#site/components/Downloads/DownloadsTable';
import BlogPostLink from '#site/components/Downloads/Release/BlogPostLink';
import ChangelogLink from '#site/components/Downloads/Release/ChangelogLink';
import ReleaseDownloadLink from '#site/components/Downloads/Release/DownloadLink';
import ReleaseInstallationMethodDropdown from '#site/components/Downloads/Release/InstallationMethodDropdown';
import ReleaseOperatingSystemDropdown from '#site/components/Downloads/Release/OperatingSystemDropdown';
import ReleasePackageManagerDropdown from '#site/components/Downloads/Release/PackageManagerDropdown';
import ReleasePlatformDropdown from '#site/components/Downloads/Release/PlatformDropdown';
import ReleasePrebuiltDownloadButtons from '#site/components/Downloads/Release/PrebuiltDownloadButtons';
import ReleaseCodeBox from '#site/components/Downloads/Release/ReleaseCodeBox';
import ReleaseVersionDropdown from '#site/components/Downloads/Release/VersionDropdown';
import EOLAlertBox from '#site/components/EOL/EOLAlert';
import EOLReleaseTable from '#site/components/EOL/EOLReleaseTable';
import Link from '#site/components/Link';
import UpcomingMeetings from '#site/components/MDX/Calendar/UpcomingMeetings';
import MDXCodeBox from '#site/components/MDX/CodeBox';
import MDXImage from '#site/components/MDX/Image';
import MinorReleasesTable from '#site/components/Releases/MinorReleasesTable';
import PreviousReleasesTable from '#site/components/Releases/PreviousReleasesTable';
import ReleaseOverview from '#site/components/Releases/ReleaseOverview';
import WithBadgeGroup from '#site/components/withBadgeGroup';
import WithBanner from '#site/components/withBanner';
import WithDownloadArchive from '#site/components/withDownloadArchive';
import WithNodeRelease from '#site/components/withNodeRelease';
import WithReleaseAlertBox from '#site/components/withReleaseAlertBox';
import WithReleaseSelect from '#site/components/withReleaseSelect';
import WithSupporters from '#site/components/withSupporters';
import { ReleaseProvider } from '#site/providers/releaseProvider';

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
  // Renders a CSS-enhanced Alert Box
  AlertBox,
  // Renders MDX CodeTabs
  CodeTabs: MDXCodeTabs,
  // Renders Tooltips
  MDXTooltip,
  MDXTooltipContent,
  MDXTooltipTrigger,
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
  // Shows a list of Node.js Partners with Icons
  PartnersIconList,
  // Shows a list of Node.js Partners with Logos
  PartnersLogoList,
  // HOC for providing the Download Archive Page properties
  WithDownloadArchive,
  DownloadsTable,
  PreviousReleasesTable,
  WithNodeRelease,
  WithReleaseAlertBox,
  WithBanner,
  WithBadgeGroup,
  // HOC for providing Backers Data
  WithSupporters,
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
