import type { RSSFeed, WebsiteBadge, WebsiteBanner } from './features';

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

export type LogoVariant = 'default' | 'pride';

export interface SiteConfig {
  title: string;
  description: string;
  featuredImage: string;
  favicon: string;
  lightAccentColor: string;
  darkAccentColor: string;
  og: OGConfig;
  logoVariant: LogoVariant;
  twitter: TwitterConfig;
  rssFeeds: Array<RSSFeed>;
  websiteBanners: Record<string, WebsiteBanner>;
  websiteBadges: Record<string, WebsiteBadge>;
}
