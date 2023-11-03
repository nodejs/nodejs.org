import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Navbar from './index';

type Story = StoryObj<typeof Navbar>;
type Meta = MetaObj<typeof Navbar>;

export const Default: Story = {
  args: {
    navItems: [
      {
        text: 'about',
        href: '/about',
      },
      {
        text: 'learn',
        href: '/learn',
      },
      {
        text: 'docs',
        href: '/docs',
      },
      {
        text: 'blog',
        href: '/blog',
      },
      {
        text: 'certification',
        href: 'https://openjsf.org/certification',
      },
    ],
    languages: {
      availableLanguages: [
        { name: 'English', code: 'en' },
        { name: 'French', code: 'fr' },
        { name: 'Spanish', code: 'es' },
      ],
      currentLanguage: { name: 'English', code: 'en' },
    },
    onThemeTogglerClick: () => {},
  },
};

export default { component: Navbar } as Meta;
