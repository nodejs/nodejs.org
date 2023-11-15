import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import NavigationBar from './index';

type Story = StoryObj<typeof NavigationBar>;
type Meta = MetaObj<typeof NavigationBar>;

export const Default: Story = {
  args: {
    navItems: [
      {
        text: 'Learn',
        href: '/learn',
      },
      {
        text: 'About',
        href: '/about',
      },
      {
        text: 'Docs',
        href: '/docs',
      },
      {
        text: 'Download',
        href: '/download',
      },
      {
        text: 'Blog',
        href: '/blog',
      },
      {
        text: 'Certification',
        href: 'https://openjsf.org/certification',
      },
    ],
    languages: {
      availableLanguages: [
        { name: 'English', code: 'en' },
        { name: 'French', code: 'fr' },
        { name: 'Spanish', code: 'es' },
      ],
      currentLanguage: 'en',
    },
    onThemeTogglerClick: () => {},
  },
};

export default { component: NavigationBar } as Meta;
