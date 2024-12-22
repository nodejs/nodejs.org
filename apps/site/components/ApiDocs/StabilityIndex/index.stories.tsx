import type { Meta as MetaObj, StoryObj } from '@storybook/react';


import StabilityIndex from '@/components/ApiDocs/StabilityIndex';

type Story = StoryObj<typeof StabilityIndex>;
type Meta = MetaObj<typeof StabilityIndex>;

export const Legacy: Story = {
  args: {
    level: 3,
    children: 'Legacy. Although this feature is unlikely to be removed and is still covered by semantic versioning guarantees, it is no longer actively maintained, and other alternatives are available.'
  },
}

export const Stable: Story = {
  args: {
    level: 2,
    children: 'Stable. Compatibility with the npm ecosystem is a high priority.'
  },
}

export const Experimental: Story = {
  args: {
    level: 1,
    children: 'Experimental. The feature is not subject to semantic versioning rules. Non-backward compatible changes or removal may occur in any future release. Use of the feature is not recommended in production environments. Experimental features are subdivided into stages:'
  },
}

export const Deprecated: Story = {
  args: {
    level: 0,
    children: 'Deprecated. The feature may emit warnings. Backward compatibility is not guaranteed.'
  },
}

export default { component: StabilityIndex } as Meta;
