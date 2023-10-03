import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const OrderedLists: StoryObj = {
  render: () => {
    return (
      <div>
        <ol>
          <li>Ordered lists</li>
          <li>Like this</li>
          <li>with numbers</li>
        </ol>
      </div>
    );
  },
};

export const UnorderedLists: StoryObj = {
  render: () => {
    return (
      <div>
        <ul>
          <li>Unordered lists</li>
          <li>those without</li>
          <li>numbers</li>
        </ul>
      </div>
    );
  },
};

export default { title: 'Design System/Lists' } as MetaObj;
