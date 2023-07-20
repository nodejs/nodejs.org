import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import Hero from '.';
import { createNodeReleases } from '@/components/__fixtures__/nodeReleases';

type Story = StoryObj<typeof Hero>;
type Meta = MetaObj<typeof Hero>;

const releases = createNodeReleases();

const currentLTS = releases.find(release => release.isLts);
const currentRelease = releases.find(release => release.status === 'Current');

export const Default: Story = {
  args: {
    title: 'Run JavaScript Everywhere.',
    subTitle:
      'Node.js is a free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser.',
    ltsVersion: currentLTS?.versionWithPrefix,
    currentVersion: currentRelease?.versionWithPrefix,
  },
};

export default { component: Hero } as Meta;
