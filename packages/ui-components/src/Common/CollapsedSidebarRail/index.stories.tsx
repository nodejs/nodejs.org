import SidebarToggleButton from '#ui/Common/SidebarToggleButton';

import type { Meta, StoryObj } from '@storybook/react';

import CollapsedSidebarRail from './index';

type Story = StoryObj<typeof CollapsedSidebarRail>;

const meta: Meta<typeof CollapsedSidebarRail> = {
  title: 'Common/CollapsedSidebarRail',
  component: CollapsedSidebarRail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Left: Story = {
  args: {
    side: 'left',
    children: (
      <SidebarToggleButton
        side="left"
        isCollapsed
        onToggle={() => {}}
        ariaLabel="Expand left sidebar"
        title="Expand left sidebar"
      />
    ),
  },
};

export const Right: Story = {
  args: {
    side: 'right',
    children: (
      <SidebarToggleButton
        side="right"
        isCollapsed
        onToggle={() => {}}
        ariaLabel="Expand right sidebar"
        title="Expand right sidebar"
      />
    ),
  },
};
