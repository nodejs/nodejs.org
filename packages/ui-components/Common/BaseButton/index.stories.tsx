import { ArrowRightIcon } from '@heroicons/react/24/solid';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import BaseButton from '@node-core/ui-components/Common/BaseButton';

type Story = StoryObj<typeof BaseButton>;
type Meta = MetaObj<typeof BaseButton>;

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
  component: BaseButton,
  argTypes: {
    size: {
      options: ['default', 'small'],
      control: { type: 'radio' },
    },
  },
} as Meta;
