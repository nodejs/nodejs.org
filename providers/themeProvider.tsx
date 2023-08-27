import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';

type ThemeProviderProps = PropsWithChildren<{ font: string }>;

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => (
  <>
    <NextThemeProvider enableSystem={true} enableColorScheme={true}>
      {children}
    </NextThemeProvider>
  </>
);
