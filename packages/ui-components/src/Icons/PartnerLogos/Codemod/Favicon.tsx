import type { FC, SVGProps } from 'react';

const Codemod: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_985_1597)">
      <rect width="100" height="100" rx="17" fill="#D6FF62" />
      <mask
        id="mask0_985_1597"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="15"
        y="19"
        width="71"
        height="54"
      >
        <path d="M86 19.5751H15.0007V72.5597H86V19.5751Z" fill="white" />
      </mask>
      <g mask="url(#mask0_985_1597)">
        <path
          d="M15.0007 71.6943L35.3567 19.5751H42.1419L21.7146 71.6943H15.0007Z"
          fill="#0B151E"
        />
        <path
          d="M55.4074 35.3842C64.2864 35.3842 70.4943 40.437 71.7227 48.3058H64.9374C63.7824 43.8307 60.1724 41.4472 55.6257 41.4472C49.2016 41.4472 44.7978 46.355 44.7978 54.0076C44.7978 61.6601 48.9118 66.4966 55.338 66.4966C60.1744 66.4966 63.7844 63.9703 65.0108 59.7827H71.7961C70.4248 67.4353 63.8558 72.5595 55.338 72.5595C44.9427 72.5595 38.0859 65.1967 38.0859 54.079C38.0859 42.9614 45.0876 35.3822 55.4113 35.3822L55.4074 35.3842Z"
          fill="#0B151E"
        />
        <path
          d="M75.4034 67.5069C75.4034 64.6908 77.7849 62.3807 80.601 62.3807C83.4172 62.3807 85.7276 64.6908 85.7276 67.5069C85.7276 70.323 83.3457 72.5597 80.601 72.5597C77.8564 72.5597 75.4034 70.2496 75.4034 67.5069Z"
          fill="#0B151E"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_985_1597">
        <rect width="100" height="100" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Codemod;
