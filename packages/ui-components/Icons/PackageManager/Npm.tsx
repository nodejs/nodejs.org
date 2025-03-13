import type { FC, SVGProps } from 'react';

const NpmIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <rect width="24" height="24" fill="#D40001" />
      <path
        fill="#fff"
        d="M16.7179487,7.92840493 L12.2051282,7.92840493 L12.2051282,20.2494172 L4,20.2494172 L4,3 L12.2051282,3 L20,3 L20,7.92840493 L20,20.2494172 L16.7179487,20.2494172 L16.7179487,7.92840493 Z"
      />
    </g>
  </svg>
);

export default NpmIcon;
