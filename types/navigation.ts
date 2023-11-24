import type { useTranslations } from 'next-intl';

export type NavigationKeys =
  | 'about'
  | 'download'
  | 'docs'
  | 'getInvolved'
  | 'certification'
  | 'learn'
  | 'blog';

export interface NavigationEntry {
  translationId: string;
  link: string;
  items?: Record<string, NavigationEntry>;
}

export interface MappedNavigationEntry {
  text: ReturnType<ReturnType<typeof useTranslations>['rich']>;
  link: string;
  key: string;
  level: number;
  items: MappedNavigationEntry[];
}
