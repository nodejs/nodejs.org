'use strict';

import localeConfig from './i18n/config.json' assert { type: 'json' };
import siteNavigation from './navigation.json' assert { type: 'json' };
import blogData from './public/blog-posts-data.json' assert { type: 'json' };
import releaseData from './public/node-releases-data.json' assert { type: 'json' };
import siteRedirects from './redirects.json' assert { type: 'json' };
import siteConfig from './site.json' assert { type: 'json' };

export {
  siteConfig,
  siteNavigation,
  siteRedirects,
  localeConfig,
  blogData,
  releaseData,
};
