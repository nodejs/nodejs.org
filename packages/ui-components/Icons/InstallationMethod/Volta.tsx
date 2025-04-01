import type { FC, SVGProps } from 'react';

const Volta: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="16"
      cy="16"
      r="15"
      fill="#6DB9B4"
      stroke="#5EA9A2"
      strokeWidth="2"
    />
    <text
      x="16"
      y="21"
      fontFamily="Arial"
      fontSize="16"
      fontWeight="bold"
      fill="#FFFFFF"
      textAnchor="middle"
    >
      V
    </text>
  </svg>
);

export default Volta;
