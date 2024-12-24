import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import { getAuthorWithId } from '@/util/authorUtils';

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

const defaultProps = {
  avatars: getAuthorWithId(names, true),
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
