import type { FC, SVGProps } from 'react';

const PnpmIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width="32px"
    height="32px"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M30,10.75H21.251V2H30Z" fill="#f9ad00" />
    <path d="M20.374,10.75h-8.75V2h8.75Z" fill="#f9ad00" />
    <path d="M10.749,10.75H2V2h8.749Z" fill="#f9ad00" />
    <path d="M30,20.375H21.251v-8.75H30Z" fill="#f9ad00" />
    <path d="M20.374,20.375h-8.75v-8.75h8.75Z" fill="#4e4e4e" />
    <path d="M20.374,30h-8.75V21.25h8.75Z" fill="#4e4e4e" />
    <path d="M30,30H21.251V21.25H30Z" fill="#4e4e4e" />
    <path d="M10.749,30H2V21.25h8.749Z" fill="#4e4e4e" />
  </svg>
);

export default PnpmIcon;
