import fs from 'fs';
import path from 'path';
import semVer from 'semver';
import nodeVersionData from 'node-version-data';

// read the locale config file as a JSON object without using imports
const localeConfig = JSON.parse(fs.readFileSync('./i18n/config.json', 'utf8'));

// loads each locale message file and get a tuple of [locale, messages (string)]
const mapLocaleMessages = f => [
  path.basename(f, path.extname(f)),
  fs.readFileSync(path.join('./i18n/locales', f), 'utf8'),
];

// dynamically load all locale files into json data and converts into an object
const allLocaleMessages = Object.fromEntries(
  fs
    .readdirSync('./i18n/locales')
    .filter(f => path.extname(f) === '.json')
    .map(mapLocaleMessages)
);

const getLocalisationData = (route, defaultLocale = 'en') => {
  const localeCode = route.split('/')[1] || defaultLocale;

  const currentLocale =
    localeConfig.find(c => c.code === localeCode) ||
    localeConfig.find(c => c.code === defaultLocale);

  const localeMessages =
    allLocaleMessages[currentLocale.code] || allLocaleMessages[defaultLocale];

  return `
    const getLocalisationData = () => {
      // defines the current locale information in a string fashion
      const currentLocale = ${JSON.stringify(currentLocale)};

      // defines the current react-intl message object
      const localeMessages = ${localeMessages};

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
