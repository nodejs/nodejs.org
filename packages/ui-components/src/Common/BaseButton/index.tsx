import classNames from 'classnames';
import type { FC, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

import type { LinkLike } from '#ui/types';

import styles from './index.module.css';

export type ButtonProps = (
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>
) & {
  kind?: 'neutral' | 'primary' | 'secondary' | 'special' | 'warning' | 'info';
  size?: 'default' | 'small';
  disabled?: boolean;
  as?: LinkLike;
};

const BaseButton: FC<ButtonProps> = ({
  kind = 'primary',
  size = 'default',
  disabled = false,
  className,
  as: Component = 'a',
  ...props
}) => {
  if ('href' in props && Component) {
    return (
      <Component
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
      />
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
    />
  );
};

export default BaseButton;
