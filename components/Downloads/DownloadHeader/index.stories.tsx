import { createNodeReleases } from '../../../__fixtures__/nodeReleases';
import DownloadHeader from '.';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof DownloadHeader>;
type Meta = MetaObj<typeof DownloadHeader>;

console.log(createNodeReleases());

export const Default: Story = {
  args: createNodeReleases()[0],
};

export default { component: DownloadHeader } as Meta;
