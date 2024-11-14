import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import { authors } from '@node-core/ui-components/__mocks__/utils';
import AvatarOverlay from '@node-core/ui-components/Common/AvatarGroup/Overlay';

type Story = StoryObj<typeof AvatarOverlay>;
type Meta = MetaObj<typeof AvatarOverlay>;

export const Default: Story = {
  args: authors.withName,
};

export const WithoutName: Story = {
  args: authors.withoutName,
};

export default { component: AvatarOverlay } as Meta;
