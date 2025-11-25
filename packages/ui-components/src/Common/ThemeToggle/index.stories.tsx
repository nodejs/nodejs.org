import ThemeToggle from '#ui/Common/ThemeToggle';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof ThemeToggle>;
type Meta = MetaObj<typeof ThemeToggle>;

export const Default: Story = {};

export default { component: ThemeToggle } as Meta;
