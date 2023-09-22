import NextImage from 'next/image';
import {
  withThemeByDataAttribute,
  withThemeByClassName,
} from '@storybook/addon-themes';
import { SiteProvider } from '../providers/siteProvider';
import { ThemeProvider } from '../providers/themeProvider';
import { LocaleProvider } from '../providers/localeProvider';
import { OPEN_SANS_FONT, STORYBOOK_MODES, THEME_CLASSES } from './constants';
import type { Preview, ReactRenderer } from '@storybook/react';

import '../styles/new/index.scss';

// The `openSans.variable` injects the name of the Font Family to the DOM Tree
// The `font-open-sans` variable is the actual Tailwind Classname
// that tells that the font-family for this Component tree should be "Open Sans"
const getStoryClasses = (theme: string) =>
  `${OPEN_SANS_FONT.variable} ${THEME_CLASSES[theme]}`;

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        small: { name: 'Small', styles: { width: '640px', height: '800px' } },
        large: { name: 'Large', styles: { width: '1024px', height: '1000px' } },
      },
    },
    nextjs: { router: { basePath: '' } },
    chromatic: { modes: STORYBOOK_MODES },
  },
  // These are extra Storybook Decorators applied to all stories
  // that introduce extra functionality such as Theme Switching
  // and all the App's Providers (Site, Theme, Locale)
  decorators: [
    (Story, context) => {
      console.log(context);

      return (
        <SiteProvider>
          <LocaleProvider>
            <ThemeProvider>
              <div className={getStoryClasses(context.globals.theme)}>
                <Story />
              </div>
            </ThemeProvider>
          </LocaleProvider>
        </SiteProvider>
      );
    },
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
  value: props => <NextImage {...props} unoptimized />,
});

export default preview;
