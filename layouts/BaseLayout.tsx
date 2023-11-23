'use client';

import type { FC, PropsWithChildren } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </>
);

export default BaseLayout;
