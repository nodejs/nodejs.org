import { readdirSync } from 'fs';
import { readFile } from 'fs/promises';
import { basename, extname, join } from 'path';
import { fileURLToPath } from 'url';

// this allows us to get the current module working directory
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// gets the current i18n path based on local module path
const i18nPath = join(__dirname, '../../i18n');

// imports the global i18n config as a static import
import localeConfig from '../../i18n/config.json' assert { type: 'json' };

const getLocalisationData = () => {
  // loads each locale message file and get a tuple of [locale, messages (string)]
  const mapLocaleMessages = f => [
    basename(f, extname(f)),
    readFile(join(i18nPath, 'locales', f), 'utf8').then(JSON.parse),
  ];

  // dynamically load all locale files into json data and converts into an object
  // we read the directory asynchronously as we want all the filenames ahead of time
  const allLocaleMessages = Object.fromEntries(
    readdirSync(join(i18nPath, 'locales'))
      .filter(f => extname(f) === '.json')
      .map(mapLocaleMessages)
  );

  return (route = '/', defaultLocale = 'en') => {
    const localeCode = route.split('/')[1] || defaultLocale;

    const currentLocale =
      localeConfig.find(c => c.code === localeCode) ||
      localeConfig.find(c => c.code === defaultLocale);

    const getLocaleMessages =
      allLocaleMessages[currentLocale.code] || allLocaleMessages[defaultLocale];

    return getLocaleMessages.then(localeMessages => {
      const result = { currentLocale, localeMessages };

      return { i18nData: result };
    });
  };
};

export default getLocalisationData;
