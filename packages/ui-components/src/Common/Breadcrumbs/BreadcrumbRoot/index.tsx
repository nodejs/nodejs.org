import type { FC, PropsWithChildren, ComponentProps } from 'react';

import styles from './index.module.css';

const BreadcrumbRoot: FC<PropsWithChildren<ComponentProps<'nav'>>> = ({
  children,
  ...props
}) => (
  <nav aria-label="breadcrumb" {...props}>
    <ol
      itemScope
      itemType="https://schema.org/BreadcrumbList"
      className={styles.list}
    >
      {children}
    </ol>
  </nav>
);

export default BreadcrumbRoot;
