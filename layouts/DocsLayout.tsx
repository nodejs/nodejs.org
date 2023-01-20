import type { PropsWithChildren } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import SideNavigation from '../components/SideNavigation';
import { useNodeData } from '../hooks/useNodeData';

const DocsLayout = ({ children }: PropsWithChildren) => {
  const { currentLtsVersion, currentNodeVersion } = useNodeData();

  const translationContext = {
    apiLts: {
      ltsNodeVersion: currentLtsVersion?.nodeMajor,
      fullLtsNodeVersion: currentLtsVersion?.node,
      spanLts: <span className="small color-lightgray">LTS</span>,
    },
    apiCurrent: {
      fullCurrentNodeVersion: currentNodeVersion?.node,
      currentNodeVersion: currentNodeVersion?.nodeMajor,
    },
  };

  return (
    <>
      <Header />
      <main id="main">
        <div className="container has-side-nav">
          <SideNavigation navigationKey="docs" context={translationContext} />
          <article dir="auto">{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DocsLayout;
