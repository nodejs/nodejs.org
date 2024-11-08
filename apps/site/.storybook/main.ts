import { join } from 'node:path';

import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.tsx'],
  logLevel: 'error',
  staticDirs: ['../public'],
  typescript: { reactDocgen: false, check: false },
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  framework: '@storybook/react-webpack5',
  swc: () => ({ jsc: { transform: { react: { runtime: 'automatic' } } } }),
  previewBody:
    // This injects Google Fonts as next-fonts is not supported on plain Storybook React
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">' +
    // This `<style>` is necessary to simulate what `next-themes` (ThemeProvider) does on real applications
    // `next-theme` automatically injects the color-scheme based on the system preference or the current applied theme
    // on Storybook we don't use `next-theme` as we want to simulate themes
    '<style>:root { color-scheme: light; } html[data-theme="dark"] { color-scheme: dark; }</style>' +
    // Injects the Open Sans font as the same font variable defined by `next.fonts.mjs`
    '<style>:root { --font-open-sans: "Open Sans"; }</style>' +
    // Injects the IBM Plex font as the same font variable defined by `next.fonts.mjs`
    '<style>:root { --font-ibm-plex-mono: "IBM Plex Mono"; }</style>',
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
        ],
      },
    },
    '@storybook/addon-controls',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-viewport',
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
        '@nodevu/core': false,
        '@/navigation.mjs': join(__dirname, '__mocks__/navigation.mjs'),
        '@/client-context': join(__dirname, '__mocks__/client-context.mjs'),
        '@': join(__dirname, '../'),
      },
    },
    // We need to configure `node:` APIs as Externals to WebPack
    // since essentially they're not supported on the browser
    externals: {
      'node:fs': 'commonjs fs',
      'node:url': 'commonjs url',
      'node:path': 'commonjs path',
      'node:readline': 'commonjs readline',
    },
    // Removes Pesky Critical Dependency Warnings due to `next/font`
    ignoreWarnings: [
      e =>
        e.message.includes('Critical dep') ||
        e.message.includes('was not found in') ||
        e.message.includes('generated code contains'),
    ],
  }),
};

export default config;
