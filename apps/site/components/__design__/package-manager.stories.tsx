import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import PackageManagerIcons from '@/components/Icons/PackageManager';

export const PackageManager: StoryObj = {
  render: () => (
    <div className="flex space-x-4">
      <PackageManagerIcons.NPM width={64} height={64} />
      <PackageManagerIcons.PNPM width={64} height={64} />
      <PackageManagerIcons.YARN width={64} height={64} />
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
