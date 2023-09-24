import { Open_Sans } from 'next/font/google';

// This defines "execution" modes that Chromatic will run on the each Storybook Story
// This allows us to test each Story with different parameters
// @see https://www.chromatic.com/blog/introducing-story-modes/
export const STORYBOOK_MODES = {
  'dark mobile': {
    theme: 'dark',
    viewport: 'small',
  },
  'dark desktop': {
    theme: 'dark',
    viewport: 'large',
  },
  'light mobile': {
    theme: 'light',
    viewport: 'small',
  },
  'light desktop': {
    theme: 'light',
    viewport: 'large',
  },
};

// These are the supported Viewports for our Storybook Stories
// It is also the different viewports that Chromatic will run the Visual Regression Tests
export const STORYBOOK_SIZES = {
  small: { name: 'Small', styles: { width: '414px', height: '896px' } },
  large: { name: 'Large', styles: { width: '1024px', height: '768px' } },
};

// This configures the Next.js Font for Open Sans
// We then export a variable and class name to be used
// within Tailwind (tailwind.config.ts) and Storybook (preview.js)
export const OPEN_SANS_FONT = Open_Sans({
  weight: ['300', '400', '600', '700'],
  display: 'fallback',
  subsets: ['latin'],
  variable: '--font-open-sans',
});
