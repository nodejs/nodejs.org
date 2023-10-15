import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import MetaBar from './index';

type Story = StoryObj<typeof MetaBar>;
type Meta = MetaObj<typeof MetaBar>;

export const Default: Story = {
  args: {
    date: new Date(),
    readingTime: '15 minutes',
    addedInVersion: 'v0.10.0',
    author: 'The Node.js Project',
    authors: [
      {
        src: 'https://avatars.githubusercontent.com/canerakdas',
        alt: 'Caner Akdas',
      },
      {
        src: 'https://avatars.githubusercontent.com/bmuenzenmeyer',
        alt: 'Brian Muenzenmeyer',
      },
      {
        src: 'https://avatars.githubusercontent.com/ovflowd',
        alt: 'Claudio W',
      },
    ],
    sourceURL: 'https://github.com/nodejs/nodejs.org/issues',
    viewAsURL: 'https://github.com/nodejs/nodejs.org',
    headings: [
      {
        value: 'Heading 1',
        depth: 1,
        data: { id: 'heading-1' },
      },
      {
        value: 'Heading 2',
        depth: 2,
        data: { id: 'heading-2' },
      },
    ],
  },
};

export default { component: MetaBar } as Meta;
