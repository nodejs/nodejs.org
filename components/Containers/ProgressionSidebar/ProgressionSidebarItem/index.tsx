import type { FC } from 'react';

import ActiveLink from '@/components/Common/ActiveLink';
import ProgressionSidebarIcon from '@/components/Containers/ProgressionSidebar/ProgressionSidebarIcon';

import styles from './index.module.css';

type ProgressionSidebarItemProps = {
  url: string;
  title: string;
};

const ProgressionSidebarItem: FC<ProgressionSidebarItemProps> = ({
  url,
  title,
}) => (
  <ActiveLink
    className={styles.item}
    activeClassName={styles.active}
    href={url}
  >
    <ProgressionSidebarIcon />
    {title}
  </ActiveLink>
);

export default ProgressionSidebarItem;
