import { create, insertMultiple, save } from '@orama/orama';
import OramaSearchBar from './index';

import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { Schema } from '@orama/orama';

type Story = StoryObj<typeof OramaSearchBar>;
type Meta = MetaObj<typeof OramaSearchBar>;

const schema: Schema = { title: 'string', displayTitle: 'string' };
const documents = [
  {
    id: 'voluptate',
    slug: 'voluptate',
    title: 'Nisi deserunt excepteur',
    category: 'aliqua-sunt',
    displayTitle: 'Adipisicing magna irure elit velit.',
  },
  {
    id: 'ullamco',
    slug: 'ullamco',
    title: 'Lorem adipisicing ut',
    category: 'excepteur',
    displayTitle: 'Aliqua voluptate aliqua non consectetur sunt consequat.',
  },
  {
    id: 'deserunt',
    slug: 'deserunt',
    title: 'Qui irure do irure',
    category: 'laborum',
    wrapInCode: true,
  },
];

export const Default: Story = {
  loaders: [
    async () => {
      const database = await create({ schema });
      await insertMultiple(database, documents);
      return { orama: await save(database) };
    },
  ],
};

export default {
  component: OramaSearchBar,
  render: (args, { loaded: { orama } }) => {
    return <OramaSearchBar schema={schema} index={orama} />;
  },
} as Meta;
