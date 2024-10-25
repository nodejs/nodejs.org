import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Avatar from '@/components/Common/AvatarGroup/Avatar';
import { getGitHubAvatarUrl } from '@/util/gitHubUtils';

type Story = StoryObj<typeof Avatar>;
type Meta = MetaObj<typeof Avatar>;

export const Default: Story = {
  args: {
    image: getGitHubAvatarUrl('ovflowd'),
    nickname: 'ovflowd',
  },
};

export const NoSquare: Story = {
  args: {
    image: '/static/images/logo-hexagon-card.png',
    nickname: 'SD',
  },
};

export const FallBack: Story = {
  args: {
    image: 'https://avatars.githubusercontent.com/u/',
    nickname: 'John Doe',
    fallback: 'JD',
  },
};

export default { component: Avatar } as Meta;
