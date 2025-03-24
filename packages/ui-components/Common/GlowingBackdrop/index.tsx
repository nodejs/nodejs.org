import type { FC } from 'react';

import HexagonGrid from '@node-core/ui-components/Icons/HexagonGrid';

import styles from './index.module.css';

const GlowingBackdrop: FC = () => (
  <div className={styles.glowingBackdrop}>
    <HexagonGrid />
  </div>
);

export default GlowingBackdrop;
