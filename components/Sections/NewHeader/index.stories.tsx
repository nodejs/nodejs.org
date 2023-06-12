import Header from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Header>;
type Meta = MetaObj<typeof Header>;

export const Default: Story = {};

export default { component: Header } as Meta;
