import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react';

import Header from './components/Header';
import type { LegacyFrontMatter } from './types';

type PageOpts = { frontMatter: LegacyFrontMatter };
type LayoutProps = React.PropsWithChildren<{ pageOpts: PageOpts }>;

// @TODO: Update the Correct Types
// eslint-disable-next-line no-unused-vars
const Layout = ({ pageOpts, children }: LayoutProps) => {
  // Front matter of the current page:
  // pageOpts.frontMatter

  // You can build the sidebar based on the structure data from `pageMap`:
  // console.log(pageOpts.pageMap)

  const { route } = useRouter();
  const localePrefix = `/${route.split('/')[1]}`;

  // NOTE: This hierarchy/tree is temporary. Things are going to change
  return (
    <>
      <Header frontMatter={pageOpts.frontMatter} />
      <div>
        <nav>
          {/* implement navigation */}
          <Link href={localePrefix}>Home</Link>
        </nav>
        <main>
          {/* implement the different kind of layouts */}
          <article>
            <MDXProvider>{children}</MDXProvider>
          </article>
        </main>
        <footer>{/* implement footer */}</footer>
      </div>
    </>
  );
};

// @TODO: Update the Correct Types
const Theme = (props: object) => {
  // These are just initial setup for Nextra themes
  const { route } = useRouter();

  // @TODO: Get the correct type for this
  const context = globalThis.__nextra_pageContext__[route];

  if (!context) {
    // @TODO: Better handling when there is no context?
    throw new Error(`No content found for ${route}.`);
  }

  const { pageOpts, Content } = context;

  return (
    // @TODO: Implement a Layout Factory/Switcher
    <Layout pageOpts={pageOpts}>
      <Content {...props} />
    </Layout>
  );
};

export default Theme;
