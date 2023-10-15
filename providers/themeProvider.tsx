import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';

import { THEME_LOCAL_STORAGE_KEY } from '@/next.constants.mjs';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <NextThemeProvider
    attribute="data-theme"
    storageKey={THEME_LOCAL_STORAGE_KEY}
    enableSystem={true}
    enableColorScheme={true}
  >
    {children}
  </NextThemeProvider>
);
