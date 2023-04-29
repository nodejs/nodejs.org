import DownloadCards from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof DownloadCards>;
type Meta = MetaObj<typeof DownloadCards>;

export const Default: Story = {
  args: {
    version: 'v18.15.0',
    userOS: 'MAC',
  },
};

export default { component: DownloadCards } as Meta;
