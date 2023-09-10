import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import Banner from './';

type Story = StoryObj<typeof Banner>;
type Meta = MetaObj<typeof Banner>;

export const Default: Story = {
  args: {
    text: 'Nodejs collaborator summitNode.js Collaborator Summit 2023 - Bilbao, Spain (OpenJS World EU) 2023',
    type: 'default',
    url: 'https://github.com/openjs-foundation/summit/issues/360',
  },
};

export const Error: Story = {
  args: {
    text: 'STOP creating issue for error 500 on download',
    type: 'error',
    url: 'https://github.com/nodejs/nodejs.org/issues/4495',
  },
};

export const Warning: Story = {
  args: {
    text: 'STOP creating issue for error 500 on download',
    type: 'warning',
    url: 'https://github.com/nodejs/nodejs.org/issues/4495',
  },
};

export const NoLink: Story = {
  args: {
    text: 'Claudio is the best maintainer',
    type: 'default',
  },
};

export const NoType: Story = {
  args: {
    text: 'Claudio is the best maintainer',
    url: 'https://github.com/ovflowd',
  },
};

export default { component: Banner } as Meta;
