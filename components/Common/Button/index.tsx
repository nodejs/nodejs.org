import classNames from 'classnames';
import type { FC, ButtonHTMLAttributes } from 'react';

import styles from './index.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'special';
};

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className,
  ...props
}) => (
  <button
    className={classNames(styles.button, styles[variant], className)}
    {...props}
  >
    {children}
  </button>
);

export default Button;
