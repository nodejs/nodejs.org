import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';

export const Default: StoryObj = {};

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
} satisfies CSSProperties;

const containerColorsStyle = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  justifyContent: 'space-between',
  width: '100%',
} satisfies CSSProperties;

const gridEntryStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
} satisfies CSSProperties;

export default {
  title: 'Design System/Colors',
  component: () => (
    <div style={containerStyle}>
      <div style={containerColorsStyle}>
        <div style={gridEntryStyle}>
          <div className="h-20 w-20 bg-green-100" />
          <div className="h-20 w-20 bg-green-200" />
          <div className="h-20 w-20 bg-green-300" />
          <div className="h-20 w-20 bg-green-400" />
          <div className="h-20 w-20 bg-green-600" />
          <div className="h-20 w-20 bg-green-700" />
          <div className="h-20 w-20 bg-green-800" />
          <div className="h-20 w-20 bg-green-900" />
        </div>
        <div style={gridEntryStyle}>
          <div className="h-20 w-20 bg-neutral-100" />
          <div className="h-20 w-20 bg-neutral-200" />
          <div className="h-20 w-20 bg-neutral-300" />
          <div className="h-20 w-20 bg-neutral-400" />
          <div className="h-20 w-20 bg-neutral-600" />
          <div className="h-20 w-20 bg-neutral-700" />
          <div className="h-20 w-20 bg-neutral-800" />
          <div className="h-20 w-20 bg-neutral-900" />
        </div>
        <div style={gridEntryStyle}>
          <div className="h-20 w-20 bg-danger-100" />
          <div className="h-20 w-20 bg-danger-200" />
          <div className="h-20 w-20 bg-danger-300" />
          <div className="h-20 w-20 bg-danger-400" />
          <div className="h-20 w-20 bg-danger-600" />
          <div className="h-20 w-20 bg-danger-700" />
          <div className="h-20 w-20 bg-danger-800" />
          <div className="h-20 w-20 bg-danger-900" />
        </div>
        <div style={gridEntryStyle}>
          <div className="h-20 w-20 bg-warning-100" />
          <div className="h-20 w-20 bg-warning-200" />
          <div className="h-20 w-20 bg-warning-300" />
          <div className="h-20 w-20 bg-warning-400" />
          <div className="h-20 w-20 bg-warning-600" />
          <div className="h-20 w-20 bg-warning-700" />
          <div className="h-20 w-20 bg-warning-800" />
          <div className="h-20 w-20 bg-warning-900" />
        </div>
        <div style={gridEntryStyle}>
          <div className="h-20 w-20 bg-info-100" />
          <div className="h-20 w-20 bg-info-200" />
          <div className="h-20 w-20 bg-info-300" />
          <div className="h-20 w-20 bg-info-400" />
          <div className="h-20 w-20 bg-info-600" />
          <div className="h-20 w-20 bg-info-700" />
          <div className="h-20 w-20 bg-info-800" />
          <div className="h-20 w-20 bg-info-900" />
        </div>
        <div style={gridEntryStyle}>
          <div className="h-20 w-20 bg-accent1-100" />
          <div className="h-20 w-20 bg-accent1-200" />
          <div className="h-20 w-20 bg-accent1-300" />
          <div className="h-20 w-20 bg-accent1-400" />
          <div className="h-20 w-20 bg-accent1-600" />
          <div className="h-20 w-20 bg-accent1-700" />
          <div className="h-20 w-20 bg-accent1-800" />
          <div className="h-20 w-20 bg-accent1-900" />
        </div>
        <div style={gridEntryStyle}>
          <div className="h-20 w-20 bg-accent2-100" />
          <div className="h-20 w-20 bg-accent2-200" />
          <div className="h-20 w-20 bg-accent2-300" />
          <div className="h-20 w-20 bg-accent2-400" />
          <div className="h-20 w-20 bg-accent2-600" />
          <div className="h-20 w-20 bg-accent2-700" />
          <div className="h-20 w-20 bg-accent2-800" />
          <div className="h-20 w-20 bg-accent2-900" />
        </div>
      </div>
    </div>
  ),
} as MetaObj;
