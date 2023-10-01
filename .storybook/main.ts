import { resolve } from 'node:path';
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
  core: {
    disableTelemetry: true,
    builder: {
      name: '@storybook/builder-webpack5',
      options: { lazyCompilation: true },
    },
  },
  framework: { name: '@storybook/nextjs', options: {} },
  webpackFinal: async config => {
    // This allows us to resolve node_modules and everything from the Application source
    config.resolve!.modules = [resolve(__dirname, '..'), 'node_modules'];

    config.resolve!.alias = {
      ...config.resolve!.alias,
      // Allows us to use `@` imports with TypeScript
      '@': resolve(__dirname, '../'),
    };

    // We want to disable the annoying performance hints
    // as we know that Storybook has big bundles
    config.performance = {
      ...config.performance,
      hints: false,
    };

    return config;
  },
};

export default config;
