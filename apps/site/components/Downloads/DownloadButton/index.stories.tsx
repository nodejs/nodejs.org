import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import DownloadButton from '@/components/Downloads/DownloadButton';

type Story = StoryObj<typeof DownloadButton>;
type Meta = MetaObj<typeof DownloadButton>;

export const Default: Story = {
  args: {
    release: {
      currentStart: '2023-04-18',
      ltsStart: '2023-10-24',
      maintenanceStart: '2024-10-22',
      endOfLife: '2026-04-30',
      status: 'LTS',
      major: 20,
      version: '20.11.0',
      versionWithPrefix: 'v20.11.0',
      codename: 'Iron',
      isLts: true,
      npm: '10.2.4',
      v8: '11.3.244.8',
      releaseDate: '2024-01-09',
      modules: '115',
    },
    children: 'Download Node.js',
  },
};

export default { component: DownloadButton } as Meta;
