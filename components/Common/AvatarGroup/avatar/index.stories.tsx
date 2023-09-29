import { userNameToAvatarUrl } from '@/util/github';
import Avatar from './';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Avatar>;
type Meta = MetaObj<typeof Avatar>;
export const Default: Story = {
  args: {
    src: userNameToAvatarUrl('AugustinMauroy'),
  },
};

export const Failed: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/fake-user-id',
  },
};

export default { component: Avatar } as Meta;
