import { resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.tsx'],
  addons: ['@storybook/addon-controls', '@storybook/addon-interactions'],
  framework: { name: '@storybook/nextjs', options: {} },
  features: { storyStoreV7: true },
  docs: { autodocs: 'tag' },
  staticDirs: ['../public'],
  logLevel: 'error',
  core: { disableTelemetry: true },
  webpackFinal: async config => {
    config.resolve!.modules = [resolve(__dirname, '..'), 'node_modules'];

    config.resolve!.alias = {
      ...config.resolve!.alias,
      '@': resolve(__dirname, '../'),
    };

    return config;
  },
};

export default config;
