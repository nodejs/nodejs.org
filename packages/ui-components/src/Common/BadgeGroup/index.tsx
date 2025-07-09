import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import Badge from '#ui/Common/Badge';
import type { LinkLike } from '#ui/types';

import styles from './index.module.css';

type BadgeGroupProps = {
  kind?: ComponentProps<typeof Badge>['kind'];
  size?: ComponentProps<typeof Badge>['size'];
  badgeText?: string;
  as: LinkLike;
} & ComponentProps<LinkLike>;

const BadgeGroup: FC<PropsWithChildren<BadgeGroupProps>> = ({
  kind = 'default',
  size = 'medium',
  badgeText,
  children,
  as: Component = 'a',
  ...args
}) => (
  <Component className={`${styles.wrapper} ${styles[kind]}`} {...args}>
    {badgeText && (
      <Badge kind={kind} size={size} className={styles.badge}>
        {badgeText}
      </Badge>
    )}

    <span className={styles.message}>{children}</span>

    {args.href && <ArrowRightIcon className={styles.icon} />}
  </Component>
);

export default BadgeGroup;
