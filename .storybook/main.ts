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
  logLevel: 'error',
  staticDirs: ['../public'],
  typescript: { reactDocgen: false, check: false },
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  framework: {
    name: '@storybook/nextjs',
    options: { builder: { useSWC: true } },
  },
  previewBody:
    // This `<style>` is necessary to simulate what `next-themes` (ThemeProvider) does on real applications
    // `next-theme` automatically injects the color-scheme based on the system preference or the current applied theme
    // on Storybook we don't use `next-theme` as we want to simulate themes
    '<style>:root { color-scheme: light; } html[data-theme="dark"] { color-scheme: dark; } #storybook-root { width: 100%; height: 100%; }</style>' +
    // This adds the base styling for dark/light themes within Storybook. This is a Storybook-only style
    `<body class="${rootClasses}"></body>`,
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-viewport',
  ],
  webpack: async config => ({
    ...config,
    // We want to conform as much as possible with our target settings
    target: 'browserslist',
    // Performance Hints do not make sense on Storybook as it is bloated by design
    performance: { hints: false },
    // `nodevu` is a Node.js-specific package that requires Node.js modules
    // this is incompatible with Storybook. So we just mock the module
    resolve: { ...config.resolve, alias: { '@nodevu/core': false } },
    // Removes Pesky Critical Dependency Warnings due to `next/font`
    ignoreWarnings: [e => e.message.includes('Critical dep')],
  }),
};

export default config;
