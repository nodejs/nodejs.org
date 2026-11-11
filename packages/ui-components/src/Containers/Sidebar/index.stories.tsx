import Sidebar from '#ui/Containers/Sidebar';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof Sidebar>;
type Meta = MetaObj<typeof Sidebar>;

const args = {
  groups: [
    {
      groupName: 'About Node.js',
      items: [
        {
          link: '/item1',
          label: 'About Node.js',
        },
        {
          link: '/item2',
          label: 'Project Governance',
        },
        {
          link: '/item3',
          label: 'Releases',
        },
        {
          link: '/item4',
          label: 'Branding',
        },
        {
          link: '/item5',
          label: 'Privacy Policy',
        },
        {
          link: '/item6',
          label: 'Security Reporting',
        },
      ],
    },
    {
      groupName: 'Get Involved',
      items: [
        {
          link: '/item7',
          label: 'Get Involved',
        },
        {
          link: '/item8',
          label: 'Collab Summit',
        },
        {
          link: '/item9',
          label: 'Contribute',
        },
        {
          link: '/item10',
          label: 'Code of Conduct',
        },
      ],
    },
    {
      groupName: 'Download',
      items: [
        {
          link: '/item11',
          label: 'Download',
        },
        {
          link: '/item12',
          label: 'Package Manager',
        },
        {
          link: '/item13',
          label: 'Node.js Releases',
        },
      ],
    },
  ],
  title: 'Sidebar',
  pathname: '/item1',
};

export const Default: Story = { args };

export const Nested: Story = {
  args: {
    title: 'Sidebar',
    pathname: '/fs/promises/read-file',
    groups: [
      {
        groupName: 'API',
        items: [
          { link: '/assert', label: 'Assert' },
          {
            link: '/fs',
            label: 'File system',
            items: [
              { link: '/fs', label: 'File system' },
              {
                link: '/fs/promises',
                label: 'Promises API',
                items: [
                  { link: '/fs/promises', label: 'Promises API' },
                  { link: '/fs/promises/read-file', label: 'readFile' },
                  { link: '/fs/promises/write-file', label: 'writeFile' },
                ],
              },
              { link: '/fs/callback', label: 'Callback API' },
            ],
          },
          { link: '/http', label: 'HTTP' },
        ],
      },
    ],
  },
};

// Mirrors large documentation sites (e.g. webpack's), which have thousands of pages
export const LargeSite: Story = {
  args: {
    title: 'Sidebar',
    pathname: '/section-10/page-25',
    groups: Array.from({ length: 20 }, (_, section) => ({
      groupName: `Section ${section + 1}`,
      items: Array.from({ length: 50 }, (_, page) => ({
        link: `/section-${section + 1}/page-${page + 1}`,
        label: `Page ${page + 1}`,
      })),
    })),
  },
  globals: { viewport: { value: 'small' } },
};

export default { component: Sidebar } as Meta;
