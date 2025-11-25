import Switch from '#ui/Common/Switch';

import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Switch>;
type Meta = MetaObj<typeof Switch>;

export const WithLabel: Story = {
  args: {
    label: 'Enable Feature',
  },
};

export const WithoutLabel: Story = {};

export default {
  component: Switch,
  parameters: {
    layout: 'centered',
  },
} as Meta;
