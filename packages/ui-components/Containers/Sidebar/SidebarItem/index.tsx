import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import type { FC } from 'react';

import ActiveLink from '@node-core/ui-components/Common/BaseActiveLink';
import type {
  FormattedMessage,
  LinkLike,
} from '@node-core/ui-components/types';

import styles from './index.module.css';

type SidebarItemProps = {
  label: FormattedMessage;
  link: string;
  as?: LinkLike;
  pathname?: string;
};

const SidebarItem: FC<SidebarItemProps> = ({ label, link, ...props }) => (
  <li className={styles.sideBarItem}>
    <ActiveLink href={link} activeClassName={styles.active} {...props}>
      <span className={styles.label}>{label}</span>

      {link.startsWith('http') && <ArrowUpRightIcon className={styles.icon} />}
    </ActiveLink>
  </li>
);

export default SidebarItem;
