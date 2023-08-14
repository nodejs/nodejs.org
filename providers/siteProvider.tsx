import { createContext } from 'react';
import { siteConfig } from '@/next.json.mjs';
import type { FC, PropsWithChildren } from 'react';
import type { SiteConfig } from '@/types';

export const SiteContext = createContext<SiteConfig>(siteConfig);

export const SiteProvider: FC<PropsWithChildren> = ({ children }) => (
  <SiteContext.Provider value={siteConfig}>{children}</SiteContext.Provider>
);
