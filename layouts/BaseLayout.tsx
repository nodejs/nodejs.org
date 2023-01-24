import type { PropsWithChildren } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

const BaseLayout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </>
);

export default BaseLayout;
