import NextImage from 'next/image';
import { SiteProvider } from '../providers/siteProvider';
import { ThemeProvider } from '../providers/themeProvider';
import { LocaleProvider } from '../providers/localeProvider';
import { openSans } from '../util/nextFonts';
import type { Preview } from '@storybook/react';

import '../styles/index.scss';

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
        <ThemeProvider font={openSans.style.fontFamily}>
          <div data-test-id="story-root">
            <Story />
          </div>
        </ThemeProvider>
      </LocaleProvider>
    </SiteProvider>
  ),
];

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <NextImage {...props} unoptimized />,
});

export default preview;
