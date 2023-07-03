import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import type { FC, PropsWithChildren } from 'react';

type ThemeProviderProps = PropsWithChildren<{ font: string }>;

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, font }) => (
  <>
    <NextThemeProvider enableSystem={true} enableColorScheme={true}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemeProvider>

    <style jsx global>
      {`
        body {
          font-family: ${font};
        }
      `}
    </style>
  </>
);
