import { join } from 'node:path';

import type { StorybookConfig } from '@storybook/react-webpack5';

const mocksFolder = join(__dirname, '../components/__mocks__');

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.tsx'],
  logLevel: 'error',
  staticDirs: ['../public'],
  typescript: { reactDocgen: false, check: false },
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  framework: '@storybook/react-webpack5',
  swc: () => ({ jsc: { transform: { react: { runtime: 'automatic' } } } }),
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-controls',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { url: false } },
              'postcss-loader',
            ],
          },
        ],
      },
    },
  ],
  webpack: async config => ({
    ...config,
    // We want to conform as much as possible with our target settings
    target: 'browserslist:development',
    // Performance Hints do not make sense on Storybook as it is bloated by design
    performance: { hints: false },
    // `nodevu` is a Node.js-specific package that requires Node.js modules
    // this is incompatible with Storybook. So we just mock the module
    resolve: {
      ...config.resolve,
      alias: {
        'next/image': join(mocksFolder, './next-image.mjs'),
        'next-intl/navigation': join(mocksFolder, './next-intl.mjs'),
        '@/client-context': join(mocksFolder, './client-context.mjs'),
        '@': join(__dirname, '../'),
      },
    },
    // Removes Pesky Critical Dependency Warnings due to `next/font`
    ignoreWarnings: [
      e =>
        e.message.includes('was not found in') ||
        e.message.includes('generated code contains'),
    ],
  }),
};

export default config;
