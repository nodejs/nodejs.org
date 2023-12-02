import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import ProgressionSideBar from '@/components/Common/ProgressionSideBar';

type Story = StoryObj<typeof ProgressionSideBar>;
type Meta = MetaObj<typeof ProgressionSideBar>;

export const Default: Story = {
  args: {
    groups: [
      {
        groupName: 'Getting Started',
        items: [
          {
            title: 'Introduction to Node.js',
            url: '/',
          },
          {
            title: 'How to install Node.js',
            url: '/how-to-install-nodejs',
          },
          {
            title: 'How much JavaScript do you need to know to use Node.js?',
            url: '/how-much-javascript-do-you-need-to-know-to-use-nodejs',
          },
          {
            title: 'Differences between Node.js and the Browser',
            url: '/differences-between-nodejs-and-the-browser',
          },
          {
            title: 'The V8 JavaScript Engine',
            url: '/the-v8-javascript-engine',
          },
          {
            title: 'An introduction to the NPM package manager',
            url: '/an-introduction-to-the-npm-package-manager',
          },
        ],
      },
      {
        groupName: 'Asynchronous Work',
        items: [
          {
            title: 'Asynchronous flow control',
            url: '/asynchronous-flow-control',
          },
          {
            title: 'Overview of Blocking vs Non-Blocking',
            url: '/overview-of-blocking-vs-non-blocking',
          },
        ],
      },
      {
        groupName: 'Manipulating Files',
        items: [
          {
            title: 'Node.js file stats',
            url: '/nodejs-file-stats',
          },
          {
            title: 'Node.js File Paths',
            url: '/nodejs-file-paths',
          },
        ],
      },
      {
        groupName: 'Single item',
        items: [
          {
            title: 'Item',
            url: '/item',
          },
        ],
      },
    ],
  },
};

export default { component: ProgressionSideBar } as Meta;
