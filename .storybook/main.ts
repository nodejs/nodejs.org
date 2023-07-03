import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.tsx'],
  addons: ['@storybook/addon-controls', '@storybook/addon-interactions'],
  framework: { name: '@storybook/nextjs', options: {} },
  features: { storyStoreV7: true },
  docs: { autodocs: 'tag' },
  staticDirs: ['../public'],
  core: { disableTelemetry: true },
};

export default config;
