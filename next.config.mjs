import nextra from 'nextra';
import remarkMdxDisableExplicitJsx from 'remark-mdx-disable-explicit-jsx';

import getNextData from './next.data.mjs';

const withNextra = nextra({
  theme: './theme.tsx',
  flexsearch: false,
  codeHighlight: false,
  mdxOptions: {
    remarkPlugins: [remarkMdxDisableExplicitJsx],
    format: 'detect',
  },
  transform: getNextData,
  transformPageOpts: pageOpts => {
    delete pageOpts.pageMap;
    delete pageOpts.headings;
    delete pageOpts.timestamp;

    return pageOpts;
  },
});

export default withNextra({
  trailingSlash: true,
  images: { unoptimized: true },
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    nextScriptWorkers: true,
    sharedPool: true,
    enableUndici: true,
    newNextLinkBehavior: true,
  },
});
