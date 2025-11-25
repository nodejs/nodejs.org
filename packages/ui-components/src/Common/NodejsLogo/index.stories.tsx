import NodejsLogo from '#ui/Common/NodejsLogo';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof NodejsLogo>;
type Meta = MetaObj<typeof NodejsLogo>;

export const Default: Story = {};

export const WithPride: Story = {
  args: { variant: 'pride' },
};

export default { component: NodejsLogo } as Meta;
