import type navigation from '../navigation.json';

export type NavigationKeys = keyof typeof navigation;

export interface NavigationEntry {
  translationId: string;
  link: string;
  items?: Record<string, NavigationEntry>;
}
