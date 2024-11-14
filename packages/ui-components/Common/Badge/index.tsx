import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import type { LinkLike } from '@node-core/ui-components/types';

import styles from './index.module.css';

type BadgeProps = {
  kind?: 'default' | 'warning' | 'error';
  badgeText?: string;
  Wrapper: LinkLike;
} & ComponentProps<LinkLike>;

const Badge: FC<PropsWithChildren<BadgeProps>> = ({
  kind = 'default',
  badgeText,
  children,
  Wrapper = 'a',
  ...args
}) => (
  <Wrapper className={`${styles.wrapper} ${styles[kind]}`} {...args}>
    {badgeText && <span className={styles.badge}>{badgeText}</span>}
    <span className={styles.message}>{children}</span>
    {args.href && <ArrowRightIcon className={styles.icon} />}
  </Wrapper>
);

export default Badge;
