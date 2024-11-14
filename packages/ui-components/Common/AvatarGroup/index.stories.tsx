import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import { authors } from '@node-core/ui-components/__mocks__/utils';
import AvatarGroup from '@node-core/ui-components/Common/AvatarGroup';

type Story = StoryObj<typeof AvatarGroup>;
type Meta = MetaObj<typeof AvatarGroup>;

const unknownAvatar = {
  image: 'https://avatars.githubusercontent.com/u/',
  nickname: 'unknown-avatar',
  fallback: 'UA',
};

const defaultProps = {
  avatars: Array.from({ length: 15 }, (_, i) =>
    i % 5 ? authors.withName : unknownAvatar
  ),
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
