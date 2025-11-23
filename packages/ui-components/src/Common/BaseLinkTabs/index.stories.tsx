import BaseLinkTabs from '#ui/Common/BaseLinkTabs';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof BaseLinkTabs>;
type Meta = MetaObj<typeof BaseLinkTabs>;

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

export default { component: BaseLinkTabs } as Meta;
