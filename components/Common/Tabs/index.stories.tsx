import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { FC } from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from './index';

const DecoratedTabs: FC = () => (
  <Tabs defaultValue="package">
    <TabsList>
      <TabsTrigger value="package">Package Manager</TabsTrigger>
      <TabsTrigger value="prebuilt">Prebuilt Installer</TabsTrigger>
      <TabsTrigger value="source">Source Code</TabsTrigger>
    </TabsList>
    <TabsContent value="package">Package Manager</TabsContent>
    <TabsContent value="prebuilt">Prebuilt Installer</TabsContent>
    <TabsContent value="source">Source Code</TabsContent>
  </Tabs>
);

type Story = StoryObj<typeof DecoratedTabs>;
type Meta = MetaObj<typeof DecoratedTabs>;

export const Default: Story = {};

export default { component: DecoratedTabs } as Meta;
