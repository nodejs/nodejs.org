import classNames from 'classnames';
import type { FC, SVGProps } from 'react';

const Vercel: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width="1155"
    height="1000"
    viewBox="0 0 1155 1000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={classNames('text-[#000000] dark:text-white', props.className)}
    {...props}
  >
    <path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="currentColor" />
  </svg>
);

export default Vercel;
