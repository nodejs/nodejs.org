import NextImage from 'next/image';
import { withThemeByClassName } from '@storybook/addon-styling';
import { SiteProvider } from '../providers/siteProvider';
import { ThemeProvider } from '../providers/themeProvider';
import { LocaleProvider } from '../providers/localeProvider';
import { openSans } from '../util/nextFonts';
import type { Preview } from '@storybook/react';

import '../styles/nodejs.dev/index.scss';
import '../styles/new-design/index.scss';

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

export const decorators = [
  Story => (
    <SiteProvider>
      <LocaleProvider>
        <ThemeProvider>
          <div
            data-test-id="story-root"
            className={`${openSans.variable} font-sans`}
          >
            <Story />
          </div>
        </ThemeProvider>
      </LocaleProvider>
    </SiteProvider>
  ),
  withThemeByClassName({
    themes: {
      light: '',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <NextImage {...props} unoptimized />,
});

export default preview;
