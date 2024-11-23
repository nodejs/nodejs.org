import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import AppleIcon from '@node-core/ui-components/Icons/Platform/Apple';
import ChocoIcon from '@node-core/ui-components/Icons/Platform/Choco';
import DockerIcon from '@node-core/ui-components/Icons/Platform/Docker';
import GenericIcon from '@node-core/ui-components/Icons/Platform/Generic';
import HomebrewIcon from '@node-core/ui-components/Icons/Platform/Homebrew';
import LinuxIcon from '@node-core/ui-components/Icons/Platform/Linux';
import MicrosoftIcon from '@node-core/ui-components/Icons/Platform/Microsoft';
import NVMIcon from '@node-core/ui-components/Icons/Platform/NVM';

export const PlatformLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center gap-4">
        <AppleIcon width={64} height={64} />
        <LinuxIcon width={64} height={64} />
        <MicrosoftIcon width={64} height={64} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <DockerIcon width={64} height={64} />
        <HomebrewIcon width={64} height={64} />
        <NVMIcon width={64} height={64} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <GenericIcon width={64} height={64} />
        <ChocoIcon width={64} height={64} />
      </div>
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
