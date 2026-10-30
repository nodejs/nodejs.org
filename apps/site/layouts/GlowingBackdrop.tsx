import GlowingBackdrop from '@node-core/ui-components/Common/GlowingBackdrop';
import classNames from 'classnames';

import Footer from '#site/components/Footer';
import NavBar from '#site/components/NavBar';

import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

type GlowingBackdropLayoutProps = PropsWithChildren<{
  kind?: 'home' | 'default';
}>;

const GlowingBackdropLayout: FC<
  PropsWithChildren<GlowingBackdropLayoutProps>
> = ({ kind = 'home', children }) => (
  <>
    <NavBar />

    <div className={styles.centeredLayout}>
      <GlowingBackdrop />

      <main
        id="main"
        tabIndex={-1}
        className={classNames({
          [styles.homeLayout]: kind === 'home',
        })}
      >
        {children}
      </main>
    </div>

    <Footer />
  </>
);

export default GlowingBackdropLayout;
