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
  ...props
}) => (
  <Link
    role="button"
    href={disabled ? undefined : href}
    aria-disabled={disabled}
    className={classNames(styles.button, styles[kind], className)}
    {...props}
  >
    {children}
  </Link>
);

export default Button;
