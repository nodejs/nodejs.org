import { createContext } from 'react';
import type { FC, PropsWithChildren } from 'react';

import { siteConfig } from '@/next.json.mjs';
import type { SiteConfig } from '@/types';

const config = siteConfig as SiteConfig;

export const SiteContext = createContext<SiteConfig>(config);

export const SiteProvider: FC<PropsWithChildren> = ({ children }) => (
  <SiteContext.Provider value={config}>{children}</SiteContext.Provider>
);
