import classNames from 'classnames';
import { NextIntlClientProvider } from 'next-intl';

import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { NotificationProvider } from '@/providers/notificationProvider';
import {
  OPEN_SANS_FONT,
  IBM_PLEX_MONO_FONT,
  STORYBOOK_MODES,
  STORYBOOK_SIZES,
} from '@/.storybook/constants';
import type { Preview, ReactRenderer } from '@storybook/react';

import englishLocale from '@/i18n/locales/en.json';

import '../styles/new/index.css';

const rootClasses = classNames(
  OPEN_SANS_FONT.variable,
  IBM_PLEX_MONO_FONT.variable,
  'font-open-sans'
);

const preview: Preview = {
  parameters: {
    nextjs: { router: { basePath: '' } },
    chromatic: { modes: STORYBOOK_MODES },
    viewport: { defaultViewport: 'large', viewports: STORYBOOK_SIZES },
  },
  // These are extra Storybook Decorators applied to all stories
  // that introduce extra functionality such as Theme Switching
  // and all the App's Providers (Site, Theme, Locale)
  decorators: [
    Story => (
      <NextIntlClientProvider locale="en" messages={englishLocale}>
        <NotificationProvider viewportClassName="absolute top-0 left-0 list-none">
          <div className={rootClasses}>
            <Story />
          </div>
        </NotificationProvider>
      </NextIntlClientProvider>
    ),
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
