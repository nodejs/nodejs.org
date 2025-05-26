import { Locale } from '@node-core/website-i18n/types';

declare module 'next-intl' {
  interface AppConfig {
    Messages: Locale;
  }
}
