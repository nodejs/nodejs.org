import { createContext } from 'react';
import type { PropsWithChildren } from 'react';

import type { SiteConfig } from '../types';

import siteConfig from '../site.json';

export const SiteContext = createContext<SiteConfig>(siteConfig);

export const SiteProvider = ({ children }: PropsWithChildren) => (
  <SiteContext.Provider value={siteConfig}>{children}</SiteContext.Provider>
);
