import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import { userNameToAvatarUrl } from '@/util/github';

import AvatarGroup from './';

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

// we are using github avatars for this story
// an link to other image can also be used
const defaultProps = {
  avatars: names.map(name => ({
    src: userNameToAvatarUrl(name),
    alt: name,
  })),
};

// add falback text to avatars we are hardcoding link because github api add image for 404 user avatar
defaultProps.avatars.push({
  src: 'https://avatars.githubusercontent.com/u/',
  alt: 'unknown-avatar',
});

export const Default: Story = {
  args: { ...defaultProps },
};

export const WithCustomLimit: Story = {
  args: {
    ...defaultProps,
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
    ...defaultProps,
    limit: 5,
  },
};

// normally it's support by radix-ui
export const NoSquareAvatars: Story = {
  args: {
    avatars: [
      {
        src: '/static/images/logos/stacked-dark.svg',
        alt: 'stacked-dark',
      },
    ],
    limit: 5,
  },
};

export default { component: AvatarGroup } as Meta;
