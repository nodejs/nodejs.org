import type { FC, SVGProps } from 'react';

const N: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    // terminal background (with border for on black background)
    <rect
      x="0"
      y="0"
      width="32"
      height="32"
      fill="#1e1e1e"
      stroke="#ffffff"
      strokeWidth="2"
      rx="5"
    />
    // close, minimize, maximize buttons
    <circle cx="5" cy="3" r="3" fill="#ff5f56" />
    <circle cx="12" cy="3" r="3" fill="#ffbd2e" />
    <circle cx="19" cy="3" r="3" fill="#27c93f" />
    // text with outline
    <text x="6" y="22" fontFamily="monospace" fontSize="14" fill="#00ff00">
      $n
    </text>
  </svg>
);

export default N;
