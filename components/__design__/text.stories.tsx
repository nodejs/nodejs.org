import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const Anchor: StoryObj = {
  render: () => (
    <main>
      <p>
        The current Node.js security policy can be found at{' '}
        <a href="https://github.com/nodejs/node/security/policy#security">
          https://github.com/nodejs/node/security/policy#security
        </a>
        , including information on how to report a vulnerability in Node.js.
        Subscribe to the low-volume announcement-only nodejs-sec mailing list at{' '}
        <a href="https://groups.google.com/forum/#!forum/nodejs-sec">
          https://groups.google.com/forum/#!forum/nodejs-sec
        </a>{' '}
        to stay up to date on security vulnerabilities and security-related
        releases of Node.js and the projects maintained in the nodejs GitHub
        organization.
      </p>
    </main>
  ),
};

export const InlineCode: StoryObj = {
  render: () => (
    <main>
      <p>
        This is an example of <code>inline code block</code>
      </p>
    </main>
  ),
};

export const Headings: StoryObj = {
  render: () => (
    <main>
      <h1>HTML Section Heading 1</h1>
      <h2>HTML Section Heading 2</h2>
      <h3>HTML Section Heading 3</h3>
      <h4>HTML Section Heading 4</h4>
      <h5>HTML Section Heading 5</h5>
      <h6>HTML Section Heading 6</h6>
    </main>
  ),
};

export default { title: 'Design System' } as MetaObj;
