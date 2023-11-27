import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const OrderedLists: StoryObj = {
  render: () => (
    <div className="mdxContent">
      <ol>
        <li>Ordered lists</li>
        <li>Like this</li>
        <li>with numbers</li>
      </ol>
    </div>
  ),
};

export const UnorderedLists: StoryObj = {
  render: () => (
    <div className="mdxContent">
      <ul>
        <li>Unordered lists</li>
        <li>those without</li>
        <li>numbers</li>
      </ul>
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
