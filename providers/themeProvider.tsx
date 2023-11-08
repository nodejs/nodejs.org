'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';

import { THEME_STORAGE_KEY } from '@/next.constants.mjs';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <NextThemeProvider
    attribute="data-theme"
    defaultTheme="dark"
    storageKey={THEME_STORAGE_KEY}
    enableSystem={false}
  >
    {children}
  </NextThemeProvider>
);
