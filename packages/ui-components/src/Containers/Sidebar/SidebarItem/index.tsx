import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import type { FC } from 'react';

import BaseActiveLink from '#ui/Common/BaseActiveLink';
import type { FormattedMessage, LinkLike } from '#ui/types';

import styles from './index.module.css';
import ProgressionIcon from '../ProgressionIcon';

type SidebarItemProps = {
  label: FormattedMessage;
  link: string;
  as?: LinkLike;
  pathname?: string;
  showProgressionIcons?: boolean;
};

const SidebarItem: FC<SidebarItemProps> = ({
  label,
  link,
  showProgressionIcons = false,
  ...props
}) => (
  <BaseActiveLink
    className={classNames({
      [styles.item]: true,
      [styles.progression]: showProgressionIcons,
    })}
    href={link}
    activeClassName={styles.active}
    {...props}
  >
    {showProgressionIcons && <ProgressionIcon className={styles.hexagonIcon} />}

    <div className={styles.label}>
      <span>{label}</span>

      {/^https?:/.test(link) && <ArrowUpRightIcon className={styles.icon} />}
    </div>
  </BaseActiveLink>
);

export default SidebarItem;
