import TableOfContents from '#ui/Common/TableOfContents';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof TableOfContents>;
type Meta = MetaObj<typeof TableOfContents>;

export const Default: Story = {};

export const CustomDepth: Story = {
  args: {
    minDepth: 1,
    maxDepth: 6,
  },
};

export default {
  component: TableOfContents,
  args: {
    ariaLabel: 'Table of Contents',
    summaryTitle: 'On this page',
    headings: [
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
      {
        value: 'Email',
        depth: 4,
        data: { id: 'email' },
      },
      {
        value: 'Slack',
        depth: 4,
        data: { id: 'slack' },
      },
      {
        value: '#node-website',
        depth: 5, // h5s do not get shown
        data: { id: 'node-website' },
      },
      {
        value: 'ERR_DUPLICATE_STARTUP_SNAPSHOT_MAIN_FUNCTION',
        depth: 3,
        data: { id: 'err_duplicate_startup_snapshot_main_function' },
      },
    ],
  },
} as Meta;
