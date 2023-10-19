export type NavigationKeys =
  | 'about'
  | 'download'
  | 'docs'
  | 'getInvolved'
  | 'certification'
  | 'blog';

export interface NavigationEntry {
  translationId: string;
  link: string;
  items?: Record<string, NavigationEntry>;
}
