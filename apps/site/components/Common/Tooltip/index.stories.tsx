import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Button from '@/components/Common/Button';
import Tooltip from '@/components/Common/Tooltip';

type Story = StoryObj<typeof Tooltip>;
type Meta = MetaObj<typeof Tooltip>;

const defaultProps = {
  children: <Button>Rocket Turtle</Button>,
  content: <div className="p-3">🚀 🐢</div>,
};

export const Default: Story = {
  args: defaultProps,
};

export const Warning: Story = {
  args: {
    ...defaultProps,
    kind: 'warning',
  },
};

export const Error: Story = {
  args: {
    ...defaultProps,
    kind: 'error',
  },
};

export const LeftSide: Story = {
  args: {
    ...defaultProps,
    side: 'left',
  },
  decorators: [
    Story => (
      <div className="flex w-72 justify-end">
        <Story />
      </div>
    ),
  ],
};

export const RightSide: Story = {
  args: {
    ...defaultProps,
    side: 'left',
  },
  decorators: [
    Story => (
      <div className="flex w-72 justify-start">
        <Story />
      </div>
    ),
  ],
};

export const TopSide: Story = {
  args: {
    ...defaultProps,
    side: 'top',
  },
  decorators: [
    Story => (
      <div className="flex h-72 items-end">
        <Story />
      </div>
    ),
  ],
};

export default { component: Tooltip } as Meta;
