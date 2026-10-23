import type { Meta, StoryObj } from '@storybook/react';

import SidebarToggleButton from './index';

type Story = StoryObj<typeof SidebarToggleButton>;

const meta: Meta<typeof SidebarToggleButton> = {
  title: 'Common/SidebarToggleButton',
  component: SidebarToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const LeftCollapsed: Story = {
  args: {
    side: 'left',
    isCollapsed: true,
    onToggle: () => {},
    ariaLabel: 'Expand left sidebar',
    title: 'Expand left sidebar',
  },
};

export const LeftExpanded: Story = {
  args: {
    side: 'left',
    isCollapsed: false,
    onToggle: () => {},
    ariaLabel: 'Collapse left sidebar',
    title: 'Collapse left sidebar',
  },
};

export const RightCollapsed: Story = {
  args: {
    side: 'right',
    isCollapsed: true,
    onToggle: () => {},
    ariaLabel: 'Expand right sidebar',
    title: 'Expand right sidebar',
  },
};

export const RightExpanded: Story = {
  args: {
    side: 'right',
    isCollapsed: false,
    onToggle: () => {},
    ariaLabel: 'Collapse right sidebar',
    title: 'Collapse right sidebar',
  },
};
