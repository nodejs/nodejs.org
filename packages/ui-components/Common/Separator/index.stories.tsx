import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Separator from '@node-core/ui-components/Common/Separator';

type Story = StoryObj<typeof Separator>;
type Meta = MetaObj<typeof Separator>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
};

export default { component: Separator } as Meta;
