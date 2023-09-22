import { Open_Sans } from 'next/font/google';

// These are the shared CSS classes between the Storybook Themes
const THEME_COMMON_CLASSES = 'px-4 py-4 font-open-sans';

// These are the theme-specific CSS classes for Storybook Themes
export const THEME_EXTRA_CLASSES = {
  dark: `${THEME_COMMON_CLASSES} bg-black text-white`,
  light: `${THEME_COMMON_CLASSES} bg-white text-black`,
  '': `${THEME_COMMON_CLASSES} bg-white text-black`,
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
