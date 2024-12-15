'use strict';

import DownloadButton from './components/Downloads/DownloadButton';
import DownloadLink from './components/Downloads/DownloadLink';
import DownloadReleasesTable from './components/Downloads/DownloadReleasesTable';
import BitnessDropdown from './components/Downloads/Release/BitnessDropdown';
import BlogPostLink from './components/Downloads/Release/BlogPostLink';
import ChangelogLink from './components/Downloads/Release/ChangelogLink';
import ReleaseDownloadButton from './components/Downloads/Release/DownloadButton';
import NpmLink from './components/Downloads/Release/NpmLink';
import OperatingSystemDropdown from './components/Downloads/Release/OperatingSystemDropdown';
import PlatformDropdown from './components/Downloads/Release/PlatformDropdown';
import ReleaseCodeBox from './components/Downloads/Release/ReleaseCodeBox';
import ReleaseStatus from './components/Downloads/Release/ReleaseStatus';
import ReleaseVersion from './components/Downloads/Release/ReleaseVersion';
import SourceButton from './components/Downloads/Release/SourceButton';
import VerifyingBinariesLink from './components/Downloads/Release/VerifyingBinariesLink';
import VersionDropdown from './components/Downloads/Release/VersionDropdown';
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
  // Renders a Download Button
  DownloadButton: DownloadButton,
  // Renders a Download Link
  DownloadLink: DownloadLink,
  // Renders an container for Upcoming Node.js Meetings
  UpcomingMeetings: UpcomingMeetings,
  // Group of components that enable you to select versions for Node.js
  // releases and download selected versions. Uses `releaseProvider` as a provider
  Release: {
    // Renders a drop-down menu from which the version can select
    VersionDropdown: VersionDropdown,
    // Renders a drop-down menu from which the platform can select
    PlatformDropdown: PlatformDropdown,
    // Renders a drop-down menu from which the bitness can select
    BitnessDropdown: BitnessDropdown,
    // Renders a drop-down menu from which the operating system can select
    OperatingSystemDropdown: OperatingSystemDropdown,
    // Renders a link to the npm version of the selected release
    NpmLink: NpmLink,
    // Renders a release version of the selected release
    Version: ReleaseVersion,
    // Renders a release status of the selected release
    Status: ReleaseStatus,
    // Renders a Blog Post Link for the selected release
    BlogPostLink: BlogPostLink,
    // Renders a Verifying Binaries Link
    VerifyingBinariesLink: VerifyingBinariesLink,
    // Renders a Download Button for the selected release
    DownloadButton: ReleaseDownloadButton,
    // Renders a Source Download Button for the selected release
    SourceButton: SourceButton,
    // Renders a Release CodeBox
    ReleaseCodeBox: ReleaseCodeBox,
    // Renders a Changelog Modal Link Button
    ChangelogLink: ChangelogLink,
  },
};
