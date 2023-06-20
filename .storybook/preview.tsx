import type { Preview } from '@storybook/react';
import NextImage from 'next/image';
import { ThemeProvider } from 'next-themes';
import { NodeReleasesProvider } from '../providers/nodeReleasesProvider';
import { LocaleProvider } from '../providers/localeProvider';
import { openSans } from '../util/nextFonts';
import BaseApp, { setAppFont } from '../next.app';

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

setAppFont(openSans.style.fontFamily);

export const decorators = [
  Story => (
    <BaseApp>
      <ThemeProvider>
        <LocaleProvider>
          <NodeReleasesProvider>
            <div data-test-id="story-root">
              <Story />
            </div>
          </NodeReleasesProvider>
        </LocaleProvider>
      </ThemeProvider>
    </BaseApp>
  ),
];

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <NextImage {...props} unoptimized />,
});

export default preview;
