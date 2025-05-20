import type { FC } from 'react';

import BaseActiveLink from '#ui/Common/BaseActiveLink';
import ProgressionSidebarIcon from '#ui/Common/ProgressionSidebar/ProgressionSidebarIcon';
import type { FormattedMessage, LinkLike } from '#ui/types';

import styles from './index.module.css';

type ProgressionSidebarItemProps = {
  label: FormattedMessage;
  link: string;
  as?: LinkLike;
  pathname?: string;
};

const ProgressionSidebarItem: FC<ProgressionSidebarItemProps> = ({
  label,
  link,
  ...props
}) => (
  <BaseActiveLink
    className={styles.item}
    activeClassName={styles.active}
    href={link}
    {...props}
  >
    <ProgressionSidebarIcon />
    {label}
  </BaseActiveLink>
);

export default ProgressionSidebarItem;
