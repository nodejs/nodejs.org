export interface RSSFeed {
  file: string;
  title: string;
  description?: string;
  blogCategory?: string;
}

export interface WithRange {
  startDate: string;
  endDate: string;
}

export interface WebsiteBanner extends WithRange {
  text?: string;
  html?: string;
  link: string;
}

export interface WebsiteBadge extends WithRange {
  title?: string;
  text: string;
  link: string;
  kind: 'default' | 'warning' | 'error';
}
