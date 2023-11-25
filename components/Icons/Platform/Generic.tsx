import type { FC, SVGProps } from 'react';

const Generic: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16 29.333c7.364 0 13.333-5.97 13.333-13.333 0-7.364-5.97-13.334-13.333-13.334C8.636 2.666 2.667 8.636 2.667 16S8.637 29.333 16 29.333Z"
      stroke="#000"
      strokeWidth="2.667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Generic;
