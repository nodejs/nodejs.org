import nextra from 'nextra';
import remarkMdxDisableExplicitJsx from 'remark-mdx-disable-explicit-jsx';

import getNextData from './next.data.mjs';

const withNextra = nextra({
  theme: './theme.tsx',
  mdxOptions: { format: 'md', remarkPlugins: [remarkMdxDisableExplicitJsx] },
  transform: getNextData,
});

export default withNextra({
  trailingSlash: true,
  experimental: {
    optimizeCss: true,
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
});
