import classNames from 'classnames';
import { useState, type FC } from 'react';

import type { ActiveItem, SidebarGroupType } from '@/types/sidebar';
import SideBarGroup from '@/components/Common/SidebarGroup';

import styles from './index.module.css';

type SideBarGroupProps = { groups: SidebarGroupType[] };

const SideBar: FC<SideBarGroupProps> = ({ groups }) => {
  const [activeItem, setActiveItem] = useState<ActiveItem>();

  return (
    <aside
      className={classNames(styles.sideBar)}
      onClick={e => console.log(e.target)}
    >
      {groups.map(group => (
        <SideBarGroup
          {...group}
          key={group.groupName}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      ))}
    </aside>
  );
};

export default SideBar;
