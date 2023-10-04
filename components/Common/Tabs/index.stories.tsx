import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from './index';

type Story = StoryObj<typeof Tabs>;
type Meta = MetaObj<typeof Tabs>;

export const Default: Story = {};

export default {
  component: Tabs,
  args: {
    defaultValue: 'package',
    children: (
      <>
        <TabsList>
          <TabsTrigger value="package">Package Manager</TabsTrigger>
          <TabsTrigger value="prebuilt">Prebuilt Installer</TabsTrigger>
          <TabsTrigger value="source">Source Code</TabsTrigger>
        </TabsList>
        <TabsContent value="package">Package Manager</TabsContent>
        <TabsContent value="prebuilt">Prebuilt Installer</TabsContent>
        <TabsContent value="source">Source Code</TabsContent>
      </>
    ),
  },
} as Meta;
