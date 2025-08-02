import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  FC,
  PropsWithChildren,
} from 'react';

import Link from '#site/components/Link';

import styles from './index.module.css';

type LinkWithArrowProps =
  | ComponentProps<typeof Link>
  | ButtonHTMLAttributes<HTMLButtonElement>;

const LinkWithArrow: FC<PropsWithChildren<LinkWithArrowProps>> = ({
  children,
  className,
  ...props
}) => {
  const content = (
    <span>
      {children}
      <ArrowUpRightIcon className={styles.icon} />
    </span>
  );

  if ('href' in props) {
    return (
      <Link {...props} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classNames(className, styles.button)}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};

export default LinkWithArrow;
