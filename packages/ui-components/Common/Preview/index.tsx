import classNames from 'classnames';
import type { FC } from 'react';

import HexagonGrid from '#Icons/HexagonGrid';
import JsWhiteIcon from '#Icons/Logos/JsWhite';

import styles from './index.module.css';

import type { BlogPreviewType } from '#types';

type PreviewProps = {
  title: string;
  type?: BlogPreviewType;
};

const Preview: FC<PreviewProps> = ({ type = 'announcements', title }) => (
  <div className={classNames(styles.root, styles[type])}>
    <div className={styles.container} aria-hidden={true}>
      <HexagonGrid className={styles.hexagon} />
      <JsWhiteIcon className={styles.logo} />
      {title}
    </div>
  </div>
);

export default Preview;
