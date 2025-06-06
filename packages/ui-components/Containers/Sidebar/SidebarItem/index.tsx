import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import type { FC } from 'react';

import ActiveLink from '#ui/Common/BaseActiveLink';
import type { FormattedMessage, LinkLike } from '#ui/types';

import styles from './index.module.css';
import ProgressionIcon from '../ProgressionIcon';

type SidebarItemProps = {
  label: FormattedMessage;
  link: string;
  as?: LinkLike;
  pathname?: string;
  showProgressionIcon?: boolean;
};

const SidebarItem: FC<SidebarItemProps> = ({
  label,
  link,
  showProgressionIcon = false,
  ...props
}) => (
  <li
    className={classNames({
      [styles.item]: true,
      [styles.progression]: showProgressionIcon,
    })}
  >
    <ActiveLink href={link} activeClassName={styles.active} {...props}>
      {showProgressionIcon && <ProgressionIcon />}
      <span className={styles.label}>{label}</span>

      {link.startsWith('http') && <ArrowUpRightIcon className={styles.icon} />}
    </ActiveLink>
  </li>
);

export default SidebarItem;
