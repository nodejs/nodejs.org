import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Select from '@/components/Common/Select';
import Apple from '@/components/Icons/Platform/Apple';
import Linux from '@/components/Icons/Platform/Linux';
import Microsoft from '@/components/Icons/Platform/Microsoft';

type Story = StoryObj<typeof Select>;
type Meta = MetaObj<typeof Select>;

export const Default: Story = {
  args: {
    values: ['v20.8.0', 'v19.9.0', 'v18.18.0', 'v17.9.1', 'v16.20.2'],
    defaultValue: 'v16.20.2',
    label: 'Node.js version',
  },
};

export const WithoutLabel: Story = {
  args: {
    values: ['v20.8.0', 'v19.9.0', 'v18.18.0', 'v17.9.1', 'v16.20.2'],
    defaultValue: 'v16.20.2',
  },
};

export const DropdownLabel: Story = {
  args: {
    values: [
      {
        label: 'Getting Started',
        items: [
          {
            value: 'section-1',
            label: 'Getting Started',
          },
          {
            value: 'section-2',
            label: 'How to install Node.js',
          },
          {
            value: 'section-3',
            label: 'How much JavaScript do you need to know to use Node.js?',
          },
          {
            value: 'section-4',
            label: 'Differences between Node.js and the Browser',
          },
          {
            value: 'section-5',
            label: 'The V8 JavaScript Engine',
          },
          {
            value: 'section-6',
            label: 'An introduction to the npm package manager',
          },
          {
            value: 'section-7',
            label: 'ECMAScript 2015 (ES6) and beyond',
          },
          {
            value: 'section-8',
            label: 'Node.js, the difference between development and production',
          },
        ],
      },
    ],
    placeholder: 'Select a guide',
    label: 'Getting Started',
  },
};

export const InlineSelect: Story = {
  args: {
    values: [
      {
        label: 'Platform',
        items: [
          {
            value: 'linux',
            label: 'Linux',
            iconImage: <Linux width={16} height={16} />,
          },
          {
            value: 'macos',
            label: 'MacOS',
            iconImage: <Apple width={16} height={16} />,
          },
          {
            value: 'windows',
            label: 'Windows',
            iconImage: <Microsoft width={16} height={16} />,
          },
        ],
      },
    ],
    defaultValue: 'macos',
    inline: true,
  },
};

export default { component: Select } as Meta;
