import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import GlowingBackdrop from '#ui/Common/GlowingBackdrop';

type Story = StoryObj<typeof GlowingBackdrop>;
type Meta = MetaObj<typeof GlowingBackdrop>;

export const Default: Story = {};

export default { component: GlowingBackdrop } as Meta;
