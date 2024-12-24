import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import NpmIcon from '@/components/Icons/PackageManager/Npm';
import PnpmIcon from '@/components/Icons/PackageManager/Pnpm';
import YarnIcon from '@/components/Icons/PackageManager/Yarn';

export const PackageManager: StoryObj = {
  render: () => (
    <div className="flex space-x-4">
      <NpmIcon width={64} height={64} />
      <PnpmIcon width={64} height={64} />
      <YarnIcon width={64} height={64} />
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
