import Footer from '../components/Footer';
import Header from '../components/Header';
import type { PropsWithChildren } from 'react';

const BaseLayout = (props: PropsWithChildren) => (
  <>
    <Header />
    <main id="main">{props.children}</main>
    <Footer />
  </>
);

export default BaseLayout;
