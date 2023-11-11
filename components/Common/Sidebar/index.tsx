import classNames from 'classnames';
import type { FC } from 'react';

import type { SidebarGroupProps } from '@/components/Common/Sidebar/SidebarGroup';
import SidebarGroup from '@/components/Common/Sidebar/SidebarGroup';

import styles from './index.module.css';

type SidebarProps = {
  items: SidebarGroupProps[];
};

const Sidebar: FC<SidebarProps> = ({ items }) => {
  return (
    <div className={classNames(styles.sidebar)}>
      {items.map((item, key) => (
        <SidebarGroup key={key} {...item} />
      ))}
    </div>
  );
};

export default Sidebar;
