import classNames from 'classnames';
import type { ButtonProps } from '@/types/button';
import type { FC } from 'react';

import styles from './index.module.scss';

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  special = false,
  children,
  className,
  ...props
}) => {
  const buttonStyles = classNames(
    styles.button,
    styles[variant],
    { [styles.special]: special },
    className
  );

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
