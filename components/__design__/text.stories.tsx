import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const Anchor: StoryObj = {
  render: () => (
    <div>
      <p>
        The current Node.js security policy can be found at{' '}
        <a href="https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security">
          https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security
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
    </div>
  ),
};

export const Code: StoryObj = {
  render: () => (
    <div>
      This is an example of <code>inline code block</code>
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
