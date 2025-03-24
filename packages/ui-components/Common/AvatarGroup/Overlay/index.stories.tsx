import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import AvatarOverlay from '@node-core/ui-components/Common/AvatarGroup/Overlay';

type Story = StoryObj<typeof AvatarOverlay>;
type Meta = MetaObj<typeof AvatarOverlay>;

const author = {
  image: 'https://avatars.githubusercontent.com/ghost',
  name: 'Ghost User',
  nickname: 'ghost',
  fallback: 'GU',
};

export const Default: Story = {
  args: author,
};

export const FallBack: Story = {
  args: {
    nickname: author.nickname,
    fallback: author.fallback,
  },
};

export const WithoutName: Story = {
  args: {
    ...author,
    name: undefined,
  },
};

export default { component: AvatarOverlay } as Meta;
