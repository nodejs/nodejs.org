import { useMemo } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import NextraTheme from './theme';
import type { FC } from 'react';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { AppProps, LegacyFrontMatter } from './types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface DynamicThemeProps extends AppProps {
  content: MDXRemoteSerializeResult;
}

// This is the engine for Incremental Generated Static Pages
// this component supports rendering remote-Markdown content
// loaded from the server-side/static-build
// we simulate the props that the NextraTheme receives as much as possible
// the _page.mdx is already wrapped surrounding the tree of children components
// extra props might come from extra context hence why we spread the props
const DynamicTheme: FC<DynamicThemeProps> = ({ content, ...props }) => {
  const frontMatter = content.frontmatter as LegacyFrontMatter;

  // this configures the pageOpts passed down to the NextraTheme which are used
  // for resolving the layout and other intrinsic configuration of the Theme based on Frontmatter
  const nextraThemeProps = useMemo(
    () => ({
      // We're not sure what needs to be forwarded here, but afaik since we use a Custom Theme,
      // we don't really have any Theme Config to forward. This seems to be used only for native
      // (bundled) themes from Nextra to allow the end-user to customize the theme.
      // but this option seems to be unused for custom themes. It seems like we could use it if we wanted
      // to customize things directly on `theme.tsx` as this themeConfig comes from `withNextra` on `next.config.mjs`
      themeConfig: null,
      // We simply forward the `pageProps` we receive from here to NextraTheme
      pageProps: props,
      // We create a replica of what Nextra would be passing down to the Theme's `pageOpts`
      // Sadly for dynamic pages we're unable (yet) to compute the headings.
      // `pageMap`, `filePath` and `route` are unused by us and are only used by Nextra's native themes
      pageOpts: {
        frontMatter,
        headings: [],
        pageMap: [],
        title: frontMatter.title || 'Node.js',
        filePath: '',
        route: '',
      },
    }),
    [frontMatter, props]
  );

  return (
    <NextraTheme {...nextraThemeProps}>
      <MDXRemote {...content} />
    </NextraTheme>
  );
};

export default DynamicTheme;
