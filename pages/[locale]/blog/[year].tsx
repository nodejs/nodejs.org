import DynamicTheme from '../../../theme.dynamic';
import * as nextConfig from '../../../next.config.mjs';
import * as nextDynamic from '../../../next.dynamic.mjs';
import * as nextLocales from '../../../next.locales.mjs';
import * as nextData from '../../../next-data/index.mjs';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

// generates the current blog data
const cachedBlogData = nextData.getBlogData();

// get all the available years from the blog data
const availableYears = await nextData.getBlogIndexPages(cachedBlogData);

type StaticParams = { year: string; locale: string };
type StaticProps = { content: MDXRemoteSerializeResult };

// This method generates the Markdown page for the blog index for a given year
// this should be used only for getting the index page for a specific year of the blog
// Note.: this logic is heavily based on the current way how pagination on the blog is done
// and might be removed at any given moment if the pagination logic changes
export const getStaticProps: GetStaticProps<
  StaticProps,
  StaticParams
> = async ({ params = { year: '' } }) => {
  // We replace the `year-` to get the actual year number that we need
  const yearNumber = params.year.replace('year-', '');

  // We generate the source of the Markdown file based on how a "year" page should look like
  const source = availableYears.includes(yearNumber)
    ? `---\nlayout: blog-index.hbs\ntitle: News from ${yearNumber}\npaginate: blog\n---\n`
    : '';

  // This parses the actual Markdown content and returns a full set of props
  // to be passed to the base page (`DynamicPage`) which will render the Markdown
  const staticProps = await nextDynamic.serializeDynamicPage(
    source,
    `blog/${params.year}`,
    `blog/${params.year}.md`
  );

  // We add the extra `params` to the props as they're used within the `DynamicPage`
  return staticProps;
};

// This method generates the blog year paths to be generated at build time
// Note that this logic is actually locale independent and we do not care about
// the value for the locale prop as it's not used anywhere
export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  if (nextConfig.enableStaticExport) {
    // This maps all available blog index pages by each available locale
    // since we need to provide the locale piece from the URL. We need to do this
    // for the full-static version of the website
    const dynamicPaths = nextLocales.availableLocales.map(locale =>
      availableYears.map(year => ({
        params: { year: `year-${year}`, locale: locale.code },
      }))
    );

    return { paths: dynamicPaths.flat(), fallback: 'blocking' };
  }

  return { paths: [], fallback: 'blocking' };
};

export default DynamicTheme;
