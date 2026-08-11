import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../**/*.stories.tsx'],
  logLevel: 'error',
  typescript: { reactDocgen: false, check: false },
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  framework: '@storybook/react-webpack5',
  swc: () => ({ jsc: { transform: { react: { runtime: 'automatic' } } } }),
  // Storybook renders the components straight from `src`, so `#ui/*` must
  // resolve to the uncompiled sources rather than to the published `dist` output
  webpackFinal: async config => {
    config.resolve ??= {};
    config.resolve.conditionNames = ['source', '...'];

    return config;
  },
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-themes',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          // Replaces existing CSS rules to support PostCSS
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  esModule: false,
                  importLoaders: 1,
                },
              },
              'postcss-loader',
            ],
          },
        ],
      },
    },
  ],
};

export default config;
