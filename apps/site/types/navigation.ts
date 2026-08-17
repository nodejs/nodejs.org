import type { IntlMessageKeys } from './i18n';
import type { HTMLAttributeAnchorTarget } from 'react';

export type FooterConfig = {
  text: IntlMessageKeys;
  link: string;
};

export type SocialConfig = {
  icon: string;
  link: string;
  alt?: string;
};

export type NavigationKeys =
  | 'about'
  | 'download'
  | 'docs'
  | 'betaDocs'
  | 'getInvolved'
  | 'certification'
  | 'learn'
  | 'blog';

export type NavigationEntry = {
  label?: IntlMessageKeys;
  link?: string;
  items?: Record<string, NavigationEntry>;
  target?: HTMLAttributeAnchorTarget | undefined;
  accent?: boolean;
};

export type SiteNavigation = {
  topNavigation: Record<NavigationKeys, NavigationEntry>;
  footerLinks: Array<FooterConfig>;
  socialLinks: Array<SocialConfig>;
  sideNavigation: Record<NavigationKeys, NavigationEntry>;
};
