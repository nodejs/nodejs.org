import { ArrowUpRightIcon } from '@heroicons/react/24/solid';

import BaseActiveLink from '#ui/Common/BaseActiveLink';

import type { FormattedMessage, LinkLike } from '#ui/types';
import type { FC } from 'react';

import styles from './index.module.css';

type SidebarItemProps = {
  label: FormattedMessage;
  link: string;
  as?: LinkLike;
  pathname?: string;
};

const SidebarItem: FC<SidebarItemProps> = ({ label, link, ...props }) => (
  <li>
    <BaseActiveLink
      className={styles.item}
      href={link}
      activeClassName={styles.active}
      {...props}
    >
      <div className={styles.label}>
        <span>{label}</span>

        {/^https?:/.test(link) && <ArrowUpRightIcon className={styles.icon} />}
      </div>
    </BaseActiveLink>
  </li>
);

export default SidebarItem;
