import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

const ArticleLayout: FC<PropsWithChildren> = ({ children }) => (
  <article className={styles.articleLayout}>{children}</article>
);

export default ArticleLayout;
