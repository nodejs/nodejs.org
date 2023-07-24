import { createMock } from 'storybook-addon-module-mock';
import * as hooks from '@/hooks/useDetectOS';
import DownloadCards from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof DownloadCards>;
type Meta = MetaObj<typeof DownloadCards>;

export const Default: Story = {
  args: {
    versionWithPrefix: 'v18.15.0',
  },
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock(hooks, 'useDetectOS');
        mock.mockReturnValue({
          os: 'WIN',
          bitness: 64,
        });
      },
    },
  },
};

export default { component: DownloadCards } as Meta;
