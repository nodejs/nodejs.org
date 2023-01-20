import semVer from 'semver';
import nodeVersionData from 'node-version-data';

const getMatchingRoutes = (route = '', matches = []) =>
  matches.some(match => route === match);

const getNodeVersionData = () => {
  const nodeVersionDataPromise = new Promise(resolve =>
    nodeVersionData((_, versions) => resolve(versions))
  );

  return (route = '/') => {
    const [, , subDirectory] = route.split('/');

    if (getMatchingRoutes(subDirectory, ['download', '', 'docs'])) {
      return nodeVersionDataPromise.then(data => {
        return [data[0], data.find(version => !!version.lts)].map(v => ({
          node: v.version,
          nodeNumeric: v.version.replace(/^v/, ''),
          nodeMajor: `v${semVer.major(v.version)}.x`,
          npm: v.npm || 'N/A',
          isLts: Boolean(v.lts),
        }));
      });
    }

    return [];
  };
};

export default getNodeVersionData;
