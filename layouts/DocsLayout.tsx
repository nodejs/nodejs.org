'use client';

import type { RichTranslationValues } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';

import SideNavigation from '@/components/SideNavigation';
import { releaseData } from '@/next.json.mjs';

const DocsLayout: FC<PropsWithChildren> = ({ children }) => {
  const [lts, current] = [
    releaseData.find(({ isLts }) => isLts),
    releaseData.find(({ status }) => status === 'Current'),
  ];

  const translationContext: Record<string, RichTranslationValues> = {
    apiLts: {
      ltsNodeVersion: lts ? `v${lts.major}.x` : undefined,
      fullLtsNodeVersion: lts ? lts.versionWithPrefix : undefined,
      graySpan: c => <span className="small color-lightgray">{c}</span>,
    },
    apiCurrent: {
      fullCurrentNodeVersion: current ? current.versionWithPrefix : undefined,
      currentNodeVersion: current ? `v${current.major}.x` : undefined,
    },
    guides: {
      graySpan: c => <span className="small color-lightgray">{c}</span>,
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
