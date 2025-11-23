import ChangeHistory from '#ui/Common/ChangeHistory';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof ChangeHistory>;
type Meta = MetaObj<typeof ChangeHistory>;

const SAMPLE_CHANGES = [
  {
    versions: ['v15.4.0'],
    label: 'No longer experimental',
    url: 'https://github.com/nodejs/node/pull/12345',
  },
  {
    versions: ['v15.0.0', 'v14.17.0'],
    label: 'Added in v15.0.0, v14.17.0',
    url: 'https://github.com/nodejs/node/pull/67890',
  },
  {
    versions: ['v16.0.0'],
    label: 'Deprecated in 16',
  },
];

const LARGE_SAMPLE_CHANGES = [
  {
    versions: ['v20.0.0'],
    label: 'Breaking change in v20',
    url: 'https://github.com/nodejs/node/pull/50001',
  },
  {
    versions: ['v19.8.0'],
    label: 'Performance improvement',
    url: 'https://github.com/nodejs/node/pull/49999',
  },
  {
    versions: ['v19.0.0'],
    label: 'API redesign',
    url: 'https://github.com/nodejs/node/pull/49000',
  },
  {
    versions: ['v18.17.0', 'v18.16.1'],
    label: 'Security fix backported',
    url: 'https://github.com/nodejs/node/pull/48500',
  },
  {
    versions: ['v18.0.0'],
    label: 'Major version release',
    url: 'https://github.com/nodejs/node/pull/47000',
  },
  {
    versions: ['v17.9.0'],
    label: 'Experimental feature added',
    url: 'https://github.com/nodejs/node/pull/46500',
  },
  {
    versions: ['v17.0.0'],
    label: 'Node.js 17 release',
    url: 'https://github.com/nodejs/node/pull/45000',
  },
  {
    versions: ['v16.15.0', 'v16.14.2'],
    label: 'Bug fix release',
    url: 'https://github.com/nodejs/node/pull/44000',
  },
  {
    versions: ['v16.0.0'],
    label: 'Deprecated in v16',
    url: 'https://github.com/nodejs/node/pull/43000',
  },
  {
    versions: ['v15.14.0'],
    label: 'Feature enhancement',
    url: 'https://github.com/nodejs/node/pull/42000',
  },
  {
    versions: ['v15.0.0', 'v14.17.0'],
    label: 'Initial implementation',
    url: 'https://github.com/nodejs/node/pull/41000',
  },
  {
    versions: ['v14.18.0'],
    label: 'Documentation update',
    url: 'https://github.com/nodejs/node/pull/40000',
  },
  {
    versions: ['v14.0.0'],
    label: 'Added to stable API',
    url: 'https://github.com/nodejs/node/pull/39000',
  },
  {
    versions: ['v13.14.0'],
    label: 'Experimental flag removed',
    url: 'https://github.com/nodejs/node/pull/38000',
  },
  {
    versions: ['v12.22.0', 'v12.21.0'],
    label: 'Backported to LTS',
    url: 'https://github.com/nodejs/node/pull/37000',
  },
  {
    versions: ['v12.0.0'],
    label: 'First experimental version',
    url: 'https://github.com/nodejs/node/pull/36000',
  },
];

export const Default: Story = {
  render: args => (
    <div className="right-0 flex justify-end">
      <ChangeHistory {...args} />
    </div>
  ),
  args: {
    changes: SAMPLE_CHANGES,
  },
};

export const LargeHistory: Story = {
  render: args => (
    <div className="right-0 flex justify-end">
      <ChangeHistory {...args} />
    </div>
  ),
  args: {
    changes: LARGE_SAMPLE_CHANGES,
  },
};

export default { component: ChangeHistory } as Meta;
