import ApiChanges from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof ApiChanges>;
type Meta = MetaObj<typeof ApiChanges>;

const version = 'v10.0.0';
export const Default: Story = {
  args: {
    update: {
      type: 'added',
      version: [version],
    },
    changes: [
      {
        version: version,
        'pr-url': 'https://github.com/nodejs/node/pulls',
        description: 'test',
      },
    ],
  },
};

export default { component: ApiChanges } as Meta;
