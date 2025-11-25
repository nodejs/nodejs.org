'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { THEME_STORAGE_KEY } from '#site/next.constants.mjs';

import type { FC, PropsWithChildren } from 'react';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <NextThemeProvider
    attribute="data-theme"
    defaultTheme="system"
    storageKey={THEME_STORAGE_KEY}
    enableSystem={true}
  >
    {children}
  </NextThemeProvider>
);
