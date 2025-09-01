import type { RSSFeed, WebsiteBadge, WebsiteBanner } from './features';

export type TwitterConfig = {
  username: string;
  card: string;
  img: string;
  imgAlt: string;
};

export type OGConfig = {
  imgType: string;
  imgWidth: string;
  imgHeight: string;
};

export type LogoVariant = 'default' | 'pride';

export type SiteConfig = {
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
};
