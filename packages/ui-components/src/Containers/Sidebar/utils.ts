import type { FormattedMessage } from '#ui/types';

export type SidebarItemType = {
  label: FormattedMessage;
  link: string;
  target?: string;
  items?: Array<SidebarItemType>;
};

/**
 * Finds the item whose link matches the pathname, searching nested items
 * depth-first.
 */
export const findActiveItem = (
  items: Array<SidebarItemType>,
  pathname?: string
): SidebarItemType | undefined => {
  for (const item of items) {
    if (item.link === pathname) {
      return item;
    }

    const active = item.items && findActiveItem(item.items, pathname);

    if (active) {
      return active;
    }
  }
};
