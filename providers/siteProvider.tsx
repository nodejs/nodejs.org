import { createContext } from 'react';
import siteConfig from '../site.json';
import type { PropsWithChildren } from 'react';

import type { SiteConfig } from '../types';

export const SiteContext = createContext<SiteConfig>(siteConfig);

export const SiteProvider = (props: PropsWithChildren) => (
  <SiteContext.Provider value={siteConfig}>
    {props.children}
  </SiteContext.Provider>
);
