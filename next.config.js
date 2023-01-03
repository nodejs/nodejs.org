const withNextra = require('nextra')({
  theme: './theme.tsx',
});

module.exports = withNextra({
  images: { unoptimized: true },
});
