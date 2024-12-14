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
  // We have an extra `disabled` prop as we simulate a button
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  kind = 'primary',
  disabled = false,
  href = undefined,
  children,
  className,
  onClick,
  ...props
}) => {
  //to handle the keyboard interactions, specifically for Enter and Space keys
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

  // to manage mouse click events for the component, providing behavior consistent with the disabled state
  const onClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      role="button"
      href={disabled ? undefined : href}
      aria-disabled={disabled}
      className={classNames(styles.button, styles[kind], className)}
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
