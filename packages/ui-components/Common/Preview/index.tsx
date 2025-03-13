import classNames from 'classnames';
import type { FC } from 'react';

import HexagonGrid from '@node-core/ui-components/Icons/HexagonGrid';
import JsWhiteIcon from '@node-core/ui-components/Icons/Logos/JsWhite';
import type { BlogPreviewType } from '@node-core/ui-components/types';

import styles from './index.module.css';

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
