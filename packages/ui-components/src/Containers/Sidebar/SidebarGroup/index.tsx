import classNames from 'classnames';

import SidebarItem from '#ui/Containers/Sidebar/SidebarItem';

import type { FormattedMessage, LinkLike } from '#ui/types';
import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

type SidebarGroupProps = {
  groupName: FormattedMessage;
  items: Array<Omit<ComponentProps<typeof SidebarItem>, 'as' | 'pathname'>>;
  as?: LinkLike;
  pathname?: string;
  className: string;
};

const SidebarGroup: FC<SidebarGroupProps> = ({
  groupName,
  items,
  className,
  ...props
}) => (
  <section className={classNames(styles.group, className)}>
    <label className={styles.groupName}>{groupName}</label>
    <ul className={styles.itemList}>
      {items.map(({ label, link }) => (
        <SidebarItem key={link} label={label} link={link} {...props} />
      ))}
    </ul>
  </section>
);

export default SidebarGroup;
