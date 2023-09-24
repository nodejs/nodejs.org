import { Open_Sans } from 'next/font/google';

// These are the shared CSS classes between the Storybook Themes
// Note: These are Tailwind Classes, and `font-open-sans` is the `open-sans`
// font defined within the tailwind.config.ts config file
export const COMMON_CLASSES = 'px-4 py-4 font-open-sans';

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

// This configures the Next.js Font for Open Sans
// We then export a variable and class name to be used
// within Tailwind (tailwind.config.ts) and Storybook (preview.js)
export const OPEN_SANS_FONT = Open_Sans({
  weight: ['300', '400', '600', '700'],
  display: 'fallback',
  subsets: ['latin'],
  variable: '--font-open-sans',
});
