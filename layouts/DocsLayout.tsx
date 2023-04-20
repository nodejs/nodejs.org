import BaseLayout from './BaseLayout';
import SideNavigation from '../components/SideNavigation';
import { useNodeData } from '../hooks/useNodeData';
import type { FC, PropsWithChildren } from 'react';

const DocsLayout: FC<PropsWithChildren> = ({ children }) => {
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
    <BaseLayout>
      <div className="container has-side-nav">
        <SideNavigation navigationKey="docs" context={translationContext} />
        <article dir="auto">{children}</article>
      </div>
    </BaseLayout>
  );
};

export default DocsLayout;
