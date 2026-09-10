import type { FC, PropsWithChildren, HTMLAttributes } from 'react';

import styles from './index.module.css';

type ArticleLayoutProps = HTMLAttributes<HTMLDivElement>;

const ArticleLayout: FC<PropsWithChildren<ArticleLayoutProps>> = ({
  children,
  ...props
}) => (
  <div className={styles.articleLayout} {...props}>
    {children}
  </div>
);

export default ArticleLayout;
