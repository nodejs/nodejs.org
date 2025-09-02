export type RSSFeed = {
  file: string;
  title: string;
  category: string;
  description?: string;
};

type WithRange = {
  startDate: string;
  endDate: string;
};

export type WebsiteBanner = {
  text: string;
  link?: string;
  type?: 'default' | 'warning' | 'error';
} & WithRange;

export type WebsiteBadge = {
  text: string;
  link: string;
  title?: string;
  kind?: 'default' | 'warning' | 'error';
} & WithRange;
