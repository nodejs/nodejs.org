import classNames from 'classnames';
import type { StorybookConfig } from '@storybook/nextjs';

const rootClasses = classNames(
  // note: this is hard-coded sadly as next/font can only be loaded within next.js context
  '__variable_open-sans-normal',
  // note: this is hard-coded sadly as next/font can only be loaded within next.js context
  '__variable_ibm-plex-mono-normal-600',
  'font-open-sans',
  'bg-white',
  'text-neutral-950',
  'dark:bg-neutral-950',
  'dark:text-white'
);

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-viewport',
  ],
  logLevel: 'error',
  staticDirs: ['../public'],
  previewBody:
    // This `<style>` is necessary to simulate what `next-themes` (ThemeProvider) does on real applications
    // `next-theme` automatically injects the color-scheme based on the system preference or the current applied theme
    // on Storybook we don't use `next-theme` as we want to simulate themes
    '<style>:root { color-scheme: light; } html[data-theme="dark"] { color-scheme: dark; }</style>' +
    // This adds the base styling for dark/light themes within Storybook. This is a Storybook-only style
    `<body class="${rootClasses}"></body>`,
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  framework: { name: '@storybook/nextjs', options: {} },
  webpack: async config => ({
    ...config,
    target: 'browserslist',
    performance: { hints: false },
    resolve: { ...config.resolve, alias: { '@nodevu/core': false } },
  }),
};

export default config;
