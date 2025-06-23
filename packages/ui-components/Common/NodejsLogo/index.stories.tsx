import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import NodejsLogo from '#ui/Common/NodejsLogo';

type Story = StoryObj<typeof NodejsLogo>;
type Meta = MetaObj<typeof NodejsLogo>;

export const Default: Story = {};

export default { component: NodejsLogo } as Meta;
