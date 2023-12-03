import type { FC, SVGAttributes } from 'react';

const ProgressionSidebarIcon: FC<SVGAttributes<SVGSVGElement>> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    {...props}
  >
    <path d="M9 3.26795L8 2.6906L7 3.26795L3.5359 5.26795L2.5359 5.8453V7V11V12.1547L3.5359 12.7321L7 14.7321L8 15.3094L9 14.7321L12.4641 12.7321L13.4641 12.1547V11V7V5.8453L12.4641 5.26795L9 3.26795Z" />
  </svg>
);

export default ProgressionSidebarIcon;
