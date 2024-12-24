'use strict';

export const useMessages = () => ({});

export const useNow = () => new Date();

export const useTimeZone = () => 'Etc/UTC';

export const useTranslations = () => {
  const t = key => key;

  t.rich = key => key;
  t.markup = key => key;

  return t;
};

export const useFormatter = () => {
  const formatter = format => new Intl.DateTimeFormat('en-US', format);

  return {
    date: (date, format) => formatter(format).format(date),
    dateTime: (date, format) => formatter(format).format(date),
  };
};

export const NextIntlClientProvider = ({ children }) => children;

export const createNavigation = () => ({
  Link: props => <a {...props} onClick={e => e.preventDefault()} />,
  redirect: () => void null,
  usePathname: () => '',
  useRouter: () => ({ push: () => void null, replace: () => void null }),
});

// eslint-disable-next-line react-hooks/rules-of-hooks
export const getTranslations = () => Promise.resolve(useTranslations());
