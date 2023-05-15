import { createMock } from 'storybook-addon-module-mock';
import * as hooks from '../../../hooks/useNodeJsContributorsApi';
import RandomContributor from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof RandomContributor>;
type Meta = MetaObj<typeof RandomContributor>;

export const Default: Story = {
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock(hooks, 'useNodeJsContributorsApi');
        mock.mockReturnValue({
          profileUri: 'https://github.com/nodejs',
          avatarUri:
            'https://avatars.githubusercontent.com/u/9950313?s=200&v=4',
          login: 'nodejs',
          contributionsCount: 20,
          commitsListUri:
            'https://github.com/nodejs/node/commits?author=nodejs',
        });
      },
    },
  },
};

export default { component: RandomContributor } as Meta;
