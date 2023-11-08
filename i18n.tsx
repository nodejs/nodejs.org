import type { RichTranslationValues } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

export const defaultRichTextValues: RichTranslationValues = {
  graySpan: c => <span className="small color-lightgray">{c}</span>,
};

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./i18n/locales/${locale}.json`)).default,
  timeZone: 'Etc/UTC',
}));
