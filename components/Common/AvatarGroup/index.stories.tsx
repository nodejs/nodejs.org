import { userNameToAvatarUrl } from '@/util/github';
import AvatarGroup from './';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof AvatarGroup>;
type Meta = MetaObj<typeof AvatarGroup>;

const AvatarList = {
  avatars: [
    userNameToAvatarUrl('ovflowd'),
    userNameToAvatarUrl('bmuenzenmeyer'),
    userNameToAvatarUrl('AugustinMauroy'),
    userNameToAvatarUrl('HinataKah0'),
    userNameToAvatarUrl('Harkunwar'),
    userNameToAvatarUrl('rodion-arr'),
    userNameToAvatarUrl('mikeesto'),
  ],
};

export const Default: Story = {
  args: {
    ...AvatarList,
  },
};

export const WithCustomLimit: Story = {
  args: {
    ...AvatarList,
    limit: 5,
  },
};

export default { component: AvatarGroup } as Meta;
