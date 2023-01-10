import type { PropsWithChildren } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

const DefaultLayout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <main id="main">
      <div className="container">{children}</div>
    </main>
    <Footer />
  </>
);

export default DefaultLayout;
