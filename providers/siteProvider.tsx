import { createContext } from 'react';
import type { FC, PropsWithChildren } from 'react';
import type { SiteConfig } from '../types';

import siteConfig from '../site.json';

export const SiteContext = createContext<SiteConfig>(siteConfig);

export const SiteProvider: FC<PropsWithChildren> = props => (
  <SiteContext.Provider value={siteConfig}>
    {props.children}
  </SiteContext.Provider>
);
