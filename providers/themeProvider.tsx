import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <>
    <NextThemeProvider enableSystem={true} enableColorScheme={true}>
      {children}
    </NextThemeProvider>
  </>
);
