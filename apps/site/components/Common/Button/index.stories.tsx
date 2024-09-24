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
  },
};

export const Primary: Story = {
  args: {
    kind: 'primary',
    children: 'Download Node (LTS)',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    kind: 'secondary',
    children: 'Download Node (LTS)',
    disabled: false,
  },
};

export const Special: Story = {
  args: {
    kind: 'special',
    children: 'Download Node (LTS)',
    disabled: false,
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
  },
};

export default { component: Button } as Meta;
