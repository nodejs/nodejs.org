import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Preview from '@/components/Common/Preview';

type Story = StoryObj<typeof Preview>;
type Meta = MetaObj<typeof Preview>;

export const Announcement: Story = {
  args: {
    type: 'announcements',
    title:
      'Changing the End-of-Life Date for Node.js 16 to September 11th, 2023',
  },
};

export const Release: Story = {
  args: {
    type: 'release',
    title: 'Node v20.5.0 (Current)',
  },
};

export const Vulnerability: Story = {
  args: {
    type: 'vulnerability',
    title: 'OpenSSL update assessment, and Node.js project plans',
  },
};

export const CustomSize: Story = {
  args: {
    title:
      'Changing the End-of-Life Date for Node.js 16 to September 11th, 2023',
  },
  decorators: [
    Story => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default { component: Preview } as Meta;
