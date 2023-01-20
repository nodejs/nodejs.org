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
