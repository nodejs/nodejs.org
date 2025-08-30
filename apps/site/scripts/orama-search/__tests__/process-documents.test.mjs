import assert from 'node:assert';
import test from 'node:test';

import dedent from 'dedent';

import { processDocument } from '../process-documents.mjs';

const testCases = [
  {
    name: 'Uses front matter title if available',
    input: {
      pathname: 'blog/my-post.html',
      content: dedent`
        ---
        title: Custom Title
        ---
        # Intro
        Hello world
      `,
    },
    expected: [
      {
        path: 'blog/my-post.html#intro',
        siteSection: 'Blog',
        pageTitle: 'Custom Title',
        pageSectionTitle: 'Intro',
        pageSectionContent: 'Hello world',
      },
    ],
  },
  {
    name: 'Falls back to filename for title',
    input: {
      pathname: 'docs/another-post.html',
      content: dedent`
        # Start
        Content here
      `,
    },
    expected: [
      {
        path: 'docs/another-post.html#start',
        siteSection: 'Docs',
        pageTitle: 'another post',
        pageSectionTitle: 'Start',
        pageSectionContent: 'Content here',
      },
    ],
  },
  {
    name: 'Handles multiple sections',
    input: {
      pathname: 'guides/test.html',
      content: dedent`
        # First
        Paragraph A

        # Second
        Paragraph B
      `,
    },
    expected: [
      {
        path: 'guides/test.html#first',
        siteSection: 'Guides',
        pageTitle: 'test',
        pageSectionTitle: 'First',
        pageSectionContent: 'Paragraph A',
      },
      {
        path: 'guides/test.html#second',
        siteSection: 'Guides',
        pageTitle: 'test',
        pageSectionTitle: 'Second',
        pageSectionContent: 'Paragraph B',
      },
    ],
  },
  {
    name: 'Section with no heading',
    input: {
      pathname: 'misc/untitled.html',
      content: dedent`
        Just some text without a heading
      `,
    },
    expected: [
      {
        path: 'misc/untitled.html#',
        siteSection: 'Misc',
        pageTitle: 'untitled',
        pageSectionTitle: '',
        pageSectionContent: 'Just some text without a heading',
      },
    ],
  },
];

for (const { name, input, expected } of testCases) {
  test(name, () => {
    const result = processDocument(input);
    assert.deepStrictEqual(result, expected);
  });
}
