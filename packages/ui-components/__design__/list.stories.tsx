import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const OrderedLists: StoryObj = {
  render: () => (
    <main>
      <ol>
        <li>Ordered lists</li>
        <li>Like this</li>
        <li>with numbers</li>
      </ol>
    </main>
  ),
};

export const UnorderedLists: StoryObj = {
  render: () => (
    <main>
      <ul>
        <li>Unordered lists</li>
        <li>those without</li>
        <li>numbers</li>
      </ul>
    </main>
  ),
};

export default { title: 'Design System' } as MetaObj;
