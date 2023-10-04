import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Tabs from './index';

type Story = StoryObj<typeof Tabs>;
type Meta = MetaObj<typeof Tabs>;

export const Default: Story = {};

export default {
  component: Tabs,
  args: {
    defaultValue: 'package',
    tabs: [
      {
        name: 'package',
        label: 'Package Manager',
        content: 'Package Manager',
      },
      {
        name: 'prebuilt',
        label: 'Prebuilt Installer',
        content: 'Prebuilt Installer',
      },
      {
        name: 'source',
        label: 'Source Code',
        content: 'Source Code',
      },
    ],
  },
} as Meta;
