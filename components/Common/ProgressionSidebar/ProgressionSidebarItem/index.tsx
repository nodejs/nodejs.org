import type { FC } from 'react';

import ActiveLink from '@/components/Common/ActiveLink';
import ProgressionSidebarIcon from '@/components/Common/ProgressionSidebar/ProgressionSidebarIcon';
import type { FormattedMessage } from '@/types';

import styles from './index.module.css';

type ProgressionSidebarItemProps = {
  label: FormattedMessage;
  link: string;
};

const ProgressionSidebarItem: FC<ProgressionSidebarItemProps> = ({
  label,
  link,
}) => (
  <ActiveLink
    className={styles.item}
    activeClassName={styles.active}
    href={link}
  >
    <ProgressionSidebarIcon />
    {label}
  </ActiveLink>
);

export default ProgressionSidebarItem;
