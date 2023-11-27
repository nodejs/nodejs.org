import classNames from 'classnames';
import type { CSSProperties, ComponentProps, FC, ReactNode } from 'react';

import JsIconWhite from '@/components/Icons/Logos/JsIconWhite';

import styles from './index.module.css';

type PreviewProps = {
  type?: 'announcement' | 'release' | 'vulnerability';
  title: ReactNode;
  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
} & Omit<ComponentProps<'div'>, 'children'>;

const Preview: FC<PreviewProps> = ({
  type = 'announcement',
  title,
  height = 630,
  width = 1200,
  ...props
}) => (
  <div
    {...props}
    style={{ width, height, ...props.style }}
    className={classNames(styles.root, styles[type], props.className)}
  >
    <div className={styles.container}>
      <JsIconWhite className={styles.logo} width={71} height={80} />
      <h2>{title}</h2>
    </div>
  </div>
);

export default Preview;
