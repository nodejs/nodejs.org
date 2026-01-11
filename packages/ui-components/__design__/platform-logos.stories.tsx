import {
  Docker,
  Homebrew,
  NVM,
  Choco,
  N,
  Volta,
} from '#ui/Icons/InstallationMethod';
import { Apple, Linux, Microsoft, AIX } from '#ui/Icons/OperatingSystem';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

const osIcons = [Apple, Linux, Microsoft, AIX];
const installMethodIcons = [Docker, Homebrew, NVM, Choco, N, Volta];

export const PlatformLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      {[osIcons, installMethodIcons].map((icons, idx) => (
        <div key={idx} className="flex flex-col items-center gap-4">
          {icons.map((Icon, index) => (
            <Icon key={index} width={64} height={64} />
          ))}
        </div>
      ))}
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
