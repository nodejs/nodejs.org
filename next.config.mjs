import nextra from 'nextra';
import remarkGfm from 'remark-gfm';
import remarkMdxDisableExplicitJsx from 'remark-mdx-disable-explicit-jsx';

const withNextra = nextra({
  theme: './theme.tsx',
  remarkPlugins: [remarkMdxDisableExplicitJsx, remarkGfm],
});

export default withNextra({
  images: { unoptimized: true },
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
});
