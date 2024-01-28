import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import Event from '@/components/MDX/Calendar/Event';

type Story = StoryObj<typeof Event>;
type Meta = MetaObj<typeof Event>;

const defaultArgs: ComponentProps<typeof Event> = {
  start: {
    date: new Date().toISOString(),
  },
  end: {
    date: new Date().toISOString(),
  },
  summary: 'Example Event',
  location: 'Event Location',
  description: 'This is an example event description.',
};

export const Default: Story = {
  args: defaultArgs,
};

export default { component: Event } as Meta;
