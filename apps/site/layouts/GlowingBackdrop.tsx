import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import GlowingBackdrop from '@/components/Common/GlowingBackdrop';
import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';

import styles from './layouts.module.css';

type GlowingBackdropLayoutProps = PropsWithChildren<{
  kind?: 'home' | 'default';
}>;

const GlowingBackdropLayout: FC<
  PropsWithChildren<GlowingBackdropLayoutProps>
> = ({ kind = 'home', children }) => (
  <>
    <WithNavBar />
    <div className={styles.centeredLayout}>
      <GlowingBackdrop />

      <main
        className={classNames({
          [styles.homeLayout]: kind === 'home',
        })}
      >
        {children}
      </main>
    </div>
    <WithFooter />
  </>
);

export default GlowingBackdropLayout;
