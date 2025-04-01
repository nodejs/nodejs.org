import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const Colors: StoryObj = {
  render: () => (
    <div className="flex flex-row justify-between">
      <div className="flex w-full flex-col items-center justify-between gap-1">
        <div className="flex flex-row gap-1">
          <div className="h-20 w-20 bg-green-100" />
          <div className="h-20 w-20 bg-green-200" />
          <div className="h-20 w-20 bg-green-300" />
          <div className="h-20 w-20 bg-green-400" />
          <div className="h-20 w-20 bg-green-600" />
          <div className="h-20 w-20 bg-green-700" />
          <div className="h-20 w-20 bg-green-800" />
          <div className="h-20 w-20 bg-green-900" />
        </div>
        <div className="flex flex-row gap-1">
          <div className="h-20 w-20 bg-neutral-100" />
          <div className="h-20 w-20 bg-neutral-200" />
          <div className="h-20 w-20 bg-neutral-300" />
          <div className="h-20 w-20 bg-neutral-400" />
          <div className="h-20 w-20 bg-neutral-600" />
          <div className="h-20 w-20 bg-neutral-700" />
          <div className="h-20 w-20 bg-neutral-800" />
          <div className="h-20 w-20 bg-neutral-900" />
        </div>
        <div className="flex flex-row gap-1">
          <div className="bg-danger-100 h-20 w-20" />
          <div className="bg-danger-200 h-20 w-20" />
          <div className="bg-danger-300 h-20 w-20" />
          <div className="bg-danger-400 h-20 w-20" />
          <div className="bg-danger-600 h-20 w-20" />
          <div className="bg-danger-700 h-20 w-20" />
          <div className="bg-danger-800 h-20 w-20" />
          <div className="bg-danger-900 h-20 w-20" />
        </div>
        <div className="flex flex-row gap-1">
          <div className="bg-warning-100 h-20 w-20" />
          <div className="bg-warning-200 h-20 w-20" />
          <div className="bg-warning-300 h-20 w-20" />
          <div className="bg-warning-400 h-20 w-20" />
          <div className="bg-warning-600 h-20 w-20" />
          <div className="bg-warning-700 h-20 w-20" />
          <div className="bg-warning-800 h-20 w-20" />
          <div className="bg-warning-900 h-20 w-20" />
        </div>
        <div className="flex flex-row gap-1">
          <div className="bg-info-100 h-20 w-20" />
          <div className="bg-info-200 h-20 w-20" />
          <div className="bg-info-300 h-20 w-20" />
          <div className="bg-info-400 h-20 w-20" />
          <div className="bg-info-600 h-20 w-20" />
          <div className="bg-info-700 h-20 w-20" />
          <div className="bg-info-800 h-20 w-20" />
          <div className="bg-info-900 h-20 w-20" />
        </div>
        <div className="flex flex-row gap-1">
          <div className="bg-accent1-100 h-20 w-20" />
          <div className="bg-accent1-200 h-20 w-20" />
          <div className="bg-accent1-300 h-20 w-20" />
          <div className="bg-accent1-400 h-20 w-20" />
          <div className="bg-accent1-600 h-20 w-20" />
          <div className="bg-accent1-700 h-20 w-20" />
          <div className="bg-accent1-800 h-20 w-20" />
          <div className="bg-accent1-900 h-20 w-20" />
        </div>
        <div className="flex flex-row gap-1">
          <div className="bg-accent2-100 h-20 w-20" />
          <div className="bg-accent2-200 h-20 w-20" />
          <div className="bg-accent2-300 h-20 w-20" />
          <div className="bg-accent2-400 h-20 w-20" />
          <div className="bg-accent2-600 h-20 w-20" />
          <div className="bg-accent2-700 h-20 w-20" />
          <div className="bg-accent2-800 h-20 w-20" />
          <div className="bg-accent2-900 h-20 w-20" />
        </div>
      </div>
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
