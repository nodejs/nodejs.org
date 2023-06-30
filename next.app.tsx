import { MotionConfig } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SiteProvider } from './providers/siteProvider';
import { LocaleProvider } from './providers/localeProvider';
import { BlogDataProvider } from './providers/blogDataProvider';
import { NodeReleasesProvider } from './providers/nodeReleasesProvider';
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

export const setAppFonts = (fonts: string[]) => {
  theme.typography.fontFamily = [...fonts, ...defaultTypography].join(',');
};

const BaseApp: FC<PropsWithChildren> = ({ children }) => (
  <SiteProvider>
    <MotionConfig reducedMotion="user">
      <ThemeProvider theme={theme}>
        <NodeReleasesProvider>
          <BlogDataProvider>
            <LocaleProvider>{children}</LocaleProvider>
          </BlogDataProvider>
        </NodeReleasesProvider>

        <style jsx global>
          {`
            body {
              font-family: ${theme.typography.fontFamily};
            }
          `}
        </style>
      </ThemeProvider>
    </MotionConfig>
  </SiteProvider>
);

export default BaseApp;
