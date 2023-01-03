import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react';

type LayoutProps = React.PropsWithChildren<{ pageOpts: unknown }>;

// @TODO: Update the Correct Types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Layout = ({ pageOpts, children }: LayoutProps) => {
  // Front matter of the current page:
  // pageOpts.frontMatter

  // You can build the sidebar based on the structure data from `pageMap`:
  // console.log(pageOpts.pageMap)

  const { route } = useRouter();
  const localePrefix = `/${route.split('/')[1]}`;

  return (
    <>
      <Head>
        <title>Nodejs.org</title>
      </Head>
      <div>
        <nav>
          <h2>This is the navbar</h2>
          <Link href="/en">EN</Link>
          {' | '}
          <Link href="/de">DE</Link>
        </nav>
        <main>
          <aside>
            <h3>Navigation</h3>
            <div>
              <Link href={localePrefix}>Home</Link>
            </div>
            <div>
              <Link href={`${localePrefix}/docs/globals`}>Globals</Link>
            </div>
          </aside>
          <article>
            <MDXProvider>{children}</MDXProvider>
          </article>
        </main>
        <footer>This is the footer</footer>
      </div>
    </>
  );
};

// @TODO: Update the Correct Types
const Theme = (props: object) => {
  // These are just initial setup for Nextra themes
  const { route } = useRouter();

  // @TODO: Get the correct type for this
  // eslint-disable-next-line no-underscore-dangle
  const context = globalThis.__nextra_pageContext__[route];

  if (!context) {
    // @TODO: Better handling when there is no context?
    throw new Error(`No content found for ${route}.`);
  }

  const { pageOpts, Content } = context;

  return (
    <Layout pageOpts={pageOpts}>
      <Content {...props} />
    </Layout>
  );
};

export default Theme;
