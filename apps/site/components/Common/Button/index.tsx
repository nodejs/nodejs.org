import classNames from 'classnames';
import type { FC, AnchorHTMLAttributes } from 'react';

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
  // Handle keydown events for keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) {
        onClick(e as unknown as React.MouseEvent<HTMLAnchorElement>);
      }
    }
  };

  return (
    <Link
      role="button"
      href={disabled ? undefined : href}
      aria-disabled={disabled}
      className={classNames(styles.button, styles[kind], className, {
        [styles.disabled]: disabled,
      })}
      tabIndex={disabled ? -1 : 0} // Remove from tab order if disabled
      onKeyDown={handleKeyDown} // Add keyboard support
      onClick={disabled ? undefined : onClick} // Prevent click when disabled
      {...props}
    >
      {children}
    </Link>
  );
};

export default Button;
