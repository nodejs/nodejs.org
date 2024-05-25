import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import NodejsLogo from '@/components/Common/NodejsLogo';

type Story = StoryObj<typeof NodejsLogo>;
type Meta = MetaObj<typeof NodejsLogo>;

export const Default: Story = {};

export const WithPride: Story = {
  args: { isPrideEnabled: true },
};

export default { component: NodejsLogo } as Meta;
