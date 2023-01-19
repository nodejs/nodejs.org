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
      const localeConfig = require('i18n/config.json');
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

  return Promise.all([nodeScheduleDataPromise, nodeVersionDataPromise]).then(
    ([schedule, versions]) =>
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
};

const cachedNodeVersionData = getNodeVersionData();

const getNextData = async (content, { route }) => {
  const localisationData = getLocalisationData(route);
  const nodeVersionData = await cachedNodeVersionData;

  return `
    // add the mdx file content
    ${content}

    export const getStaticProps = async () => {
      const memoryCache = require('memory-cache');

      // eval'd the function content
      ${localisationData}

      const i18nProps = getLocalisationData();
      const nodeVersionData = ${JSON.stringify(nodeVersionData)};

      return { props: { ...i18nProps, nodeVersionData } };
    }
  `;
};

export default getNextData;
