import type { PropsWithChildren } from 'react';

import Footer from '../components/NewFooter/Footer';
import Header from '../components/NewHeader/Header';

const BaseLayout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </>
);

export default BaseLayout;
