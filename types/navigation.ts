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
