// @TODO: These types will be splitted on individual files for better organisation in the future
import type navigation from '../navigation.json';

export type NavigationKeys = keyof typeof navigation;

export interface RSSFeed {
  link: string;
  title: string;
  description?: string;
  blogCategory?: string;
}

export interface WebsiteBanner {
  startDate: string;
  endDate: string;
  text?: string;
  html?: string;
  link: string;
}

export interface TwitterConfig {
  username: string;
  card: string;
  img: string;
  imgAlt: string;
}

export interface OGConfig {
  imgType: string;
  imgWidth: string;
  imgHeight: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  featuredImage: string;
  favicon: string;
  accentColor: string;
  og: OGConfig;
  twitter: TwitterConfig;
  rssFeeds: Array<RSSFeed>;
  websiteBanners: Record<string, WebsiteBanner>;
}

// @TODO: These are legacy layouts that are going to be replaced with the `nodejs/nodejs.dev` Layouts in the future
export type LegacyLayouts =
  | 'about.hbs'
  | 'blog-index.hbs'
  | 'blog-post.hbs'
  | 'category-index.hbs'
  | 'contribute.hbs'
  | 'index.hbs'
  | 'docs.hbs'
  | 'download.hbs'
  | 'download-current.hbs'
  | 'download-releases.hbs'
  | 'page.hbs';

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

export interface LocaleConfig {
  code: string;
  localName: string;
  name: string;
  langDir: 'rtl' | 'ltr';
  dateFormat: string;
  hrefLang: string;
  enabled: boolean;
}

export interface NavigationEntry {
  translationId: string;
  link: string;
  items?: Record<string, NavigationEntry>;
}

export interface NodeReleaseSchedule {
  start: string;
  end: string;
}

export interface NodeVersionData {
  node: string;
  nodeMajor: string;
  nodeNumeric: string;
  npm: string;
  v8: string;
  openssl: string;
  isLts: boolean;
  schedule?: NodeReleaseSchedule;
}

export interface LocaleContext {
  localeMessages: Record<string, string>;
  availableLocales: LocaleConfig[];
  currentLocale: LocaleConfig;
}

export interface AppProps {
  nodeVersionData: NodeVersionData[];
  localeMessages: Record<string, string>;
  currentLocale: LocaleConfig;
}
