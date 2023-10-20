import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Tabs from './index';

type Story = StoryObj<typeof Tabs>;
type Meta = MetaObj<typeof Tabs>;

export const Default: Story = {
  args: {
    defaultValue: 'prebuilt',
    tabs: [
      {
        key: 'package',
        label: 'Package Manager',
      },
      {
        key: 'prebuilt',
        label: 'Prebuilt Installer',
      },
      {
        key: 'source',
        label: 'Source Code',
      },
    ],
    children: (
      <>
        <TabsPrimitive.Content value="package">
          Package Manager
        </TabsPrimitive.Content>
        <TabsPrimitive.Content value="prebuilt">
          Prebuilt Installer
        </TabsPrimitive.Content>
        <TabsPrimitive.Content value="source">
          Source Code
        </TabsPrimitive.Content>
      </>
    ),
  },
};

export default { component: Tabs } as Meta;
