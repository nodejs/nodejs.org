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

// This is used for telling Next.js to to a Static Export Build of the Website
// This is used for static/without a Node.js server hosting, such as on our
// legacy Website Build Environment on Node.js's DigitalOcean Droplet.
// Note.: Image optimization is also disabled through this process
const enableStaticExport = process.env.NEXT_STATIC_EXPORT === 'true';

// Supports a manuall override of the base path of the website
// This is useful when running the deployment on a subdirectory
// of a domain, such as when hosted on GitHub Pages.
const basePath = String(process.env.NEXT_BASE_PATH || '');

export default withNextra({
  basePath,
  trailingSlash: false,
  outputFileTracing: false,
  distDir: enableStaticExport ? 'build' : '.next',
  output: enableStaticExport ? 'export' : undefined,
  images: { unoptimized: enableStaticExport },
  eslint: { dirs: ['.'] },
  i18n: null,
});
