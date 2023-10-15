import NextImage from 'next/image';
import classNames from 'classnames';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { SiteProvider } from '../providers/siteProvider';
import { LocaleProvider } from '../providers/localeProvider';
import { NotificationProvider } from '../providers/notificationProvider';
import { ThemeProvider } from '../providers/themeProvider';
import * as constants from './constants';
import type { Preview, ReactRenderer } from '@storybook/react';

import '../styles/new/index.css';

const rootClasses = classNames(
  constants.OPEN_SANS_FONT.variable,
  constants.IBM_PLEX_MONO_FONT.variable,
  'font-open-sans'
);

const preview: Preview = {
  parameters: {
    nextjs: { router: { basePath: '' } },
    chromatic: { modes: constants.STORYBOOK_MODES },
    viewport: {
      defaultViewport: 'large',
      viewports: constants.STORYBOOK_SIZES,
    },
  },
  // These are extra Storybook Decorators applied to all stories
  // that introduce extra functionality such as Theme Switching
  // and all the App's Providers (Site, Theme, Locale)
  decorators: [
    Story => (
      <SiteProvider>
        <LocaleProvider>
          <ThemeProvider>
            <NotificationProvider viewportClassName="absolute top-0 left-0 list-none">
              <div className={rootClasses}>
                <Story />
              </div>
            </NotificationProvider>
          </ThemeProvider>
        </LocaleProvider>
      </SiteProvider>
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
