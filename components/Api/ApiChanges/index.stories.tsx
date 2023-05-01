import Changes from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Changes>;
type Meta = MetaObj<typeof Changes>;

const version = 'v0';
export const Default: Story = {
  args: {
    update: {
      type: 'added',
      version: [version],
    },
    changes: [
      {
        version: version,
        'pr-url': 'https://test.com',
        description: 'test',
      },
    ],
  },
};

export default { component: Changes } as Meta;
