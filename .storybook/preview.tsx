import type { Preview } from '@storybook/react';
import NextImage from 'next/image';
import { openSans } from '../util/nextFonts';
import BaseApp, { setAppFonts } from '../next.app';

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

setAppFonts([openSans.style.fontFamily]);

export const decorators = [
  Story => (
    <BaseApp>
      <div data-test-id="story-root">
        <Story />
      </div>
    </BaseApp>
  ),
];

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <NextImage {...props} unoptimized />,
});

export default preview;
