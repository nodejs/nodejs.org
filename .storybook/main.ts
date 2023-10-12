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
    '<body class="bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white"></body>',
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  framework: {
    name: '@storybook/nextjs',
    options: { builder: { lazyCompilation: true } },
  },
  webpack: async config => ({ ...config, performance: { hints: false } }),
};

export default config;
