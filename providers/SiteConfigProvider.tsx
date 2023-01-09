import { createContext } from 'react';
import type { FC, PropsWithChildren } from 'react';
import type { SiteConfig } from '../types';

import siteConfig from '../site.json';

export const SiteConfigContext = createContext<SiteConfig>(siteConfig);

export const SiteConfigProvider: FC<PropsWithChildren> = props => (
  <SiteConfigContext.Provider value={siteConfig}>
    {props.children}
  </SiteConfigContext.Provider>
);
