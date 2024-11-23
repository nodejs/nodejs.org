import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/react';

import {
  STORYBOOK_MODES,
  STORYBOOK_SIZES,
} from '../../../.storybook/constants';

import './tailwind.css';

const preview: Preview = {
  parameters: {
    chromatic: { modes: STORYBOOK_MODES },
    viewport: { defaultViewport: 'large', viewports: STORYBOOK_SIZES },
  },
  decorators: [
    withThemeByDataAttribute<ReactRenderer>({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
