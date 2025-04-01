import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import AvatarGroup from '@node-core/ui-components/Common/AvatarGroup';

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
  'avivkeller',
];

const defaultProps = {
  avatars: names.map(name => ({
    image: `https://avatars.githubusercontent.com/${name}`,
    nickname: name,
    fallback: 'FB',
  })),
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
