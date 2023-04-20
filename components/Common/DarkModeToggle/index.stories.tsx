import DarkModeToggle from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof DarkModeToggle>;
type Meta = MetaObj<typeof DarkModeToggle>;

export const Default: Story = {};

export default { component: DarkModeToggle } as Meta;
