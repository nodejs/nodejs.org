'use strict';

// This is the static Site Configuration
import siteConfig from './site.json' assert { type: 'json' };

// This is the static Site Navigation (legacy website)
import siteNavigation from './navigation.json' assert { type: 'json' };

// This is the static Site External and Internal Redirects Metadata
import siteRedirects from './redirects.json' assert { type: 'json' };

// This is the Website i18n Configuration
import localeConfig from './i18n/config.json' assert { type: 'json' };

// This is the generated blog data for the Node.js Website
import blogData from './public/blog-posts-data.json' assert { type: 'json' };

// This is the Shiki Nord Theme Configuration
// Docs: https://github.com/shikijs/shiki/blob/main/docs/themes.md
// Original Source: https://unpkg.com/browse/shiki@latest/themes/nord.json
import shikiTheme from './styles/vendor/shiki-nord.json' assert { type: 'json' };

export {
  siteConfig,
  siteNavigation,
  siteRedirects,
  localeConfig,
  blogData,
  shikiTheme,
};
