import type { Url } from 'url';

export interface SidebarItemType {
  url: string | Url;
  title: string;
}

export interface SidebarGroupType {
  groupName: string;
  items: Array<SidebarItemType>;
}

export type ActiveItem = Pick<SidebarGroupType, 'groupName'> &
  Pick<SidebarItemType, 'title'>;
