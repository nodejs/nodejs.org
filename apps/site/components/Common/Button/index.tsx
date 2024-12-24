'use client';

import classNames from 'classnames';
import type {
  FC,
  AnchorHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
} from 'react';

import Link from '@/components/Link';

import styles from './index.module.css';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  kind?: 'neutral' | 'primary' | 'secondary' | 'special';
  size?: 'default' | 'small';
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  kind = 'primary',
  size = 'default',
  disabled = false,
  href = undefined,
  children,
  className,
  onClick,
  ...props
}) => {
  const onKeyDownHandler = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (typeof onClick === 'function') {
        onClick(e as unknown as MouseEvent<HTMLAnchorElement>);
      }
    }
  };

  const onClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  return (
    <Link
      role="button"
      href={disabled ? undefined : href}
      aria-disabled={disabled}
      className={classNames(
        styles.button,
        styles[kind],
        styles[size],
        className
      )}
      tabIndex={disabled ? -1 : 0} // Ensure focusable if not disabled
      onClick={onClickHandler}
      onKeyDown={onKeyDownHandler}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Button;
