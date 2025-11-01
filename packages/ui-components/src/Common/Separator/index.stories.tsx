import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

import Separator from '#ui/Common/Separator';

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

export default {
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="size-32">
        <Story />
      </div>
    ),
  ],
} as Meta;
