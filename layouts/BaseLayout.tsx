import type { FC, PropsWithChildren } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TopNavigation from '@/components/TopNavigation';

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Header>
      <TopNavigation />
    </Header>
    <main id="main">{children}</main>
    <Footer />
  </>
);

export default BaseLayout;
