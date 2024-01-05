import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';

import styles from './layouts.module.css';

const layoutClassNames = classNames(styles.homeLayout, 'mdxContent');

const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <div className={layoutClassNames}>
      <div className={styles.hexagonBackdrop} />

      {children}
    </div>

    <WithFooter />
  </>
);

export default HomeLayout;
