import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import ThemeToggle from './index';

type Story = StoryObj<typeof ThemeToggle>;
type Meta = MetaObj<typeof ThemeToggle>;

export const Default: Story = {};

export default { component: ThemeToggle } as Meta;
