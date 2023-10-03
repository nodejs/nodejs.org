import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';

export const Lists: StoryObj = {};

const listContainer = {
  padding: '1.5rem',
} as CSSProperties;

const listDarkContainer = {
  padding: '1.5rem',
  background: '#0d121c',
  color: 'white',
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

        <div style={listDarkContainer}>
          <ul style={{ color: 'white' }}>
            <li>Unordered lists</li>
            <li>those without</li>
            <li>numbers</li>
          </ul>
        </div>
      </>
    );
  },
} as MetaObj;
