import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../**/*.stories.tsx'],
  logLevel: 'error',
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
};

export default config;
