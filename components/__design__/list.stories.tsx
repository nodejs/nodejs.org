import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';

const listContainer = {
  padding: '1.5rem',
} satisfies CSSProperties;

export const OrderedLists: StoryObj = {
  render: () => (
    <div style={listContainer}>
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
    <div style={listContainer}>
      <ul>
        <li>Unordered lists</li>
        <li>those without</li>
        <li>numbers</li>
      </ul>
    </div>
  ),
};

export default { title: 'Design System/Lists' } as MetaObj;
