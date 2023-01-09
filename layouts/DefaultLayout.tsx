import type { PropsWithChildren } from 'react';

import Footer from '../components/Footer';

const DefaultLayout = ({ children }: PropsWithChildren) => (
  <>
    <main id="main">
      <div className="container">{children}</div>
    </main>
    <Footer />
  </>
);

export default DefaultLayout;
