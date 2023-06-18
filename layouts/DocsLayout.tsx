import { useMemo } from 'react';
import BaseLayout from './BaseLayout';
import SideNavigation from '../components/SideNavigation';
import { useNodeReleases } from '../hooks/useNodeReleases';
import type { FC, PropsWithChildren } from 'react';

const DocsLayout: FC<PropsWithChildren> = ({ children }) => {
  const { getReleaseByStatus } = useNodeReleases();

  const [lts, current] = useMemo(
    () => [getReleaseByStatus('Active LTS'), getReleaseByStatus('Current')],
    [getReleaseByStatus]
  );

  const translationContext = {
    apiLts: {
      ltsNodeVersion: lts ? `v${lts.major}.x` : undefined,
      fullLtsNodeVersion: lts ? lts.versionWithPrefix : undefined,
      spanLts: <span className="small color-lightgray">LTS</span>,
    },
    apiCurrent: {
      fullCurrentNodeVersion: current ? current.versionWithPrefix : undefined,
      currentNodeVersion: current ? `v${current.major}.x` : undefined,
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
