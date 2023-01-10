import { createContext } from 'react';
import type { PropsWithChildren } from 'react';

import type { LegacyLayouts } from '../types';

import DefaultLayout from '../layouts/DefaultLayout';
import AboutLayout from '../layouts/AboutLayout';
import ContributeLayout from '../layouts/ContributeLayout';
import DocsLayout from '../layouts/DocsLayout';

type LayoutProviderProps = PropsWithChildren<{ layout: LegacyLayouts }>;

export const LayoutContext = createContext<LegacyLayouts>('page.hbs');

const getLegacyLayout = (layout: LegacyLayouts) => {
  switch (layout) {
    case 'about.hbs':
      return AboutLayout;
    case 'contribute.hbs':
      return ContributeLayout;
    case 'docs.hbs':
      return DocsLayout;
    default:
      return DefaultLayout;
  }
};

export const LayoutProvider = ({ layout, children }: LayoutProviderProps) => {
  const LayoutComponent = getLegacyLayout(layout);

  return (
    <LayoutContext.Provider value={layout}>
      <LayoutComponent>{children}</LayoutComponent>
    </LayoutContext.Provider>
  );
};
