import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import { Card, CardHeader, CardBody } from './index';

type Story = StoryObj<typeof Card>;
type Meta = MetaObj<typeof Card>;

export const Default: Story = {
  render: args => (
    <Card {...args}>
      <CardHeader>Card Header</CardHeader>
      <CardBody>Card Body Content</CardBody>
    </Card>
  ),
};

export default {
  component: Card,
} as Meta;
