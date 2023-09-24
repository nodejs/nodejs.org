import type { ComponentProps, FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type BlockquoteProps = ComponentProps<'blockquote'>;

const Blockquote: FC<PropsWithChildren<BlockquoteProps>> = ({
  children,
  cite,
}) => (
  <blockquote className={styles.wrapper} cite={cite}>
    {children}
  </blockquote>
);

export default Blockquote;
