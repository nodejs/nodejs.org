import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Banner from '@node-core/ui-components/Common/Banner';

type Story = StoryObj<typeof Banner>;
type Meta = MetaObj<typeof Banner>;

export const Default: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'default',
  },
};

export const Error: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'error',
  },
};

export const Warning: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'warning',
  },
};

export default { component: Banner } as Meta;
