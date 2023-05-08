import Hero from '.';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Hero>;
type Meta = MetaObj<typeof Hero>;

export const Default: Story = {
  args: {
    title: 'Run JavaScript Everywhere.',
    subTitle:
      'Node.js is a free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser.',
    nodeReleaseData: [
      {
        version: '18',
        fullVersion: 'v18.15.0',
        codename: '',
        isLts: true,
        status: 'Active LTS',
        initialRelease: '',
        ltsStart: '',
        maintenanceStart: null,
        endOfLife: '',
      },
      {
        version: '19',
        fullVersion: 'v19.8.1',
        codename: '',
        isLts: true,
        status: 'Current',
        initialRelease: '',
        ltsStart: '',
        maintenanceStart: null,
        endOfLife: '',
      },
    ],
  },
};

export default { component: Hero } as Meta;
