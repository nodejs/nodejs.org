export interface RSSFeed {
  file: string;
  title: string;
  category: string;
  description?: string;
}

interface WithRange {
  startDate: string;
  endDate: string;
}

export interface WebsiteBanner extends WithRange {
  text: string;
  link?: string;
  /** @deprecated the html field is unsupported on the website redesign */
  html?: string;
  type?: 'default' | 'warning' | 'error';
}

export interface WebsiteBadge extends WithRange {
  text: string;
  link: string;
  title?: string;
  kind?: 'default' | 'warning' | 'error';
}
