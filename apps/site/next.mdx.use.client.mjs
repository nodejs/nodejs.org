'use strict';

import Blockquote from './components/Common/Blockquote';
import Button from './components/Common/Button';
import DownloadButton from './components/Downloads/DownloadButton';
import DownloadLink from './components/Downloads/DownloadLink';
import BlogPostLink from './components/Downloads/Release/BlogPostLink';
import ChangelogLink from './components/Downloads/Release/ChangelogLink';
import ReleaseDownloadLink from './components/Downloads/Release/DownloadLink';
import ReleaseInstallationMethodDropdown from './components/Downloads/Release/InstallationMethodDropdown';
import ReleaseOperatingSystemDropdown from './components/Downloads/Release/OperatingSystemDropdown';
import ReleasePackageManagerDropdown from './components/Downloads/Release/PackageManagerDropdown';
import ReleasePlatformDropdown from './components/Downloads/Release/PlatformDropdown';
import ReleasePrebuiltDownloadButtons from './components/Downloads/Release/PrebuiltDownloadButtons';
import ReleaseCodeBox from './components/Downloads/Release/ReleaseCodeBox';
import ReleaseVersionDropdown from './components/Downloads/Release/VersionDropdown';
import Link from './components/Link';
import LinkWithArrow from './components/LinkWithArrow';
import MDXCodeBox from './components/MDX/CodeBox';
import MDXCodeTabs from './components/MDX/CodeTabs';
import MDXImage from './components/MDX/Image';
import { ReleaseProvider } from './providers/releaseProvider';

/**
 * A full list of React Components that we want to pass through to MDX
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export const clientMdxComponents = {
  // Renders MDX CodeTabs
  CodeTabs: MDXCodeTabs,
  // Renders a Button Component for `button` tags
  Button: Button,
  // Links with External Arrow
  LinkWithArrow: LinkWithArrow,
  // Regular links (without arrow)
  Link: Link,
  // Renders a Download Button
  DownloadButton: DownloadButton,
  // Renders a Download Link
  DownloadLink: DownloadLink,
  // Group of components that enable you to select versions for Node.js
  // releases and download selected versions. Uses `releaseProvider` as a provider
  Release: {
    // Provides an individual Node.js Release Context for Downloads
    Provider: ReleaseProvider,
    // Renders a drop-down menu to select a version
    VersionDropdown: ReleaseVersionDropdown,
    // Renders a drop-down menu to select a platform
    InstallationMethodDropdown: ReleaseInstallationMethodDropdown,
    // Renders a drop-down menu to select a package manager
    PackageManagerDropdown: ReleasePackageManagerDropdown,
    // Renders a drop-down menu to select a bitness
    PlatformDropdown: ReleasePlatformDropdown,
    // Renders a drop-down menu to select an operating system
    OperatingSystemDropdown: ReleaseOperatingSystemDropdown,
    // Renders a Blog Post Link for the selected release
    BlogPostLink: BlogPostLink,
    // Renders a Download Button for the selected release
    PrebuiltDownloadButtons: ReleasePrebuiltDownloadButtons,
    // Renders a Release CodeBox
    ReleaseCodeBox: ReleaseCodeBox,
    // Renders a Changelog Link Button
    ChangelogLink: ChangelogLink,
    // Renders a DownloadLink Button
    DownloadLink: ReleaseDownloadLink,
  },
};

/**
 * A full list of wired HTML elements into custom React Components
 *
 * @type {import('mdx/types').MDXComponents}
 */
export const htmlComponents = {
  // Renders a Link Component for `a` tags
  a: Link,
  // Renders a Blockquote Component for `blockquote` tags
  blockquote: Blockquote,
  // Renders a CodeBox Component for `pre` tags
  pre: MDXCodeBox,
  // Renders an Image Component for `img` tags
  img: MDXImage,
};
