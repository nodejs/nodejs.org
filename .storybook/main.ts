import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.tsx'],
  addons: ['@storybook/addon-controls', '@storybook/addon-interactions'],
  framework: { name: '@storybook/nextjs', options: {} },
  features: { storyStoreV7: true },
  docs: { autodocs: 'tag' },
  staticDirs: ['../public'],
  core: { disableTelemetry: true },
  webpackFinal: async (config, { configType }) => {
    config.resolve!.modules = [path.resolve(__dirname, '..'), 'node_modules'];

    config.resolve!.alias = {
      ...config.resolve!.alias,
      '@/components': path.resolve(__dirname, '../components'),
      '@/util': path.resolve(__dirname, '../util'),
      '@/hooks': path.resolve(__dirname, '../hooks'),
      '@/navigation.json': path.resolve(__dirname, '../navigation.json'),
      '@/providers': path.resolve(__dirname, '../providers'),
      '@/next.locales.mjs': path.resolve(__dirname, '../next.locales.mjs'),
      '@/next.json.mjs': path.resolve(__dirname, '../next.json.mjs'),
    };

    return config;
  },
};

export default config;
