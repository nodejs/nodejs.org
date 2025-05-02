import localFont from 'next/font/local';

// This configures the Next.js Font for Open Sans
// We then export a variable and class name to be used
// within Tailwind (tailwind.config.ts) and Storybook (preview.js)
export const OPEN_SANS = localFont({
  src: './public/static/fonts/open-sans.woff2',
  display: 'fallback',
  variable: '--font-open-sans',
});

// This configures the Next.js Font for IBM Plex Mono
// We then export a variable and class name to be used
// within Tailwind (tailwind.config.ts) and Storybook (preview.js)
export const IBM_PLEX_MONO = localFont({
  src: './public/static/fonts/ibm-plex-mono.woff2',
  display: 'fallback',
  variable: '--font-ibm-plex-mono',
});
