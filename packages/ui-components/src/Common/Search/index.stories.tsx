import { create, insertMultiple } from '@orama/orama';

import Search from '#ui/Common/Search';
import SearchHit from '#ui/Common/Search/Results/Hit';

import type { OramaCloud } from '@orama/core';
import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof Search>;
type Meta = MetaObj<typeof Search>;

const searchClient = (() => {
  const db = create({
    schema: {
      title: 'string',
      description: 'string',
      href: 'string',
      siteSection: 'string',
      pageTitle: 'string',
      pageSectionTitle: 'string',
      pageSectionContent: 'string',
    },
  });

  void insertMultiple(db, [
    {
      title: 'Getting Started',
      description: 'Learn how to install Node.js and run your first script.',
      href: '/en/learn/getting-started/introduction-to-nodejs',
      siteSection: 'Learn',
      pageTitle: 'Getting Started',
      pageSectionTitle: 'Introduction to Node.js',
      pageSectionContent: 'A quick overview of Node.js fundamentals.',
    },
    {
      title: 'Node.js Download',
      description: 'Download binaries for Linux, macOS and Windows.',
      href: '/en/download',
      siteSection: 'Download',
      pageTitle: 'Download',
      pageSectionTitle: 'Choose your platform',
      pageSectionContent: 'Download options for supported platforms.',
    },
    {
      title: 'About Node.js',
      description: 'History, governance and project overview.',
      href: '/en/about',
      siteSection: 'About',
      pageTitle: 'About',
      pageSectionTitle: 'Project overview',
      pageSectionContent: 'Community-driven runtime for JavaScript.',
    },
  ]);

  return db as unknown as OramaCloud;
})();

export const Default: Story = {
  args: {
    client: searchClient,
    placeholder: 'Search the docs...',
  },
  decorators: [
    Story => (
      <div className="mx-auto w-full max-w-[48rem] p-6">
        <Story />
      </div>
    ),
  ],
};

export const CustomLabels: Story = {
  args: {
    client: searchClient,
    placeholder: 'Search Node.js pages...',
    noResultsTitle: 'Nothing found for',
    closeShortcutLabel: 'close search',
    navigateShortcutLabel: 'move between results',
    selectShortcutLabel: 'open selected page',
  },
  decorators: Default.decorators,
};

export const DescriptionWithCode: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-[48rem] p-6">
      <SearchHit
        document={{
          title: 'Run with watch mode',
          href: '/en/learn/command-line/run-nodejs-scripts-from-the-command-line',
          description: (
            <>
              Use <code>node --watch app.mjs</code> to restart your app
              automatically on file changes.
            </>
          ),
        }}
      />
    </div>
  ),
};

export default { component: Search } as Meta;
