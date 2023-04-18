import type { Preview } from '@storybook/react';
import NextImage from 'next/image';
import App from '../pages/_app.mdx';
import { pageProps } from './constants';

import '../styles/styles.scss';
import '../styles/tokens.scss';

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
  },
};

export const decorators = [
  Story => <App Component={Story} pageProps={pageProps} />,
];

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <NextImage {...props} unoptimized />,
});

export default preview;
