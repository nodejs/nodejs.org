import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Navbar from './index';

type Story = StoryObj<typeof Navbar>;
type Meta = MetaObj<typeof Navbar>;

export const Default: Story = {};

export default { component: Navbar } as Meta;
