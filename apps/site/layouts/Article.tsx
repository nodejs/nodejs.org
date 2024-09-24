import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

const ArticleLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.articleLayout}>{children}</div>
);

export default ArticleLayout;
