import NextImage from 'next/image';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { SiteProvider } from '../providers/siteProvider';
import { ThemeProvider } from '../providers/themeProvider';
import { LocaleProvider } from '../providers/localeProvider';
import { OPEN_SANS_FONT, STORYBOOK_MODES, THEME_CLASSES } from './constants';
import type { Preview, ReactRenderer, Decorator } from '@storybook/react';

import '../styles/new/index.scss';

const preview: Preview = {
  parameters: {
    nextjs: { router: { basePath: '' } },
    chromatic: {
      //🔶 Test each story for ArticleCard in two modes
      modes: STORYBOOK_MODES,
    },
  },
};

// The `openSans.variable` injects the name of the Font Family to the DOM Tree
// The `font-open-sans` variable is the actual Tailwind Classname
// that tells that the font-family for this Component tree should be "Open Sans"
const getStoryClasses = (theme: string) =>
  `${OPEN_SANS_FONT.variable} ${THEME_CLASSES[theme]}`;

// These are extra Storybook Decorators applied to all stories
// that introduce extra functionality such as Theme Switching
// and all the App's Providers (Site, Theme, Locale)
export const decorators: Decorator[] = [
  (Story, context) => (
    <SiteProvider>
      <LocaleProvider>
        <ThemeProvider>
          <div className={getStoryClasses(context.globals.theme)}>
            <Story />
          </div>
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
];

// This forces the Next.js image system to use unoptimized images
// for all the Next.js Images (next/image) Components
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <NextImage {...props} unoptimized />,
});

export default preview;
