import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { FC, PropsWithChildren } from 'react';

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </>
);

export default BaseLayout;
