import semVer from 'semver';
import nodeVersionData from 'node-version-data';

import localeConfig from './i18n/config.json' assert { type: 'json' };

const getLocalisationData = (route, defaultLocale = 'en') => {
  const localeCode = route.split('/')[1] || defaultLocale;
  const currentLocale =
    localeConfig.find(c => c.code === localeCode) ||
    localeConfig.find(c => c.code === defaultLocale);

  return `
    const getLocalisationData = () => {
      const currentLocale = ${JSON.stringify(currentLocale)};
      const localeMessages = require('i18n/locales/${currentLocale.code}.json');

      return { currentLocale, localeMessages };
    }
  `;
};

const getNodeVersionData = async () => {
  const nodeScheduleDataPromise = fetch(
    'https://raw.githubusercontent.com/nodejs/Release/master/schedule.json'
  ).then(response => response.json());

  const nodeVersionDataPromise = new Promise(resolve =>
    nodeVersionData((_, versions) => resolve(versions))
  );

  const data = await Promise.all([
    nodeScheduleDataPromise,
    nodeVersionDataPromise,
  ]).then(([schedule, versions]) =>
    versions.map(v => ({
      node: v.version,
      nodeNumeric: v.version.replace(/^v/, ''),
      nodeMajor: `v${semVer.major(v.version)}.x`,
      npm: v.npm || 'N/A',
      v8: v.v8 || 'N/A',
      openssl: v.openssl || 'N/A',
      isLts: Boolean(v.lts),
      releaseDate: v.date,
      ltsName: v.lts || null,
      modules: v.modules || '0',
      schedule: schedule[semVer.major(v.version)] || null,
    }))
  );

  const currentNodeVersion = data[0];
  const currentLtsVersion = data.find(version => version.isLts);

  return {
    allVersions: data,
    currentNodeVersion,
    currentLtsVersion,
  };
};

// Do the request in the global level and cache the result in memory to avoid
// double requests.
const cachedNodeVersionData = getNodeVersionData();

const getNextData = async (content, { route }) => {
  const localisationData = getLocalisationData(route);
  const nodeVersionData = await cachedNodeVersionData;

  // Only /download needs the data for all releases
  const needAllReleasesData = /\/[^/]+\/download$/.test(route);
  let minimalNodeVersionData;

  if (needAllReleasesData) {
    minimalNodeVersionData = nodeVersionData.allVersions;
  } else {
    // We only need the current version and the current LTS version.
    // They can be the same and in that case we can just pass one.
    minimalNodeVersionData =
      nodeVersionData.currentNodeVersion === nodeVersionData.currentLtsVersion
        ? [nodeVersionData.currentNodeVersion]
        : [
            nodeVersionData.currentNodeVersion,
            nodeVersionData.currentLtsVersion,
          ];
  }

  return `
    // add the mdx file content
    ${content}

    export const getStaticProps = async () => {
      // eval'd the function content
      ${localisationData}

      const i18nProps = getLocalisationData();
      const nodeVersionData = ${JSON.stringify(minimalNodeVersionData)};

      return { props: { ...i18nProps, nodeVersionData } };
    }
  `;
};

export default getNextData;
