import { CodeBracketIcon } from '@heroicons/react/24/outline';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import AvatarGroup from '@/components/Common/AvatarGroup';

import MetaBar, { MetaBarLinkEntries } from './index';
type Story = StoryObj<typeof MetaBar>;
type Meta = MetaObj<typeof MetaBar>;

const authors = [
  {
    src: 'https://avatars.githubusercontent.com/adeyinkaezra123',
    alt: 'Ezra Adeyinka',
  },

  {
    src: 'https://avatars.githubusercontent.com/ovflowd',
    alt: 'Claudio W',
  },
  {
    src: 'https://avatars.githubusercontent.com/bmuenzenmeyer',
    alt: 'Brian Muenzenmeyer',
  },
  {
    src: 'https://avatars.githubusercontent.com/rvagg',
    alt: 'Rod Vagg',
  },
  {
    src: 'https://avatars.githubusercontent.com/hemberger',
    alt: 'Frederic Hemberger',
  },
];
const headings = [
  {
    value: 'Getting Started Guide',
    depth: 1,
    data: { id: 'general' },
  },
  {
    value: 'Easy profiling for Node.js Applications',
    depth: 2,
    data: { id: 'profiling' },
  },
  {
    value: 'Diagnostics - Flame Graphs',
    depth: 2,
    data: { id: 'diagnostics' },
  },
  {
    value: 'Node.js core concepts',
    depth: 1,
    data: { id: 'concepts' },
  },
  {
    value: 'The Node.js Event Loop, Timers, and process.nextTick()',
    depth: 2,
    data: { id: 'event_loops' },
  },
  {
    value: 'Anatomy of an HTTP Transaction',
    depth: 3,
    data: { id: 'https_anatomy' },
  },
];
export const Default: Story = {
  args: {
    entries: [
      {
        id: 'components.metabar.lastUpdated',
        value: new Date().toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      },
      { id: 'components.metabar.readingTime', value: '10 minutes' },
      { id: 'components.metabar.addedInVersion', value: 'v2.2.0' },
      {
        id: 'components.metabar.author',
        value: 'The Node.js Project',
      },
      {
        id: 'components.metabar.authors',
        value: <AvatarGroup avatars={authors} />,
      },
      {
        id: 'components.metabar.contributeTitle',
        value: (
          <MetaBarLinkEntries
            url="https://github.com/nodejs/nodejs.org/blob/main"
            icon="/static/images/logos/social-github-dark.svg"
            titleid="components.metabar.contribute"
          />
        ),
      },
      {
        id: 'components.metabar.viewAsTitle',
        value: (
          <MetaBarLinkEntries
            url="https://github.com/nodejs/nodejs.org/issues"
            icon={<CodeBracketIcon />}
            titleid="components.metabar.viewAs"
          />
        ),
      },
    ],
    headings,
  },
};

export default { component: MetaBar } as Meta;
