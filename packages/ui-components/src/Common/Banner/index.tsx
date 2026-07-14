'use client';

import classNames from 'classnames';
import {
  useState,
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'react';

import styles from './index.module.css';

export type BannerProps = {
  type?: 'default' | 'warning' | 'error';
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & HTMLAttributes<HTMLElement>;

const Banner: FC<PropsWithChildren<BannerProps>> = ({
  type = 'default',
  onClose,
  children,
  ...props
}) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {return null;}

  return (
    <section
      className={classNames(styles.banner, styles[type] || styles.default)}
      {...props}
    >
      {children}
      <button
        type="button"
        className={styles.closeButton}
        aria-label="Close banner"
        onClick={e => {
          setDismissed(true);
          onClose?.(e);
        }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </section>
  );
};

export default Banner;
