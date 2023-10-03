import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import { userNameToAvatarUrl } from '@/util/github';

import Avatar from './';

type Story = StoryObj<typeof Avatar>;
type Meta = MetaObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: userNameToAvatarUrl('ovflowd'),
    alt: 'ovflowd',
  },
};

export const FallBack: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/',
    alt: 'unknown-avatar',
  },
};

export default { component: Avatar } as Meta;
