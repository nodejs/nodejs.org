import classNames from 'classnames';

import type {
  FC,
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';

import styles from './index.module.css';

export type BannerProps = {
  type?: 'default' | 'warning' | 'error';
  onClose?: MouseEventHandler<HTMLButtonElement>;
} & HTMLAttributes<HTMLElement>;

const Banner: FC<PropsWithChildren<BannerProps>> = ({
  type = 'default',
  onClose,
  children,
  ...props
}) => (
  <section
    className={classNames(styles.banner, styles[type] || styles.default)}
    {...props}
  >
    {children}
    {onClose && (
      <button
        type="button"
        className={styles.closeButton}
        aria-label="Close banner"
        onClick={onClose}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    )}
  </section>
);

export default Banner;
