import React from 'react';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';

import type { DocsThemeConfig } from 'nextra-theme-docs';

// @TODO: Add full configuration such as SEO and i18n
const config: DocsThemeConfig = {
  // @TODO: Add proper logo file that also supports Light/Dark Theme
  logo: <span>Node.js</span>,
  project: {
    link: 'https://github.com/nodejs/nodejs.org',
  },
  // @TODO: Properly Configure Meta Tags
  // @TODO: Add RSS Feed through Next.js
  head: () => {
    const { asPath } = useRouter();
    const { frontMatter } = useConfig();

    const metaDescription =
      frontMatter.description ||
      "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.";

    return (
      <>
        <meta name="author" content="Node.js" />
        <meta name="description" content={metaDescription} />

        <meta property="og:site_name" content="Node.js" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="224" />
        <meta property="og:image:height" content="256" />
        <meta property="og:url" content={`https://nodejs.org${asPath}`} />
        <meta property="og:title" content={frontMatter.title || 'Nodejs.org'} />
        <meta property="og:description" content={metaDescription} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nodejs" />
        <meta
          name="twitter:title"
          content={frontMatter.title || 'Nodejs.org'}
        />
        <meta
          name="twitter:image"
          content="https://nodejs.org/static/images/logo-hexagon-card.png"
        />
        <meta name="twitter:image:alt" content="The Node.js Hexagon Logo" />
      </>
    );
  },
  // @TODO: Add proper SEO configuration that matches our existing SEO config
  useNextSeoProps() {
    return {};
  },
  // @TODO: Add full i18n configuration from a JSON file
  i18n: [{ locale: 'en', text: 'English' }],
};

export default config;
