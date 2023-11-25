import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Banner from '@/components/Common/Banner';

type Story = StoryObj<typeof Banner>;
type Meta = MetaObj<typeof Banner>;

export const Default: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'default',
    url: 'https://github.com/openjs-foundation/summit/issues/360',
  },
};

export const Error: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'error',
    url: 'https://github.com/nodejs/nodejs.org/issues/4495',
  },
};

export const Warning: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'warning',
    url: 'https://github.com/nodejs/nodejs.org/issues/4495',
  },
};

export const NoLink: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'default',
  },
};

export default { component: Banner } as Meta;
