import nextra from 'nextra';

import remarkGfm from 'remark-gfm';
import getNextData from './next.data.mjs';

const withNextra = nextra({
  theme: 'theme.tsx',
  flexsearch: false,
  codeHighlight: false,
  mdxOptions: { format: 'detect', remarkPlugins: [remarkGfm] },
  transform: getNextData,
  transformPageOpts: pageOpts => {
    delete pageOpts.pageMap;
    delete pageOpts.headings;
    delete pageOpts.timestamp;

    return pageOpts;
  },
});

const enableImageOptimization =
  process.env.NEXT_ENABLE_IMAGE_OPTIMIZATION === 'true';

export default withNextra({
  trailingSlash: false,
  images: { unoptimized: !enableImageOptimization },
  outputFileTracing: false,
  basePath: String(process.env.NEXT_BASE_PATH || ''),
});
