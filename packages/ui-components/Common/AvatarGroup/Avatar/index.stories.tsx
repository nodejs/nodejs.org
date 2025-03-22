import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Avatar from '@node-core/ui-components/Common/AvatarGroup/Avatar';

type Story = StoryObj<typeof Avatar>;
type Meta = MetaObj<typeof Avatar>;

export const Default: Story = {
  args: {
    image: 'https://avatars.githubusercontent.com/ghost',
    nickname: 'ghost',
  },
};

export const NoSquare: Story = {
  args: {
    image: '/static/images/logo-hexagon-card.png',
    nickname: 'SD',
  },
};

export default { component: Avatar } as Meta;
