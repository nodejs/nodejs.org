import type { ComponentProps, FC, PropsWithChildren } from 'react';

import styles from './index.module.scss';

type BlockquoteProps = {
  attribution?: string;
} & ComponentProps<'blockquote'>;

const Blockquote: FC<PropsWithChildren<BlockquoteProps>> = ({
  children,
  cite,
  attribution,
}) => (
  <blockquote className={styles.wrapper} cite={cite}>
    {children}
    {attribution && (
      <footer>
        <cite>{attribution}</cite>
      </footer>
    )}
  </blockquote>
);

export default Blockquote;
