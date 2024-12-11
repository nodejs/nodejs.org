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
  // We have an extra `disabled` prop as we simulate a button..
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
  // Check if the component is being used as a button (no href provided)
  const isButton = !href;

  // Handle keydown events for keyboard accessibility
  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) {
        onClick(e as unknown as MouseEvent<HTMLAnchorElement>);
      }
    }
  };

  return (
    <Link
      role={isButton ? 'button' : undefined} // Set role to 'button' only when used as a button
      href={disabled ? undefined : href} // Disable the link when disabled
      aria-disabled={disabled}
      className={classNames(styles.button, styles[kind], className, {
        [styles.disabled]: disabled, // Add disabled style when appropriate
      })}
      tabIndex={isButton ? (disabled ? -1 : 0) : undefined} // Remove from tab order if disabled for buttons
      onKeyDown={isButton ? handleKeyDown : undefined} // Add keyboard support for buttons
      onClick={isButton && !disabled ? onClick : undefined} // Prevent click if disabled, for buttons
      {...props}
    >
      {children}
    </Link>
  );
};

export default Button;
