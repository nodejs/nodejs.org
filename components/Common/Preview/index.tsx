import classNames from 'classnames';
import type { FC } from 'react';

import JsIconWhite from '@/components/Icons/Logos/JsIconWhite';
import type { BlogPreviewType } from '@/types';

import styles from './index.module.css';

type PreviewProps = {
  title: string;
  type?: BlogPreviewType;
};

const Preview: FC<PreviewProps> = ({ type = 'announcements', title }) => (
  <div className={classNames(styles.root, styles[type])}>
    <div className={styles.container} aria-hidden={true}>
      <JsIconWhite className={styles.logo} />
      {title}
    </div>
  </div>
);

export default Preview;
