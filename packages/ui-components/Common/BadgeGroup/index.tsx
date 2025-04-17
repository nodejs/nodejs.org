import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import Badge from '@node-core/ui-components/Common/Badge';
import type { LinkLike } from '@node-core/ui-components/types';

import styles from './index.module.css';

type BadgeGroupKind = 'default' | 'warning' | 'error';

type BadgeGroupProps = {
  kind?: BadgeGroupKind;
  badgeText?: string;
  as: LinkLike;
} & ComponentProps<LinkLike>;

const BadgeGroup: FC<PropsWithChildren<BadgeGroupProps>> = ({
  kind = 'default',
  badgeText,
  children,
  as: Component = 'a',
  ...args
}) => (
  <Component className={`${styles.wrapper} ${styles[kind]}`} {...args}>
    {badgeText && (
      <Badge kind={kind} className={styles.badge}>
        {badgeText}
      </Badge>
    )}
    <span className={styles.message}>{children}</span>
    {args.href && <ArrowRightIcon className={styles.icon} />}
  </Component>
);

export default BadgeGroup;
