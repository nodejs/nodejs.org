import SearchBar from './index';

import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof SearchBar>;
type Meta = MetaObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    search() {
      return [
        {
          id: 'voluptate',
          slug: 'voluptate',
          title: 'Nisi deserunt excepteur',
          category: 'aliqua-sunt',
          displayTitle: 'Adipisicing magna irure elit velit.',
        },
        {
          id: 'ullamco',
          slug: 'ullamco',
          title: 'Lorem adipisicing ut',
          category: 'excepteur',
          displayTitle:
            'Aliqua voluptate aliqua non consectetur sunt consequat.',
        },
        {
          id: 'deserunt',
          slug: 'deserunt',
          title: 'Qui irure do irure',
          category: 'laborum',
          wrapInCode: true,
        },
      ];
    },
  },
};

export default { component: SearchBar } as Meta;
