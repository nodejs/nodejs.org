import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Event from '@/components/MDX/Calendar/Event';

type Story = StoryObj<typeof Event>;
type Meta = MetaObj<typeof Event>;

export const Default: Story = {
  args: {
    start: { date: '2024-02-19T12:30:00.000Z' },
    end: { date: '2024-02-19T16:00:00.000Z' },
    summary: 'Example Event',
    location: 'Event Location',
    description: 'This is an example event description.',
  },
};

export default { component: Event } as Meta;
