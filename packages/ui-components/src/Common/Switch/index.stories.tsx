import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Switch from '#ui/Common/Switch';

type Story = StoryObj<typeof Switch>;
type Meta = MetaObj<typeof Switch>;

export const Uncontrolled: Story = {
  args: {
    label: 'Enable Feature',
  },
};

export const Controlled: Story = {
  args: {
    label: 'Enable Feature',
  },
  render: args => {
    const [checked, setChecked] = useState(false);

    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const WithoutLabel: Story = {};

export default {
  component: Switch,
  parameters: {
    layout: 'centered',
  },
} as Meta;
