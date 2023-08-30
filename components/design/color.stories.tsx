import BrandColor from './color';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof BrandColor>;
type Meta = MetaObj<typeof BrandColor>;

export const Default: Story = {};

export default { component: BrandColor } as Meta;
