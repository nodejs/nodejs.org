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
    heading: {
      items: [
        {
          value: 'OpenSSL update assessment, and Node.js project plans',
          depth: 1,
          data: { id: 'heading-1' },
        },
        {
          value: 'Summary',
          depth: 2,
          data: { id: 'summary' },
        },
        {
          value: 'Analysis',
          depth: 2,
          data: { id: 'analysis' },
        },
        {
          value: 'The c_rehash script allows command injection (CVE-2022-2068)',
          depth: 3,
          data: { id: 'the_c_rehash' },
        },
        {
          value: 'Contact and future updates',
          depth: 3,
          data: { id: 'contact_and_future_updates' },
        },
      ],
      depth: 2,
    },
  },
};

export default { component: MetaBar } as Meta;
