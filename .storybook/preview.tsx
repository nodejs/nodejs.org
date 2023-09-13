import NextImage from 'next/image';
import { Open_Sans } from 'next/font/google';
import { SiteProvider } from '../providers/siteProvider';
import { ThemeProvider } from '../providers/themeProvider';
import { LocaleProvider } from '../providers/localeProvider';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/react';

import '../styles/new/index.scss';

const openSans = Open_Sans({
  weight: ['300', '400', '600', '700'],
  display: 'fallback',
  subsets: ['latin'],
  variable: '--font-open-sans',
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextjs: {
      router: {
        basePath: '',
      },
    },
    backgrounds: { disable: true },
  },
};

// The `openSans.variable` injects the name of the Font Family to the DOM Tree
// The `font-open-sans` variable is the actual Tailwind Classname
// that tells that the font-family for this Component tree should be "Open Sans"
const storyClasses = `${openSans.variable} font-open-sans`;

export const decorators = [
  Story => (
    <SiteProvider>
      <LocaleProvider>
        <ThemeProvider>
          <div className={storyClasses}>
            <Story />
          </div>
        </ThemeProvider>
      </LocaleProvider>
    </SiteProvider>
  ),
  withThemeByDataAttribute<ReactRenderer>({
    themes: {
      light: '',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-theme',
  }),
];

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <NextImage {...props} unoptimized />,
});

export default preview;
