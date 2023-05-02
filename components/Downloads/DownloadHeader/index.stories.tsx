import { createNodeReleasesData } from '../../../__fixtures__/page';
import DownloadHeader from '.';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof DownloadHeader>;
type Meta = MetaObj<typeof DownloadHeader>;

export const Default: Story = {
  args: {
    release: {
      ...createNodeReleasesData()[0],
    },
  },
};

export default { component: DownloadHeader } as Meta;
