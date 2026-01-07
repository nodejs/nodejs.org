'use strict';

import _authors from './authors.json' with { type: 'json' };
import _siteNavigation from './navigation.json' with { type: 'json' };
import _blogData from './public/blog-data.json' with { type: 'json' };
import _partners from './public/static/partners/constants.json' with { type: 'json' };
import _siteRedirects from './redirects.json' with { type: 'json' };
import _siteConfig from './site.json' with { type: 'json' };

/** @type {Record<string, import('./types').Author>} */
export const authors = _authors;

/** @type {import('./types').SiteNavigation} */
export const siteNavigation = _siteNavigation;

/** @type {Record<string, Array<import('./types').Redirect>>} */
export const siteRedirects = _siteRedirects;

/** @type {import('./types').SiteConfig} */
export const siteConfig = _siteConfig;

/** @type {import('./types').BlogData} */
export const blogData = _blogData;

/** @type {Array<import('./types').Partner>} */
export const partners = _partners;
