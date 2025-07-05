import * as Toast from '@radix-ui/react-toast';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/react';

import { STORYBOOK_MODES, STORYBOOK_SIZES } from './constants';

import '#ui/styles/index.css';

const preview: Preview = {
  parameters: {
    chromatic: { modes: STORYBOOK_MODES },
    viewport: { defaultViewport: 'large', viewports: STORYBOOK_SIZES },
  },
  decorators: [
    Story => (
      <Toast.Provider>
        <Story />
        <Toast.Viewport />
      </Toast.Provider>
    ),
    withThemeByDataAttribute<ReactRenderer>({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    // TODO(@avivkeller): Once storybook fixes their types
    // this can be removed, since `withThemeByDataAttribute`
    // will return the same type that is accepted by `Preview`
  ] as Preview['decorators'],
};

export default preview;
