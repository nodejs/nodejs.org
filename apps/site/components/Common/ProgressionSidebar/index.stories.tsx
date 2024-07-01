import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import ProgressionSidebar from '@/components/Common/ProgressionSidebar';

type Story = StoryObj<typeof ProgressionSidebar>;
type Meta = MetaObj<typeof ProgressionSidebar>;

export const Default: Story = {
  args: {
    groups: [
      {
        groupName: 'Getting Started',
        items: [
          {
            label: 'Introduction to Node.js',
            link: '/',
          },
          {
            label: 'How to install Node.js',
            link: '/how-to-install-nodejs',
          },
          {
            label: 'How much JavaScript do you need to know to use Node.js?',
            link: '/how-much-javascript-do-you-need-to-know-to-use-nodejs',
          },
          {
            label: 'Differences between Node.js and the Browser',
            link: '/differences-between-nodejs-and-the-browser',
          },
          {
            label: 'The V8 JavaScript Engine',
            link: '/the-v8-javascript-engine',
          },
          {
            label: 'An introduction to the npm package manager',
            link: '/an-introduction-to-the-npm-package-manager',
          },
        ],
      },
      {
        groupName: 'Asynchronous Work',
        items: [
          {
            label: 'Asynchronous flow control',
            link: '/asynchronous-flow-control',
          },
          {
            label: 'Overview of Blocking vs Non-Blocking',
            link: '/overview-of-blocking-vs-non-blocking',
          },
        ],
      },
      {
        groupName: 'Manipulating Files',
        items: [
          {
            label: 'Node.js file stats',
            link: '/nodejs-file-stats',
          },
          {
            label: 'Node.js File Paths',
            link: '/nodejs-file-paths',
          },
        ],
      },
      {
        groupName: 'Single item',
        items: [
          {
            label: 'Item',
            link: '/item',
          },
        ],
      },
    ],
  },
};

export default { component: ProgressionSidebar } as Meta;
