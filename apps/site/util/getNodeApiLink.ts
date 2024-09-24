import semVer from 'semver';

import { DOCS_URL, DIST_URL } from '@/next.constants.mjs';

export const getNodeApiLink = (version: string) => {
  if (semVer.satisfies(version, '>=0.3.1 <0.5.1')) {
    return `${DOCS_URL}${version}/api/`;
  }

  if (semVer.satisfies(version, '>=0.1.14 <0.3.1')) {
    return `${DOCS_URL}${version}/api.html`;
  }

  return semVer.satisfies(version, '>=1.0.0 <4.0.0')
    ? `https://iojs.org/dist/${version}/docs/api/`
    : `${DIST_URL}${version}/docs/api/`;
};
