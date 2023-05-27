import Events from '.';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Events>;
type Meta = MetaObj<typeof Events>;

export const Default: Story = {};

export default { component: Events } as Meta;
