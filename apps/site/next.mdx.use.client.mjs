'use strict';

import Blockquote from './components/Common/Blockquote';
import Button from './components/Common/Button';
import DownloadButton from './components/Downloads/DownloadButton';
import DownloadLink from './components/Downloads/DownloadLink';
import BlogPostLink from './components/Downloads/Release/BlogPostLink';
import ChangelogLink from './components/Downloads/Release/ChangelogLink';
import InstallationMethodDropdown from './components/Downloads/Release/InstallationMethodDropdown';
import LinkWithArrow from './components/Downloads/Release/LinkWithArrow';
import OperatingSystemDropdown from './components/Downloads/Release/OperatingSystemDropdown';
import PackageManagerDropdown from './components/Downloads/Release/PackageManagerDropdown';
import PlatformDropdown from './components/Downloads/Release/PlatformDropdown';
import PrebuiltDownloadButtons from './components/Downloads/Release/PrebuiltDownloadButtons';
import ReleaseCodeBox from './components/Downloads/Release/ReleaseCodeBox';
import VersionDropdown from './components/Downloads/Release/VersionDropdown';
import Link from './components/Link';
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
    VersionDropdown: VersionDropdown,
    // Renders a drop-down menu to select a platform
    InstallationMethodDropdown: InstallationMethodDropdown,
    // Renders a drop-down menu to select a package manager
    PackageManagerDropdown: PackageManagerDropdown,
    // Renders a drop-down menu to select a bitness
    PlatformDropdown: PlatformDropdown,
    // Renders a drop-down menu to select an operating system
    OperatingSystemDropdown: OperatingSystemDropdown,
    // Renders a Blog Post Link for the selected release
    BlogPostLink: BlogPostLink,
    // Renders a Download Button for the selected release
    PrebuiltDownloadButtons: PrebuiltDownloadButtons,
    // Renders a Release CodeBox
    ReleaseCodeBox: ReleaseCodeBox,
    // Renders a Changelog Modal Link Button
    ChangelogLink: ChangelogLink,
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
