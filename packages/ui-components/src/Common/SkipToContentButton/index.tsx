import type { FC, AnchorHTMLAttributes, PropsWithChildren } from 'react';

import styles from './index.module.css';

type SkipToContentButtonProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement>
>;

const SkipToContentButton: FC<SkipToContentButtonProps> = ({
  children,
  href = '#main',
  ...props
}) => {
  return (
    <a href={href} className={styles.skipToContent} {...props}>
      {children}
    </a>
  );
};

export default SkipToContentButton;
