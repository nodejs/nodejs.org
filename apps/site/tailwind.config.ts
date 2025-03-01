import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './pages/**/*.{tsx,mdx}',
    './components/**/*.tsx',
    './providers/**/*.tsx',
    './layouts/**/*.tsx',
    './.storybook/preview.tsx',
    './.storybook/main.ts',
    './app/**/*.tsx',
  ],
  theme: {
    extend: {
      screens: { xs: '670px' },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-subtle':
          'linear-gradient(180deg, theme(colors.neutral.100 / 50%) 0%, theme(colors.neutral.100 / 0%) 48.32%)',
        'gradient-subtle-dark':
          'linear-gradient(180deg, theme(colors.neutral.900 / 50%) 0%, theme(colors.neutral.900 / 0%) 48.32%)',
        'gradient-subtle-gray':
          'linear-gradient(180deg, theme(colors.neutral.900) 0%, theme(colors.neutral.900 / 80%) 100%)',
        'gradient-subtle-white':
          'linear-gradient(180deg, theme(colors.white) 0%, theme(colors.white / 80%) 100%)',
        'gradient-glow-backdrop':
          'radial-gradient(8em circle at calc(50%) 10px, theme(colors.green.500), transparent 30%)',
      },
      boxShadow: {
        xs: '0px 1px 2px 0px theme(colors.shadow / 5%)',
        lg: '0px 4px 6px -2px theme(colors.shadow / 3%), 0px 12px 16px -4px theme(colors.shadow / 8%)',
      },
      spacing: { '4.5': '1.125rem', '18': '4.5rem' },
      aria: { current: 'current="page"' },
      maxWidth: { '8xl': '95rem' },
    },
  },
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
      });
    }),
  ],
} satisfies Config;
