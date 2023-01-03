const withNextra = require('nextra')({
  theme: './theme.jsx',
});

module.exports = withNextra({
  images: { unoptimized: true },
});
