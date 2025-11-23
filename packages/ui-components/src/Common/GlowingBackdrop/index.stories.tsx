import GlowingBackdrop from '#ui/Common/GlowingBackdrop';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof GlowingBackdrop>;
type Meta = MetaObj<typeof GlowingBackdrop>;

export const Default: Story = {};

export default { component: GlowingBackdrop } as Meta;
