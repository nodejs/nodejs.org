import { MotionConfig } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SiteProvider } from './providers/siteProvider';
import type { FC, PropsWithChildren } from 'react';

const defaultTypography = [
  'Open Sans',
  'Roboto',
  'San Francisco',
  'Helvetica',
  'Arial',
  'sans-serif',
];

const theme = createTheme({
  typography: { fontFamily: defaultTypography.join(',') },
});

export const setAppFont = (font: string) => {
  theme.typography.fontFamily = [font, ...defaultTypography].join(',');
};

const BaseApp: FC<PropsWithChildren> = ({ children }) => (
  <SiteProvider>
    <MotionConfig reducedMotion="user">
      <ThemeProvider theme={theme}>
        <style jsx global>
          {`
            body {
              font-family: ${theme.typography.fontFamily};
            }
          `}
        </style>
        {children}
      </ThemeProvider>
    </MotionConfig>
  </SiteProvider>
);

export default BaseApp;
