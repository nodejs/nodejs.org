import { createContext } from 'react';
import * as nextJson from '../next.json.mjs';
import type { FC, PropsWithChildren } from 'react';
import type { SiteConfig } from '../types';

export const SiteContext = createContext<SiteConfig>(nextJson.siteConfig);

export const SiteProvider: FC<PropsWithChildren> = ({ children }) => (
  <SiteContext.Provider value={nextJson.siteConfig}>
    {children}
  </SiteContext.Provider>
);
