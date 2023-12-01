import type { FC } from 'react';

import ActiveLink from '@/components/Common/ActiveLink';
import ProgressionSidebarIcon from '@/components/Common/ProgressionSideBar/ProgressionSideBarIcon';
import type { FormattedMessage } from '@/types';

import styles from './index.module.css';

type ProgressionSideBarItemProps = {
  url: string;
  title: FormattedMessage;
};

const ProgressionSideBarItem: FC<ProgressionSideBarItemProps> = ({
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

export default ProgressionSideBarItem;
