import classNames from 'classnames';

import SidebarItem from '#ui/Containers/Sidebar/SidebarItem';

import type { FormattedMessage, LinkLike } from '#ui/types';
import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

type SidebarItemType = Omit<
  ComponentProps<typeof SidebarItem>,
  'as' | 'pathname'
> & {
  items?: Array<SidebarItemType>;
};

type SidebarGroupProps = {
  groupName: FormattedMessage;
  items: Array<SidebarItemType>;
  as?: LinkLike;
  pathname?: string;
  className?: string;
};

const hasActivePath = (
  items: Array<SidebarItemType>,
  pathname?: string
): boolean => {
  return items.some(
    item =>
      item.link === pathname ||
      (item.items && hasActivePath(item.items, pathname))
  );
};

const renderItems = (
  items: Array<SidebarItemType>,
  props: { as?: LinkLike },
  pathname?: string
) => {
  return items.map(({ label, link, items: subItems }) => {
    if (subItems && subItems.length > 0) {
      const isOpen = hasActivePath(subItems, pathname);
      return (
        <details
          key={label as string}
          className={styles.subGroup}
          open={isOpen || undefined}
        >
          <summary className={styles.summary}>{label}</summary>
          <ul className={styles.subItemList}>
            {renderItems(subItems, props, pathname)}
          </ul>
        </details>
      );
    }
    return (
      <SidebarItem
        key={link}
        label={label}
        link={link}
        pathname={pathname}
        {...props}
      />
    );
  });
};

const SidebarGroup: FC<SidebarGroupProps> = ({
  groupName,
  items,
  className,
  pathname,
  ...props
}) => (
  <section className={classNames(styles.group, className)}>
    <label className={styles.groupName}>{groupName}</label>
    <ul className={styles.itemList}>{renderItems(items, props, pathname)}</ul>
  </section>
);

export default SidebarGroup;
