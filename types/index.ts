export interface RSSFeed {
  link: string;
  title: string;
  description?: string;
  blogCategory?: string;
}

export interface WebsiteBanner {
  startDate: string;
  endDate: string;
  text: string;
  link: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  featuredImage: string;
  favicon: string;
  accentColor: string;
  display: string;
  ogType: string;
  ogImgType: string;
  ogImgWidth: string;
  ogImgHeight: string;
  twitter: string;
  twitterCard: string;
  twitterImg: string;
  twitterImgAlt: string;
  rssFeeds: Array<RSSFeed>;
  websiteBanners: Record<string, WebsiteBanner>;
}
