import type { FC, SVGProps } from 'react';

const Choco: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 31.7 28.4"
    enableBackground="new 0 0 31.7 28.4"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <polygon
        fill="#924716"
        points="27.6,27.2 5.7,27.2 5.7,1 27.6,1 27.6,6.9"
      />
      <polygon fill="#793812" points="27.6,1 27.6,27.2 25.7,27.2 25.7,2.6" />
      <polygon fill="#9F5326" points="25.4,2.6 3.5,2.6 3.5,1 27.3,1" />
      <g>
        <polygon
          fill="#80B5E3"
          points="27.6,27.2 3.7,27.2 3.7,1 8.5,1 12.6,4.2 16.6,2.6 19.1,5.7 23.8,4.9 25.7,10.7 27.6,18.1
			30.5,21.1 29,23.6 31.7,28.4"
        />
        <polygon
          fill="#80B5E3"
          points="3.7,27.2 3.7,1 0,0 1.9,4.2 0,7.5 1.9,10.8 0,14.1 1.9,17.3 0,20.6 1.9,23.9 0,28.4"
        />
      </g>
      <polygon
        opacity="0.2"
        fill="#FFFFFF"
        points="10.4,2.6 5.4,2.6 3.5,1 8.3,1"
      />
      <g>
        <path
          fill="#924716"
          d="M18.3,13.7c-0.7,0.6-2.5,1.9-4.4,2.3c-2.3,0.5-3.6-1.4-3.1-3.2c0.5-2.1,2.8-3.7,4.8-3
			c0.9,0.3,0.6,1.5,0.3,2.1c-0.8,1.5,0.3,1.7,0.8,1.2c1.5-1.6,2.4-4.3-0.2-5.3c-4-1.5-7.3,2.2-8.4,5.2c-1.7,4.8,2.4,9,7.1,5.8
			c1.2-0.8,2.6-2.2,3.5-3.4C19.5,14.2,19,13.1,18.3,13.7z"
        />
        <ellipse
          transform="matrix(0.707 -0.7072 0.7072 0.707 -1.547 19.2306)"
          fill="#924716"
          cx="22.4"
          cy="11.5"
          rx="1.6"
          ry="1.1"
        />
        <ellipse
          transform="matrix(0.707 -0.7072 0.7072 0.707 -4.7882 20.1076)"
          fill="#924716"
          cx="21.9"
          cy="15.8"
          rx="1.6"
          ry="1.1"
        />
      </g>
      <polygon
        opacity="0.2"
        fill="#FFFFFF"
        points="5.7,25.5 3.7,27.2 3.7,1 5.7,2.6"
      />
      <g opacity="0.2">
        <polygon
          fill="#342565"
          points="27.6,27.2 3.7,27.2 5.7,25.5 25.7,25.5"
        />
        <polygon
          fill="#342565"
          points="27.6,27.2 25.7,25.5 25.7,10.7 27.6,18.1"
        />
      </g>
    </g>
  </svg>
);

export default Choco;
