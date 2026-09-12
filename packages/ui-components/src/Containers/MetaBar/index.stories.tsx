import { CodeBracketIcon } from '@heroicons/react/24/outline';

import Badge from '#ui/Common/Badge';
import MetaBar from '#ui/Containers/MetaBar';
import GitHubIcon from '#ui/Icons/Social/GitHub';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof MetaBar>;
type Meta = MetaObj<typeof MetaBar>;

export const Default: Story = {
  args: {
    items: {
      'components.metabar.lastUpdated': new Date(
        '17 October 2023'
      ).toLocaleDateString(),
      'components.metabar.readingTime': '15 minutes',
      'components.metabar.addedIn': 'v1.0.0',
      'components.metabar.author': 'The Node.js Project',
      'components.metabar.authors': <p>...</p>,
      'components.metabar.contribute': (
        <>
          <GitHubIcon className="fill-neutral-700 dark:fill-neutral-100" />
          <a href="/contribute">Edit this page</a>
        </>
      ),
      'components.metabar.viewAs': (
        <>
          <CodeBracketIcon />
          <a href="/json">JSON</a>
        </>
      ),
    },
    headings: {
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
      ],
    },
  },
};

export default { component: MetaBar } as Meta;

type TocEntry = {
  text: string;
  depth: 2 | 3 | 4;
  stability?: 'Deprecated' | 'Experimental' | 'Legacy';
  badgePosition?: 'leading' | 'trailing';
};

// Mirrors the Node.js API documentation table of contents, where headings can
// carry a stability badge exposing a `data-tooltip`. Badges sit at both edges
// of the list (line-leading and line-trailing) and the compact, long list
// scrolls, reproducing nodejs/doc-kit#938.
const TOC_ENTRIES: Array<TocEntry> = [
  { text: 'Overview of the module', depth: 2 },
  {
    text: 'assert.Assertions',
    depth: 3,
    stability: 'Legacy',
    badgePosition: 'leading',
  },
  {
    text: 'assert.deepEqual compared with deepStrictEqual and when to prefer each',
    depth: 3,
    stability: 'Deprecated',
    badgePosition: 'trailing',
  },
  { text: 'assert.deepStrictEqual comparison details', depth: 3 },
  {
    text: 'assert.doesNotMatch',
    depth: 3,
    stability: 'Experimental',
    badgePosition: 'trailing',
  },
  { text: 'assert.doesNotReject', depth: 4 },
  {
    text: 'assert.doesNotThrow',
    depth: 4,
    stability: 'Experimental',
    badgePosition: 'trailing',
  },
  { text: 'assert.equal', depth: 3 },
  {
    text: 'assert.fail with custom error handling strategies',
    depth: 3,
    stability: 'Deprecated',
    badgePosition: 'trailing',
  },
  { text: 'assert.ifError', depth: 3 },
  {
    text: 'assert.match',
    depth: 3,
    stability: 'Experimental',
    badgePosition: 'trailing',
  },
  { text: 'assert.ok truthiness checks and custom messages', depth: 2 },
  {
    text: 'assert.rejects',
    depth: 3,
    stability: 'Legacy',
    badgePosition: 'leading',
  },
  { text: 'assert.throws with validation objects and error classes', depth: 3 },
  {
    text: 'assert.partialDeepStrictEqual',
    depth: 3,
    stability: 'Experimental',
    badgePosition: 'trailing',
  },
  { text: 'strict mode configuration', depth: 2 },
  {
    text: 'assert.CallTracker',
    depth: 3,
    stability: 'Deprecated',
    badgePosition: 'leading',
  },
  { text: 'Caveats and migration notes for legacy APIs', depth: 4 },
  { text: 'assert.default', depth: 3 },
  {
    text: 'assert.strict mode caveats and examples for migration',
    depth: 3,
    stability: 'Legacy',
    badgePosition: 'trailing',
  },
];

export const TableOfContentsWithStabilityBadges: Story = {
  render: args => (
    <>
      <style>{`
        .sb-compact-toc dd ol li { font-size: 0.75rem; line-height: 1rem; }
        .sb-compact-toc dd ol { gap: 0.25rem; }
        .sb-compact-toc dd { margin-bottom: 1rem; }
      `}</style>

      <div className="sb-compact-toc">
        <MetaBar {...args} />
      </div>
    </>
  ),
  args: {
    items: {
      'components.metabar.readingTime': '15 minutes',
      'components.metabar.addedIn': 'v1.0.0',
    },
    headings: {
      items: TOC_ENTRIES.map((entry, index) => {
        const badge = entry.stability ? (
          <Badge
            className={entry.badgePosition === 'leading' ? 'mr-1' : 'ml-1'}
            data-tooltip={entry.stability}
            tabIndex={0}
          >
            {entry.stability[0]}
          </Badge>
        ) : null;

        const value =
          badge && entry.badgePosition === 'leading' ? (
            <>
              {badge} {entry.text}
            </>
          ) : (
            <>
              {entry.text}
              {badge}
            </>
          );

        return {
          value: value as unknown as string,
          depth: entry.depth,
          data: { id: `toc-${index}` },
        };
      }),
    },
  },
};
