import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import NavBar from '@/components/Containers/NavBar';

type Story = StoryObj<typeof NavBar>;
type Meta = MetaObj<typeof NavBar>;

export const Default: Story = {
  args: {
    navItems: [
      {
        text: 'Learn',
        link: '/',
      },
      {
        text: 'About',
        link: '/about',
      },
      {
        text: 'Docs',
        link: '/docs',
      },
      {
        text: 'Download',
        link: '/download',
      },
      {
        text: 'Blog',
        link: '/blog',
      },
      {
        text: 'Certification',
        link: 'https://openjsf.org/certification',
      },
    ],
    languages: {
      availableLanguages: [
        { name: 'English', code: 'en', localName: 'English' },
        { name: 'French', code: 'fr', localName: 'Français' },
        { name: 'Spanish', code: 'es', localName: 'Español' },
      ],
      currentLanguage: 'en',
    },
    onThemeTogglerClick: () => {},
  },
};

export default { component: NavBar } as Meta;
