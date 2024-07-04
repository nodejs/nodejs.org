import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import LinkTabs from '@/components/Common/LinkTabs';

type Story = StoryObj<typeof LinkTabs>;
type Meta = MetaObj<typeof LinkTabs>;

export const Default: Story = {
  args: {
    label: 'Select Tab',
    tabs: [
      {
        key: 'package',
        label: 'Package Manager',
        link: '/package-manager',
      },
      {
        key: 'prebuilt',
        label: 'Prebuilt Installer',
        link: '/prebuilt-installer',
      },
      {
        key: 'source',
        label: 'Source Code',
        link: '/source-code',
      },
    ],
    activeTab: 'prebuilt',
    children: <p>Tab content goes here</p>,
  },
};

export default { component: LinkTabs } as Meta;
