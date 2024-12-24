import { ArrowRightIcon } from '@heroicons/react/24/solid';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Button from '@/components/Common/Button';

type Story = StoryObj<typeof Button>;
type Meta = MetaObj<typeof Button>;

export const Neutral: Story = {
  args: {
    kind: 'neutral',
    children: 'Download Node (LTS)',
    disabled: false,
    size: 'default',
  },
};

export const Primary: Story = {
  args: {
    kind: 'primary',
    children: 'Download Node (LTS)',
    disabled: false,
    size: 'default',
  },
};

export const Secondary: Story = {
  args: {
    kind: 'secondary',
    children: 'Download Node (LTS)',
    disabled: false,
    size: 'default',
  },
};

export const Special: Story = {
  args: {
    kind: 'special',
    children: 'Download Node (LTS)',
    disabled: false,
    size: 'default',
  },
};

export const WithIcon: Story = {
  args: {
    kind: 'primary',
    children: (
      <>
        Back to Home
        <ArrowRightIcon />
      </>
    ),
    disabled: false,
    size: 'default',
  },
};

export default {
  component: Button,
  argTypes: {
    size: {
      options: ['default', 'small'],
      control: { type: 'radio' },
    },
  },
} as Meta;
