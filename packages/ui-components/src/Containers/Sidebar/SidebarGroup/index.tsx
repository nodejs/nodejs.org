import classNames from 'classnames';

import SidebarCollapsible from '#ui/Containers/Sidebar/SidebarCollapsible';
import SidebarItem from '#ui/Containers/Sidebar/SidebarItem';
import { findActiveItem } from '#ui/Containers/Sidebar/utils';

import type { SidebarItemType } from '#ui/Containers/Sidebar/utils';
import type { FormattedMessage, LinkLike } from '#ui/types';
import type { FC } from 'react';

import styles from './index.module.css';

type SidebarGroupProps = {
  groupName: FormattedMessage;
  items: Array<SidebarItemType>;
  as?: LinkLike;
  pathname?: string;
  className?: string;
};

const renderItems = (
  items: Array<SidebarItemType>,
  props: { as?: LinkLike },
  pathname?: string
) => {
  return items.map(({ label, link, items: subItems }) => {
    if (subItems && subItems.length > 0) {
      const isOpen =
        link === pathname || findActiveItem(subItems, pathname) !== undefined;

      return (
        <li key={link}>
          <SidebarCollapsible
            summary={label}
            open={isOpen}
            className={styles.subGroup}
          >
            <ul className={styles.subItemList}>
              {renderItems(subItems, props, pathname)}
            </ul>
          </SidebarCollapsible>
        </li>
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
