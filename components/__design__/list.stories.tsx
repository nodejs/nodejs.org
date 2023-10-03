import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';

export const Lists: StoryObj = {};

const listContainer = {
  padding: '1.5rem',
} as CSSProperties;

export default {
  title: 'Design System/Lists',
  component: () => {
    return (
      <>
        <div style={listContainer}>
          <ul>
            <li>Unordered lists</li>
            <li>those without</li>
            <li>numbers</li>
          </ul>
        </div>

        <div style={listContainer}>
          <ol>
            <li>Ordered lists</li>
            <li>Like this</li>
            <li>with numbers</li>
          </ol>
        </div>
      </>
    );
  },
} as MetaObj;
