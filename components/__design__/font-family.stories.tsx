import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const FontFamily: StoryObj = {
  render: () => (
    <div className="align-center ga-1 w-100 flex h-full flex-row flex-wrap justify-start">
      <div>
        <p className="text-xs font-regular">Text XS/Regular</p>
        <p className="text-xs font-medium">Text XS/Medium</p>
        <p className="text-xs font-semibold">Text XS/SemiBold</p>
        <p className="text-xs font-bold">Text XS/Bold</p>
      </div>
      <div>
        <p className="text-sm font-regular">Text SM/Regular</p>
        <p className="text-sm font-medium">Text SM/Medium</p>
        <p className="text-sm font-semibold">Text SM/SemiBold</p>
        <p className="text-sm font-bold">Text SM/Bold</p>
      </div>
      <div>
        <p className="text-regular font-regular">Text Base/Regular</p>
        <p className="text-regular font-medium">Text Base/Medium</p>
        <p className="text-regular font-semibold">Text Base/SemiBold</p>
        <p className="text-regular font-bold">Text Base/Bold</p>
      </div>
      <div>
        <p className="text-lg font-regular">Text LG/Regular</p>
        <p className="text-lg font-medium">Text LG/Medium</p>
        <p className="text-lg font-semibold">Text LG/SemiBold</p>
        <p className="text-lg font-bold">Text LG/Bold</p>
      </div>
      <div>
        <p className="text-xl font-regular">Text XL/Regular</p>
        <p className="text-xl font-medium">Text XL/Medium</p>
        <p className="text-xl font-semibold">Text XL/SemiBold</p>
        <p className="text-xl font-bold">Text XL/Bold</p>
      </div>
      <div>
        <p className="text-2xl font-regular">Text 2XL/Regular</p>
        <p className="text-2xl font-medium">Text 2XL/Medium</p>
        <p className="text-2xl font-semibold">Text 2XL/SemiBold</p>
        <p className="text-2xl font-bold">Text 2XL/Bold</p>
      </div>
      <div>
        <p className="text-3xl font-regular">Text 3XL/Regular</p>
        <p className="text-3xl font-medium">Text 3XL/Medium</p>
        <p className="text-3xl font-semibold">Text 3XL/SemiBold</p>
        <p className="text-3xl font-bold">Text 3XL/Bold</p>
      </div>
      <div>
        <p className="text-4xl font-regular">Text 4XL/Regular</p>
        <p className="text-4xl font-medium">Text 4XL/Medium</p>
        <p className="text-4xl font-semibold">Text 4XL/SemiBold</p>
        <p className="text-4xl font-bold">Text 4XL/Bold</p>
      </div>
      <div>
        <p className="text-5xl font-regular">Text 5XL/Regular</p>
        <p className="text-5xl font-medium">Text 5XL/Medium</p>
        <p className="text-5xl font-semibold">Text 5XL/SemiBold</p>
        <p className="text-5xl font-bold">Text 5XL/Bold</p>
      </div>
      <div>
        <p className="text-6xl font-regular">Text 6XL/Regular</p>
        <p className="text-6xl font-medium">Text 6XL/Medium</p>
        <p className="text-6xl font-semibold">Text 6XL/SemiBold</p>
        <p className="text-6xl font-bold">Text 6XL/Bold</p>
      </div>
      <div>
        <p className="text-7xl font-regular">Text 7XL/Regular</p>
        <p className="text-7xl font-medium">Text 7XL/Medium</p>
        <p className="text-7xl font-semibold">Text 7XL/SemiBold</p>
        <p className="text-7xl font-bold">Text 7XL/Bold</p>
      </div>
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
