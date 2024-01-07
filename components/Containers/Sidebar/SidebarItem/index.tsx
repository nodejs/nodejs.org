import type { FC } from 'react';

import ActiveLink from '@/components/Common/ActiveLink';
import type { FormattedMessage } from '@/types';

import styles from './index.module.css';

type SidebarItemProps = {
  label: FormattedMessage;
  link: string;
};

const SidebarItem: FC<SidebarItemProps> = ({ label, link }) => (
  <li className={styles.sideBarItem}>
    <ActiveLink href={link} activeClassName={styles.active}>
      {label}
    </ActiveLink>
  </li>
);

export default SidebarItem;
