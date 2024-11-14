import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import type { FormattedMessage } from '@node-core/ui-components/types';
import type { FC } from 'react';

import WithActiveLink from '@/components/withActiveLink';

import styles from './index.module.css';

type SidebarItemProps = {
  label: FormattedMessage;
  link: string;
};

const SidebarItem: FC<SidebarItemProps> = ({ label, link }) => (
  <li className={styles.sideBarItem}>
    <WithActiveLink href={link} activeClassName={styles.active}>
      <span className={styles.label}>{label}</span>

      {link.startsWith('http') && <ArrowUpRightIcon className={styles.icon} />}
    </WithActiveLink>
  </li>
);

export default SidebarItem;
