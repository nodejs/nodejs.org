const withNextra = require('nextra')({
  theme: 'nextra-theme-docs', // @TODO: Allow our own theme here as we want to use our own Layout!
  themeConfig: './theme.config.tsx',
});

module.exports = withNextra();
