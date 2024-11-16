import englishLocale from '@node-core/website-i18n/locales/en.json';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';

import { STORYBOOK_MODES, STORYBOOK_SIZES } from '@/.storybook/constants';
import { NotificationProvider } from '@/providers/notificationProvider';

import '../styles/index.css';

const preview: Preview = {
  parameters: {
    chromatic: { modes: STORYBOOK_MODES },
    viewport: { defaultViewport: 'large', viewports: STORYBOOK_SIZES },
  },
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale="en"
        timeZone="Etc/UTC"
        messages={englishLocale}
      >
        <NotificationProvider viewportClassName="absolute top-0 left-0 list-none">
          <Story />
        </NotificationProvider>
      </NextIntlClientProvider>
    ),
    withThemeByDataAttribute<ReactRenderer>({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
