import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import AvatarOverlay from '@/components/Common/AvatarGroup/Overlay';
import { getAuthorWithId, getAuthorWithName } from '@/util/authorUtils';

type Story = StoryObj<typeof AvatarOverlay>;
type Meta = MetaObj<typeof AvatarOverlay>;

export const Default: Story = {
  args: getAuthorWithId(['nodejs'], true)[0],
};

export const FallBack: Story = {
  args: getAuthorWithName(['Node.js'], true)[0],
};

export const WithoutName: Story = {
  args: getAuthorWithId(['canerakdas'], true)[0],
};

export default { component: AvatarOverlay } as Meta;
