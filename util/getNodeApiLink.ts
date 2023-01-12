import semVer from 'semver';

export const getNodeApiLink = (version: string) => {
  if (semVer.satisfies(version, '>=0.3.1 <0.5.1')) {
    return `https://nodejs.org/docs/${version}/api/`;
  }

  if (semVer.satisfies(version, '>=0.1.14 <0.3.1')) {
    return `https://nodejs.org/docs/${version}/api.html`;
  }

  return semVer.satisfies(version, '>=1.0.0 <4.0.0')
    ? `https://iojs.org/dist/${version}/docs/api/`
    : `https://nodejs.org/dist/${version}/docs/api/`;
};
