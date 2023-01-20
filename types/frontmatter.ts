import type { LegacyLayouts } from './layouts';

// @TODO: This is the legacy frontmatter configuration going to be replaced in the future with the `ndoejs/nodejs.dev` one
// this is going to be done via a script that replaces layouts
// Note.: The current legacy pages have other frontmatter entries but they're irrelevant
export interface LegacyFrontMatter {
  layout: LegacyLayouts;
  title?: string;
  robots?: string;
  labels?: Record<string, string>;
}

// @TODO: This is the legacy frontmatter configuration going to be replaced in the future with the `ndoejs/nodejs.dev` one
// this is going to be done via a script that replaces layouts
export interface LegacyBlogFrontMatter extends LegacyFrontMatter {
  author: string;
  date: string;
}

export interface LegacyDownloadsFrontMatter extends LegacyFrontMatter {
  downloads: Record<string, string>;
  additional: Record<string, string>;
}

export interface LegacyDownloadsReleasesFrontMatter extends LegacyFrontMatter {
  modules: string;
}
