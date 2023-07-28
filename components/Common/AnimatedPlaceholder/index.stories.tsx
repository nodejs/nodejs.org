import AnimatedPlaceholder from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof AnimatedPlaceholder>;
type Meta = MetaObj<typeof AnimatedPlaceholder>;

export const Default: Story = {};

export default { component: AnimatedPlaceholder } as Meta;
