import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Avatar from '@/components/Common/AvatarGroup/Avatar';
import { getGitHubAvatarUrl } from '@/util/gitHubUtils';

type Story = StoryObj<typeof Avatar>;
type Meta = MetaObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: getGitHubAvatarUrl('ovflowd'),
    alt: 'ovflowd',
  },
};

export const NoSquare: Story = {
  args: {
    src: '/static/images/logos/nodejs.png',
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
