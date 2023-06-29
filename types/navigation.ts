export type NavigationKeys =
  | 'home'
  | 'about'
  | 'download'
  | 'docs'
  | 'getInvolved'
  | 'security'
  | 'certification'
  | 'blog';

export interface NavigationEntry {
  translationId: string;
  link: string;
  items?: Record<string, NavigationEntry>;
}
