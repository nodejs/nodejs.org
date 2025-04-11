'use strict';

export const useTranslations = () => key => key;

export const useFormatter = () => {
  const formatter = format => new Intl.DateTimeFormat('en-US', format);

  return {
    date: (date, format) => formatter(format).format(date),
    dateTime: (date, format) => formatter(format).format(date),
  };
};

export const createNavigation = () => ({
  Link: props => <a {...props} onClick={e => e.preventDefault()} />,
});
