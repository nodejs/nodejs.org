export type NavigationKeys =
  | 'about'
  | 'download'
  | 'docs'
  | 'getInvolved'
  | 'certification'
  | 'learn'
  | 'blog';

export interface NavigationEntry {
  label?: string;
  link?: string;
  items?: Record<string, NavigationEntry>;
}

export interface SiteNavigation {
  topNavigation: Record<NavigationKeys, NavigationEntry>;
  sideNavigation: Record<NavigationKeys, NavigationEntry>;
}
