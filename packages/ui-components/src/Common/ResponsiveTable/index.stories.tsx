import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import ResponsiveTable from './index';

type Story = StoryObj<typeof ResponsiveTable>;
type Meta = MetaObj<typeof ResponsiveTable>;

export const Default: Story = {
  args: {
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ],
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
    getRowId: row => String(row.id),
    getRowLabel: row => String(row.name),
  },
};

export default { component: ResponsiveTable } as Meta;
