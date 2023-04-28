import Stability from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Stability>;
type Meta = MetaObj<typeof Stability>;

export const Stability0: Story = {
  args: {
    stability: 0,
    children:
      'Deprecated. The feature may emit warnings. Backward compatibility is not guaranteed.',
  },
};
export const Stability1: Story = {
  args: {
    stability: 1,
    children:
      'Experimental. The feature is not subject to semantic versioning rules. Non-backward compatible changes or removal may occur in any future release. Use of the feature is not recommended in production environments.',
  },
};
export const Stability2: Story = {
  args: {
    stability: 2,
    children:
      'Stable. Compatibility with the npm ecosystem is a high priority.',
  },
};

export const Stability3: Story = {
  args: {
    stability: 3,
    children:
      'Legacy. Although this feature is unlikely to be removed and is still covered by semantic versioning guarantees, it is no longer actively maintained, and other alternatives are available.',
  },
};

export default { component: Stability } as Meta;
