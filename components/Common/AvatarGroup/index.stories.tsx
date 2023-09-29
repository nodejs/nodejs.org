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
    userNameToAvatarUrl('bnb'),
    userNameToAvatarUrl('benhalverson'),
    userNameToAvatarUrl('aymen94'),
    userNameToAvatarUrl('shanpriyan'),
    userNameToAvatarUrl('Wai-Dung'),
    userNameToAvatarUrl('manishprivet'),
    userNameToAvatarUrl('araujogui'),
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

export const InSmallContainer: Story = {
  decorators: [
    Story => (
      <div style={{ width: '150px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    ...AvatarList,
    limit: 5,
  },
};

export const WithForceShow: Story = {
  args: {
    ...AvatarList,
    forceShow: true,
  },
};

export default { component: AvatarGroup } as Meta;
