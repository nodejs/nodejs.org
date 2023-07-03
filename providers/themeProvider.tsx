import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeProvider as MUIProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { MotionConfig } from 'framer-motion';
import { useMemo, type FC, type PropsWithChildren } from 'react';

type ThemeProviderProps = PropsWithChildren<{ fontFamily: string }>;

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  fontFamily,
}) => {
  const muiThemeConfig = useMemo(
    () => createTheme({ typography: { fontFamily } }),
    [fontFamily]
  );

  return (
    <NextThemeProvider enableSystem={true} enableColorScheme={true}>
      <MotionConfig reducedMotion="user">
        <MUIProvider theme={muiThemeConfig}>{children}</MUIProvider>
      </MotionConfig>
    </NextThemeProvider>
  );
};
