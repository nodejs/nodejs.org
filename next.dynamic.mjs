import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import remarkGfm from 'remark-gfm';
import { serialize } from 'next-mdx-remote/serialize';
import * as nextConfig from './next.config.mjs';
import * as nextLocale from './next.locales.mjs';
import * as nextData from './next-data/index.mjs';

// this allows us to get the current module working directory
const __dirname = nextData.helpers.getRelativePath(import.meta.url);

// generates the current blog data
const cachedBlogData = nextData.getBlogData();

// during full static build we don't want to cover blog posts
// as otherwise they will all get built as static pages during build time
const ignoredPaths = nextConfig.enableStaticExport ? ['blog/**'] : [];

// this retrieves all pages that are under the english locale directory
// besides blog posts since they should not be localised at all
const sourcePages = await nextData.helpers.getMarkdownFiles(
  __dirname,
  `pages/${nextLocale.defaultLocale.code}`,
  ignoredPaths
);

/**
 * This method is responsible for generating a spanning tree of all locales that
 * do not have translated pages by checking the source default language and comparing
 * with the other languages to determine which pages do not exist.
 *
 * The shape below is an example of a tuple entry from the resulting array
 * as you can see the paths are split by (/) meaning pathnames such as /docs/guides
 * become ["docs", "guides"] this is important as Next.js [...pathname] routing param
 * requires the pathname to be an array of the constituitng parts.
 * ['de', [["docs", "guides"], ["about"], ["download", "current"]]]
 *
 * @returns {Promise<[string, string[][]][]>} a promise containing an array of tuples
 */
export const getDynamicLocalizedPaths = async () => {
  // this compares all available languages and which pages are missing
  // by filtering out languages that exist on each localisation
  // keeping only the non translated pages as the result
  // the final result is converted to a Map by language code
  const missingPagesByLanguage = nextLocale.nonDefaultLanguages.map(locale =>
    nextData.helpers
      .getMarkdownFiles(__dirname, `pages/${locale.code}`)
      .then(files => sourcePages.filter(file => !files.includes(file)))
      .then(files => files.map(file => file.split('/')))
      .then(files => [locale.code, files])
  );

  return Promise.all(missingPagesByLanguage);
};

/**
 * This method attempts to find a matching file in the fileystem provided originally
 * by `getStaticPaths` and returns the file source and filename.
 *
 * Note that this method is safe as it is always provided by paths determined by the server
 * that are non-localized pages that exist on the English locale.
 *
 * Hence we don't fallback for non-existing pages as it should never fall into this scenario.
 * As a security measure we also check against `validFallbackFolders` to ensure that at the last scenario
 * the base path comes from a valid base folder. Next.js will already protect against common attack vectors
 * such as `/../../` on the URL pathname and other methodologies
 *
 * @param {string[]} paths the pathname string as an array (split by /)
 * @param {string} locale the locale code to be used for the source file
 * @returns {{ source: string, filename: string, pathname: string }} the source and filename
 * @throws {Error} if the file does not exist, which should never happen
 */
export const getMarkdownFileSource = (
  paths = [],
  locale = nextLocale.defaultLocale.code
) => {
  // we want to transform the array of pieces of path into a string
  const pathname = paths.join('/');

  // gets the full pathname for the file (absolute path)
  const filename = join(__dirname, 'pages', locale, pathname);

  // We verify if the file exists within the list of allowed pages
  // which prevents any malicious attempts to access non-allowed pages
  // or other files that do not belong to the `sourcePages`
  if (pathname.length && sourcePages.includes(pathname)) {
    const filenameWithExtension = nextData.helpers.checkFileExists(filename, [
      '/index.md',
      '/index.mdx',
      '.md',
      '.mdx',
    ]);

    // Since we always will only read files that we know exist
    // we don't need to handle a possibility of an error being thrown
    // as any other case is if we don't have file system access and that should
    // then be thrown and reported
    const source = readFileSync(filenameWithExtension, 'utf8');

    return { source, filename: filenameWithExtension, pathname };
  }

  return { source: '', filename: '', pathname };
};

/**
 * This Method gathers the Markdown Source and the source filename
 * and processes the data (parses the markdown) and generate props
 * for the application to consume (`getStaticProps`)
 *
 * @param {string} source the Markdown source file
 * @param {string} pathname the full path name
 * @param {string} filename the filename
 * @returns {Promise<{ notFound: boolean, props: any }>} the props for the page
 */
export const serializeDynamicPage = async (
  source = '',
  pathname = '',
  filename = ''
) => {
  // by default a page is not found if there's no source or filename
  const staticProps = { notFound: true, props: {} };

  // We only attempt to serialize data if the `source` has content and `filename` has content
  // otherwise we return a 404 since this means that it is not a valid file or a file we should care about
  if (source.length && pathname.length) {
    // This act as a MDX "compiler" but, lightweight. It parses the Markdown
    // string source into a React Component tree, and then it serializes it
    // it also supports Remark plugins, and MDX components
    // Note.: We use the filename extension to define the mode of execution
    // Note.: This functionality is unrelated to Nextra
    const content = await serialize(source, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        format: filename.includes('.mdx') ? 'mdx' : 'md',
      },
    });

    // this defines the basic props that should be passed back to the `DynamicPage` component
    staticProps.props = { content };
    staticProps.notFound = false;

    // if the basePath is a blog page then we need extra static blog contextual data
    // this will be gathered on demand as needed by the `cachedBlogData` function
    if (pathname.startsWith('blog')) {
      const blogProps = await cachedBlogData(`//${pathname}`);

      // we add extra blog props to blog pages calculated by the `cachedBlogData`
      staticProps.props = { ...staticProps.props, ...blogProps };
    }
  }

  return staticProps;
};
