import { readdirSync } from 'fs';
import { readFile } from 'fs/promises';
import { basename, extname, join } from 'path';
import { fileURLToPath } from 'url';

const getLocalisationData = () => {
  // this allows us to get the current module working directory
  const __dirname = fileURLToPath(new URL('.', import.meta.url));

  const i18nPath = join(__dirname, '../../i18n');

  // read the locale config file as a JSON object without using imports
  const localePromise = readFile(join(i18nPath, 'config.json')).then(
    JSON.parse
  );

  // loads each locale message file and get a tuple of [locale, messages (string)]
  const mapLocaleMessages = f => [
    basename(f, extname(f)),
    readFile(join(i18nPath, 'locales', f), 'utf8'),
  ];

  // dynamically load all locale files into json data and converts into an object
  const allLocaleMessages = Object.fromEntries(
    readdirSync(join(i18nPath, 'locales'))
      .filter(f => extname(f) === '.json')
      .map(mapLocaleMessages)
  );

  return (route, defaultLocale = 'en') => {
    const localeCode = route.split('/')[1] || defaultLocale;

    return localePromise.then(localeConfig => {
      const currentLocale =
        localeConfig.find(c => c.code === localeCode) ||
        localeConfig.find(c => c.code === defaultLocale);

      const getLocaleMessages =
        allLocaleMessages[currentLocale.code] ||
        allLocaleMessages[defaultLocale];

      return getLocaleMessages.then(
        localeMessages => `
          const getLocalisationData = () => {
            // defines the current locale information in a string fashion
            const currentLocale = ${JSON.stringify(currentLocale)};

            // defines the current react-intl message object
            const localeMessages = ${localeMessages};

            return { currentLocale, localeMessages };
          }`
      );
    });
  };
};

export default getLocalisationData;
