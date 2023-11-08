import { CodeBracketIcon } from '@heroicons/react/24/solid';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Notification from '@/components/Common/Notification';

type Story = StoryObj<typeof Notification>;
type Meta = MetaObj<typeof Notification>;

export const Default: Story = {
  args: {
    open: true,
    duration: 5000,
    children: 'Copied to clipboard!',
  },
};

export const TimedNotification: Story = {
  args: {
    duration: 5000,
    children: 'Copied to clipboard!',
  },
};

export const WithJSX: Story = {
  args: {
    open: true,
    children: (
      <div className="flex items-center gap-3">
        <CodeBracketIcon className="h-4 w-4" />
        Copied to clipboard!
      </div>
    ),
  },
};

export default { component: Notification } as Meta;
