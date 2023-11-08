'use strict';

import _localeConfig from './i18n/config.json' assert { type: 'json' };
import _siteNavigation from './navigation.json' assert { type: 'json' };
import _blogData from './public/blog-posts-data.json' assert { type: 'json' };
import _releaseData from './public/node-releases-data.json' assert { type: 'json' };
import _siteRedirects from './redirects.json' assert { type: 'json' };
import _siteConfig from './site.json' assert { type: 'json' };

/** @type {import('./types').LocaleConfig[]} */
export const localeConfig = _localeConfig;

/** @type {Record<string, import('./types').NavigationEntry>} */
export const siteNavigation = _siteNavigation;

/** @type {import('./types').BlogData} */
export const blogData = _blogData;

/** @type {import('./types').NodeRelease[]} */
export const releaseData = _releaseData;

/** @type {Record<string, import('./types').Redirect[]>} */
export const siteRedirects = _siteRedirects;

/** @type {import('./types').SiteConfig} */
export const siteConfig = _siteConfig;
