const getLocalisationData = (route, defaultLocale = 'en') => {
  const localeCode = route.split('/')[1] || defaultLocale;

  return `
    const getLocalisationData = () => {
      const localeConfig = require('i18n/config.json');

      const currentLocale =
        localeConfig.find(c => c.code === '${localeCode}' || c.code === '${defaultLocale}');

      const localeMessages = require(\`i18n/locales/\${currentLocale.code}.json\`);

      return { currentLocale, localeMessages, availableLocales: localeConfig };
    }
  `;
};

const getNodeVersionData = () => {
  return `
    const getNodeVersionData = async () => {
      const semVer = require('semver');
      const nodeVersionData = require('node-version-data');

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
            nodeMajor: \`v\${semVer.major(v.version)}.x\`,
            npm: v.npm || null,
            v8: v.v8 || null,
            openssl: v.openssl || null,
            isLts: Boolean(v.lts),
            schedule: schedule[semVer.major(v.version)] || null,
          }))
      );
    }
  `;
};

const getNextData = (content, { route }) => {
  const localisationData = getLocalisationData(route);
  const nodeVersionData = getNodeVersionData();

  return `
    // add the mdx file content
    ${content}

    export const getStaticProps = async () => {
      // eval'd the function content
      ${localisationData}

      // eval'd the function content
      ${nodeVersionData}

      const i18nProps = getLocalisationData();
      const nodeVersionData = await getNodeVersionData();

      return { props: { ...i18nProps, nodeVersionData } };
    }
  `;
};

export default getNextData;
