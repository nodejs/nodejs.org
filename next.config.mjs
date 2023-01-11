import nextra from 'nextra';
import remarkMdxDisableExplicitJsx from 'remark-mdx-disable-explicit-jsx';
import fs from 'fs';

// Note: we currently can't import .json in a mjs file.
const i18nConfig = JSON.parse(fs.readFileSync('./i18n/config.json').toString());

const withNextra = nextra({
  theme: './theme.tsx',
  remarkPlugins: [remarkMdxDisableExplicitJsx],
  mdxOptions: {
    format: 'md',
  },
  transform: (content, { route }) => {
    const code = route.split('/')[1];
    const locale = i18nConfig.find(c => c.code === code)?.code;

    if (locale) {
      return (
        content +
        `
        export const getStaticProps = () => {
          const localeMessages = require('i18n/locales/${locale}.json')
          return {
            props: {
              localeMessages
            },
          }
        }
      `
      );
    }
    return content;
  },
});

export default withNextra({
  images: { unoptimized: true },
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
});
