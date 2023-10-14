import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import { githubProfileAvatarUrl } from '@/util/gitHubUtils';

import Avatar from './';

type Story = StoryObj<typeof Avatar>;
type Meta = MetaObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: githubProfileAvatarUrl('ovflowd'),
    alt: 'ovflowd',
  },
};

export const NoSquare: Story = {
  args: {
    src: '/static/images/logos/stacked-dark.svg',
    alt: 'SD',
  },
};

export const FallBack: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/',
    alt: 'UA',
  },
};

export default { component: Avatar } as Meta;
