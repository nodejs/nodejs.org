import { createContext } from 'react';
import type { PropsWithChildren } from 'react';
import type { PageOpts } from 'nextra';

import type { LegacyLayouts } from '../types';

import DefaultLayout from '../layouts/DefaultLayout';
import AboutLayout from '../layouts/AboutLayout';
import ContributeLayout from '../layouts/ContributeLayout';
import DocsLayout from '../layouts/DocsLayout';
import IndexLayout from '../layouts/IndexLayout';

type LayoutProviderProps = PropsWithChildren<{
  layout: LegacyLayouts;
  pageOpts: PageOpts;
}>;

export const LayoutContext = createContext<{
  layout: LegacyLayouts;
  pageOpts: PageOpts;
}>(undefined as any);

const getLegacyLayout = (layout: LegacyLayouts) => {
  switch (layout) {
    case 'about.hbs':
      return AboutLayout;
    case 'contribute.hbs':
      return ContributeLayout;
    case 'docs.hbs':
      return DocsLayout;
    case 'index.hbs':
      return IndexLayout;
    default:
      return DefaultLayout;
  }
};

export const LayoutProvider = ({ children, ...props }: LayoutProviderProps) => {
  const LayoutComponent = getLegacyLayout(props.layout);

  return (
    <LayoutContext.Provider value={props}>
      <LayoutComponent>{children}</LayoutComponent>
    </LayoutContext.Provider>
  );
};
