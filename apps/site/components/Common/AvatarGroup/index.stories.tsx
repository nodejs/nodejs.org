import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import { getGitHubAvatarUrl } from '@/util/gitHubUtils';

type Story = StoryObj<typeof AvatarGroup>;
type Meta = MetaObj<typeof AvatarGroup>;

const names = [
  'ovflowd',
  'bmuenzenmeyer',
  'AugustinMauroy',
  'HinataKah0',
  'Harkunwar',
  'rodion-arr',
  'mikeesto',
  'bnb',
  'benhalverson',
  'aymen94',
  'shanpriyan',
  'Wai-Dung',
  'manishprivet',
  'araujogui',
];

const unknownAvatar = {
  image: 'https://avatars.githubusercontent.com/u/',
  nickname: 'unknown-avatar',
};

const defaultProps = {
  avatars: [
    unknownAvatar,
    ...names.map(name => ({ image: getGitHubAvatarUrl(name), nickname: name })),
  ],
};

const avatarOverlay = {
  avatars: [
    {
      image: getGitHubAvatarUrl('nodejs'),
      name: 'Node.js',
      nickname: 'nodejs',
      website: 'https://nodejs.org',
    },
  ],
};

export const Default: Story = {
  args: { ...defaultProps },
};

export const WithCustomLimit: Story = {
  args: {
    ...defaultProps,
    limit: 5,
  },
};

export const WithOverlay: Story = {
  args: avatarOverlay,
};

export const InSmallContainer: Story = {
  decorators: [
    Story => (
      <div className="w-[150px]">
        <Story />
      </div>
    ),
  ],
  args: { ...defaultProps, limit: 5 },
};

export default { component: AvatarGroup } as Meta;
