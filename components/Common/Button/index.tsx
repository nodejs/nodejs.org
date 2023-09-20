import classNames from 'classnames';
import type { FC, ButtonHTMLAttributes } from 'react';

import styles from './index.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'special';
};

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className,
  ...props
}) => {
  const buttonStyles = classNames(styles.button, styles[variant], className);

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
