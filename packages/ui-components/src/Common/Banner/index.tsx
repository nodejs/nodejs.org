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
  closeButtonAriaLabel?: string;
  onClose?: MouseEventHandler<HTMLButtonElement>;
} & HTMLAttributes<HTMLElement>;

const Banner: FC<PropsWithChildren<BannerProps>> = ({
  type = 'default',
  closeButtonAriaLabel = 'Close banner',
  onClose,
  children,
  ...props
}) => (
  <section
    className={classNames(styles.banner, styles[type] || styles.default)}
    {...props}
  >
    <div className={styles.bannerContent}>
      {children}
      {onClose && (
        <button
          type="button"
          className={styles.closeButton}
          aria-label={closeButtonAriaLabel}
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  </section>
);

export default Banner;
