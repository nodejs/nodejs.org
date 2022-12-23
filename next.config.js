const withNextra = require('nextra')({
  theme: 'nextra-theme-docs', // @TODO: Allow our own theme here as we want to use our own Layout!
  themeConfig: './theme.config.tsx',
});

// @TODO: Does this support any Next.js config option?
// @TODO: Enable Automatic Language Detection and Trailing Default Language
module.exports = withNextra({
  i18n: {
    locales: ['en', 'zh', 'de'], // @TODO: Get i18n configuration from i18n file
    defaultLocale: 'en',
  },
  trailingSlash: true,
});
