import type { HTMLAttributeAnchorTarget } from 'react';

export interface FooterConfig {
  text: IntlMessageKeys;
  link: string;
}

export interface SocialConfig {
  icon: string;
  link: string;
  alt?: string;
}

export type NavigationKeys =
  | 'about'
  | 'download'
  | 'docs'
  | 'getInvolved'
  | 'certification'
  | 'learn'
  | 'blog';

export interface NavigationEntry {
  label?: IntlMessageKeys;
  link?: string;
  items?: Record<string, NavigationEntry>;
  target?: HTMLAttributeAnchorTarget | undefined;
}

export interface SiteNavigation {
  topNavigation: Record<NavigationKeys, NavigationEntry>;
  footerLinks: Array<FooterConfig>;
  socialLinks: Array<SocialConfig>;
  sideNavigation: Record<NavigationKeys, NavigationEntry>;
}
