import type { StorybookConfig } from '@storybook/nextjs';

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
    '<body class="bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white"></body>',
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  framework: {
    name: '@storybook/nextjs',
    options: { builder: { lazyCompilation: true } },
  },
  webpack: async config => ({ ...config, performance: { hints: false } }),
};

export default config;
