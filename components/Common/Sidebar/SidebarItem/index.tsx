import type { FC } from 'react';

import ActiveLink from '@/components/Common/ActiveLink';
import type { FormattedMessage } from '@/types';

import styles from './index.module.css';

type SidebarItemProps = {
  title: FormattedMessage;
  url: string;
};

const SidebarItem: FC<SidebarItemProps> = ({ url, title }) => (
  <li className={styles.sideBarItem}>
    <ActiveLink href={url} activeClassName={styles.active}>
      {title}
    </ActiveLink>
  </li>
);

export default SidebarItem;
