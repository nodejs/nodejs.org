import type { FC, AnchorHTMLAttributes } from 'react';

import styles from './index.module.css';

type SkipToContentButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
};

const SkipToContentButton: FC<SkipToContentButtonProps> = ({
  label,
  href = '#main',
  ...props
}) => {
  return (
    <a href={href} className={styles.skipToContent} {...props}>
      {label}
    </a>
  );
};

export default SkipToContentButton;
