'use client';

import classNames from 'classnames';
import type { FC, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

import Link from '@/components/Link';

import styles from './index.module.css';

type ButtonProps = (
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>
) & {
  kind?: 'neutral' | 'primary' | 'secondary' | 'special';
  size?: 'default' | 'small';
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  kind = 'primary',
  size = 'default',
  disabled = false,
  children,
  className,
  ...props
}) => {
  if ('href' in props) {
    return (
      <Link
        role="button"
        href={disabled ? undefined : props.href}
        aria-disabled={disabled}
        className={classNames(
          styles.button,
          styles[kind],
          styles[size],
          className
        )}
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={classNames(
        styles.button,
        styles[kind],
        styles[size],
        className
      )}
      type="button"
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

export default Button;
