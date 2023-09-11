import classNames from 'classnames';
import styles from './index.module.scss';
import type { ButtonProps } from '@/types/button';

const Button = ({
  variant = 'primary',
  special = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const buttonStyles = classNames(
    styles.button,
    styles[variant],
    {
      [styles.special]: special,
    },
    className
  );
  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
