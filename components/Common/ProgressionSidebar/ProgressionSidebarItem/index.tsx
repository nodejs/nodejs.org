import classNames from 'classnames';
import type { FC } from 'react';

import ProgressionSidebarIcon from '@/components/Common/ProgressionSidebar/ProgressionSidebarIcon';
import { Link } from '@/navigation.mjs';

import styles from './index.module.css';

type ProgressionSidebarItemProps = {
  url: string;
  title: string;
  isActive?: boolean;
};

const ProgressionSidebarItem: FC<ProgressionSidebarItemProps> = ({
  url,
  title,
  isActive,
}) => (
  <li
    className={classNames(styles.item, {
      [styles.active]: isActive,
    })}
  >
    <Link href={url}>
      <ProgressionSidebarIcon isActive={isActive} />
      {title}
    </Link>
  </li>
);

export default ProgressionSidebarItem;
