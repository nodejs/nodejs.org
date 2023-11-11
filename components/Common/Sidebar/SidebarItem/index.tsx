import classNames from 'classnames';
import type { FC } from 'react';

import Link from '@/components/Link';

import styles from './index.module.css';

export type SidebarItemProps = {
  url: string;
  title: string;
  active?: boolean;
};

const SidebarItem: FC<SidebarItemProps> = ({ url, title, active = false }) => (
  <li className={classNames(styles.item, { [styles.active]: active })}>
    <Link href={url}>{title}</Link>
  </li>
);

export default SidebarItem;
