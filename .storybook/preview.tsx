import type { Preview } from '@storybook/react';
import NextImage from 'next/image';
import { ThemeProvider } from 'next-themes';
import { NodeReleasesDataProvider } from '../providers/nodeReleasesDataProvider';
import { LocaleProvider } from '../providers/localeProvider';
import { SiteProvider } from '../providers/siteProvider';
import openSans from '../util/openSans';
import { pageProps } from './constants';

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
  },
};

export const decorators = [
  Story => (
    <ThemeProvider>
      <SiteProvider>
        <LocaleProvider i18nData={pageProps.i18nData}>
          <NodeReleasesDataProvider>
            <style>
              {`
                body {
                  font-family: ${openSans.style.fontFamily}, var(--base-type-face);
                }
              `}
            </style>
            <Story />
          </NodeReleasesDataProvider>
        </LocaleProvider>
      </SiteProvider>
    </ThemeProvider>
  ),
];

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <NextImage {...props} unoptimized />,
});

export default preview;
