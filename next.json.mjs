'use strict';

import { readFileSync } from 'node:fs';

/** @type {Record<string, import('./types').NavigationEntry>} */
export const siteNavigation = JSON.parse(readFileSync('./navigation.json'));

/** @type {Record<string, import('./types').Redirect[]>} */
export const siteRedirects = JSON.parse(readFileSync('./redirects.json'));

/** @type {import('./types').SiteConfig} */
export const siteConfig = JSON.parse(readFileSync('./site.json'));
