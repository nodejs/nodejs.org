import semVer from 'semver';
import nodeVersionData from 'node-version-data';

import localeConfig from './i18n/config.json' assert { type: 'json' };

const getLocalisationData = (route, defaultLocale = 'en') => {
  const localeCode = route.split('/')[1] || defaultLocale;

  const currentLocale = localeConfig.find(
    c => c.code === localeCode || c.code === defaultLocale
  );

  return `
    const getLocalisationData = () => {
      const currentLocale = ${JSON.stringify(currentLocale)};
      const localeMessages = require('i18n/locales/${currentLocale.code}.json');

      return { currentLocale, localeMessages };
    }
  `;
};

const getNodeVersionData = async () => {
  const nodeVersionDataPromise = new Promise(resolve =>
    nodeVersionData((_, versions) => resolve(versions))
  );

  return nodeVersionDataPromise.then(data => {
    return [data[0], data.find(version => !!version.lts)].map(v => ({
      node: v.version,
      nodeNumeric: v.version.replace(/^v/, ''),
      nodeMajor: `v${semVer.major(v.version)}.x`,
      npm: v.npm || 'N/A',
      isLts: Boolean(v.lts),
    }));
  });
};

// Do the request in the global level and cache the result in memory to avoid
// double requests.
const cachedNodeVersionData = getNodeVersionData();

const getNextData = async (content, { route }) => {
  const localisationData = getLocalisationData(route);
  const nodeVersionData = await cachedNodeVersionData;

  return `
    // add the mdx file content
    ${content}

    export const getStaticProps = () => {
      // eval'd the function content
      ${localisationData}

      const i18nProps = getLocalisationData();
      const nodeVersionData = ${JSON.stringify(nodeVersionData)};

      return { props: { ...i18nProps, nodeVersionData } };
    }
  `;
};

export default getNextData;
