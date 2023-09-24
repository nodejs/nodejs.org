import NextImage from 'next/image';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { SiteProvider } from '../providers/siteProvider';
import { ThemeProvider } from '../providers/themeProvider';
import { LocaleProvider } from '../providers/localeProvider';
import { OPEN_SANS_FONT, STORYBOOK_MODES, COMMON_CLASSES } from './constants';
import type { Preview, ReactRenderer } from '@storybook/react';

import '../styles/new/index.css';

const preview: Preview = {
  parameters: {
    viewport: {
      defaultViewport: 'large',
      viewports: {
        small: { name: 'Small', styles: { width: '414px', height: '896px' } },
        large: { name: 'Large', styles: { width: '1024px', height: '768px' } },
      },
    },
    nextjs: { router: { basePath: '' } },
    chromatic: { modes: STORYBOOK_MODES },
  },
  // These are extra Storybook Decorators applied to all stories
  // that introduce extra functionality such as Theme Switching
  // and all the App's Providers (Site, Theme, Locale)
  decorators: [
    Story => (
      <SiteProvider>
        <LocaleProvider>
          <ThemeProvider>
            <div className={`${OPEN_SANS_FONT.variable} ${COMMON_CLASSES}`}>
              <Story />
            </div>
          </ThemeProvider>
        </LocaleProvider>
      </SiteProvider>
    ),
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

// This forces the Next.js image system to use unoptimized images
// for all the Next.js Images (next/image) Components
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props: any) => <NextImage {...props} unoptimized />,
});

export default preview;
