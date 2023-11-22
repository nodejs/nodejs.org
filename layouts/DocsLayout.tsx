import type { RichTranslationValues } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';

import SideNavigation from '@/components/SideNavigation';
import getReleaseData from '@/next-data/releaseData';

const DocsLayout: FC<PropsWithChildren> = async ({ children }) => {
  const releaseData = await getReleaseData();

  const [lts, current] = [
    releaseData.find(({ isLts }) => isLts),
    releaseData.find(({ status }) => status === 'Current'),
  ];

  const translationContext: Record<string, RichTranslationValues> = {
    apiLts: {
      ltsNodeVersion: lts ? `v${lts.major}.x` : undefined,
      fullLtsNodeVersion: lts ? lts.versionWithPrefix : undefined,
    },
    apiCurrent: {
      fullCurrentNodeVersion: current ? current.versionWithPrefix : undefined,
      currentNodeVersion: current ? `v${current.major}.x` : undefined,
    },
  };

  return (
    <div className="has-side-nav container">
      <SideNavigation navigationKey="docs" context={translationContext} />
      <article dir="auto">{children}</article>
    </div>
  );
};

export default DocsLayout;
