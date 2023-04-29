import DownloadCard from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof DownloadCard>;
type Meta = MetaObj<typeof DownloadCard>;

export const Selected: Story = {
  args: {
    os: 'MAC',
    icon: 'mac-download-logo.svg',
    label: 'MAC Installer',
    download: 'https://nodejs.org/dist/v18.15.0/node-v18.15.0.pkg',
    filename: 'node-v18.15.0.pkg',
    selected: true,
    onSelect: () => {},
  },
};

export const NotSelected: Story = {
  args: {
    os: 'MAC',
    icon: 'mac-download-logo.svg',
    label: 'MAC Installer',
    download: 'https://nodejs.org/dist/v18.15.0/node-v18.15.0.pkg',
    filename: 'node-v18.15.0.pkg',
    selected: false,
    onSelect: () => {},
  },
};

export default { component: DownloadCard } as Meta;
