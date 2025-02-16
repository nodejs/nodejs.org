import type { FC, SVGProps } from 'react';

// This is an empty placeholder for layout purposes.
const Placeholder: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  ></svg>
);

export default Placeholder;
