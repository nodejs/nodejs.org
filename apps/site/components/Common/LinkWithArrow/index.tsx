import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

import Link from '#site/components/Link';

import type {
  ButtonHTMLAttributes,
  ComponentProps,
  FC,
  PropsWithChildren,
} from 'react';

import styles from './index.module.css';

type LinkWithArrowProps =
  | ComponentProps<typeof Link>
  | ButtonHTMLAttributes<HTMLButtonElement>;

const LinkWithArrow: FC<PropsWithChildren<LinkWithArrowProps>> = ({
  children,
  className,
  ...props
}) =>
  'href' in props ? (
    <Link {...props} className={className}>
      {children}
      <ArrowUpRightIcon className={styles.icon} />
    </Link>
  ) : (
    <button
      className={classNames(className, styles.button)}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
      <ArrowUpRightIcon className={styles.icon} />
    </button>
  );

export default LinkWithArrow;
