import type { FC, SVGProps } from 'react';

const Linux: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 216 256"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs id="tux_fx">
      <linearGradient id="gradient_belly_shadow">
        <stop offset="0" />
        <stop offset="1" stopOpacity=".25" />
      </linearGradient>
      <linearGradient id="gradient_wing_tip_right_shadow">
        <stop offset="0" stopColor="#110800" />
        <stop offset=".59" stopColor="#a65a00" stopOpacity=".8" />
        <stop offset="1" stopColor="#ff921e" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="gradient_wing_tip_right_glare_1">
        <stop offset="0" stopColor="#7c7c7c" />
        <stop offset="1" stopColor="#7c7c7c" stopOpacity=".33" />
      </linearGradient>
      <linearGradient id="gradient_wing_tip_right_glare_2">
        <stop offset="0" stopColor="#7c7c7c" />
        <stop offset="1" stopColor="#7c7c7c" stopOpacity=".33" />
      </linearGradient>
      <linearGradient id="gradient_foot_left_layer_1">
        <stop offset="0" stopColor="#b98309" />
        <stop offset="1" stopColor="#382605" />
      </linearGradient>
      <linearGradient id="gradient_foot_left_glare">
        <stop offset="0" stopColor="#ebc40c" />
        <stop offset="1" stopColor="#ebc40c" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="gradient_foot_right_shadow">
        <stop offset="0" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="gradient_foot_right_layer_1">
        <stop offset="0" stopColor="#3e2a06" />
        <stop offset="1" stopColor="#ad780a" />
      </linearGradient>
      <linearGradient id="gradient_foot_right_glare">
        <stop offset="0" stopColor="#f3cd0c" />
        <stop offset="1" stopColor="#f3cd0c" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="gradient_eyeball">
        <stop offset="0" stopColor="#fefefc" />
        <stop offset=".75" stopColor="#fefefc" />
        <stop offset="1" stopColor="#d4d4d4" />
      </linearGradient>
      <linearGradient id="gradient_pupil_left_glare">
        <stop offset="0" stopColor="#757574" stopOpacity="0" />
        <stop offset=".25" stopColor="#757574" />
        <stop offset=".5" stopColor="#757574" />
        <stop offset="1" stopColor="#757574" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="gradient_pupil_right_glare_2">
        <stop offset="0" stopColor="#949494" stopOpacity=".39" />
        <stop offset=".5" stopColor="#949494" />
        <stop offset="1" stopColor="#949494" stopOpacity=".39" />
      </linearGradient>
      <linearGradient id="gradient_eyelid_left">
        <stop offset="0" stopColor="#c8c8c8" />
        <stop offset="1" stopColor="#797978" />
      </linearGradient>
      <linearGradient id="gradient_eyelid_right">
        <stop offset="0" stopColor="#747474" />
        <stop offset=".13" stopColor="#8c8c8c" />
        <stop offset=".25" stopColor="#a4a4a4" />
        <stop offset=".5" stopColor="#d4d4d4" />
        <stop offset=".62" stopColor="#d4d4d4" />
        <stop offset="1" stopColor="#7c7c7c" />
      </linearGradient>
      <linearGradient id="gradient_eyebrow">
        <stop offset="0" stopColor="#646464" stopOpacity="0" />
        <stop offset=".31" stopColor="#646464" stopOpacity=".58" />
        <stop offset=".47" stopColor="#646464" />
        <stop offset=".73" stopColor="#646464" stopOpacity=".26" />
        <stop offset="1" stopColor="#646464" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="gradient_beak_base">
        <stop offset="0" stopColor="#020204" />
        <stop offset=".73" stopColor="#020204" />
        <stop offset="1" stopColor="#5c5c5c" />
      </linearGradient>
      <linearGradient id="gradient_mandible_lower">
        <stop offset="0" stopColor="#d2940a" />
        <stop offset=".75" stopColor="#d89c08" />
        <stop offset=".87" stopColor="#b67e07" />
        <stop offset="1" stopColor="#946106" />
      </linearGradient>
      <linearGradient id="gradient_mandible_upper">
        <stop offset="0" stopColor="#ad780a" />
        <stop offset=".12" stopColor="#d89e08" />
        <stop offset=".25" stopColor="#edb80b" />
        <stop offset=".39" stopColor="#ebc80d" />
        <stop offset=".53" stopColor="#f5d838" />
        <stop offset=".77" stopColor="#f6d811" />
        <stop offset="1" stopColor="#f5cd31" />
      </linearGradient>
      <linearGradient id="gradient_nares">
        <stop offset="0" stopColor="#3a2903" />
        <stop offset=".55" stopColor="#735208" />
        <stop offset="1" stopColor="#ac8c04" />
      </linearGradient>
      <linearGradient id="gradient_beak_corner">
        <stop offset="0" stopColor="#f5ce2d" />
        <stop offset="1" stopColor="#d79b08" />
      </linearGradient>
      <linearGradient
        id="fill_foot_left_base"
        href="#gradient_foot_left_layer_1"
        xlinkHref="#gradient_foot_left_layer_1"
        gradientUnits="userSpaceOnUse"
        x1="23.18"
        y1="193.01"
        x2="64.31"
        y2="262.02"
      />
      <linearGradient
        id="fill_foot_left_glare"
        href="#gradient_foot_left_glare"
        xlinkHref="#gradient_foot_left_glare"
        gradientUnits="userSpaceOnUse"
        x1="64.47"
        y1="210.83"
        x2="77.41"
        y2="235.21"
      />
      <linearGradient
        id="fill_foot_right_shadow"
        href="#gradient_foot_right_shadow"
        xlinkHref="#gradient_foot_right_shadow"
        gradientUnits="userSpaceOnUse"
        x1="146.93"
        y1="211.96"
        x2="150.2"
        y2="235.73"
      />
      <linearGradient
        id="fill_foot_right_base"
        href="#gradient_foot_right_layer_1"
        xlinkHref="#gradient_foot_right_layer_1"
        gradientUnits="userSpaceOnUse"
        x1="151.5"
        y1="253.02"
        x2="192.94"
        y2="185.84"
      />
      <linearGradient
        id="fill_foot_right_glare"
        href="#gradient_foot_right_glare"
        xlinkHref="#gradient_foot_right_glare"
        gradientUnits="userSpaceOnUse"
        x1="162.81"
        y1="180.67"
        x2="161.59"
        y2="191.64"
      />
      <linearGradient
        id="fill_wing_tip_right_glare_2"
        href="#gradient_wing_tip_right_glare_2"
        xlinkHref="#gradient_wing_tip_right_glare_2"
        gradientUnits="userSpaceOnUse"
        x1="165.69"
        y1="173.58"
        x2="168.27"
        y2="173.47"
      />
      <linearGradient
        id="fill_pupil_left_glare"
        href="#gradient_pupil_left_glare"
        xlinkHref="#gradient_pupil_left_glare"
        gradientUnits="userSpaceOnUse"
        x1="84.29"
        y1="46.64"
        x2="89.32"
        y2="55.63"
      />
      <linearGradient
        id="fill_eyebrow_left"
        href="#gradient_eyebrow"
        xlinkHref="#gradient_eyebrow"
        gradientUnits="userSpaceOnUse"
        x1="83.59"
        y1="32.51"
        x2="94.48"
        y2="43.63"
      />
      <linearGradient
        id="fill_pupil_right_glare"
        href="#gradient_pupil_right_glare_2"
        xlinkHref="#gradient_pupil_right_glare_2"
        gradientUnits="userSpaceOnUse"
        x1="117.87"
        y1="47.25"
        x2="123.66"
        y2="54.11"
      />
      <linearGradient
        id="fill_eyelid_right"
        href="#gradient_eyelid_right"
        xlinkHref="#gradient_eyelid_right"
        gradientUnits="userSpaceOnUse"
        x1="112.9"
        y1="36.23"
        x2="131.32"
        y2="47.01"
      />
      <linearGradient
        id="fill_eyebrow_right"
        href="#gradient_eyebrow"
        xlinkHref="#gradient_eyebrow"
        gradientUnits="userSpaceOnUse"
        x1="119.16"
        y1="31.56"
        x2="131.42"
        y2="43.14"
      />
      <linearGradient
        id="fill_mandible_upper_base"
        href="#gradient_mandible_upper"
        xlinkHref="#gradient_mandible_upper"
        gradientUnits="userSpaceOnUse"
        x1="78.09"
        y1="69.26"
        x2="126.77"
        y2="68.88"
      />
      <linearGradient
        id="fill_beak_corner"
        href="#gradient_beak_corner"
        xlinkHref="#gradient_beak_corner"
        gradientUnits="userSpaceOnUse"
        x1="126.74"
        y1="67.49"
        x2="126.74"
        y2="71.09"
      />
      <filter id="blur_belly_shadow_left">
        <feGaussianBlur stdDeviation="0.64 0.55" />
      </filter>
      <filter id="blur_belly_shadow_right">
        <feGaussianBlur stdDeviation=".98" />
      </filter>
      <filter id="blur_belly_shadow_middle">
        <feGaussianBlur stdDeviation=".68" />
      </filter>
      <filter
        id="blur_belly_shadow_lower"
        x="-.8"
        width="2.6"
        y="-.2"
        height="1.4"
      >
        <feGaussianBlur stdDeviation="1.25" />
      </filter>
      <filter id="blur_belly_glare" x="-.8" width="2.6" y="-.5" height="2">
        <feGaussianBlur stdDeviation="1.78 2.19" />
      </filter>
      <filter id="blur_head_glare" x="-.3" width="1.6" y="-.3" height="1.6">
        <feGaussianBlur stdDeviation="1.73" />
      </filter>
      <filter id="blur_neck_glare" x="-.2" width="1.4" y="-.2" height="1.4">
        <feGaussianBlur stdDeviation=".78" />
      </filter>
      <filter
        id="blur_wing_left_glare"
        x="-.2"
        width="1.4"
        y="-.2"
        height="1.4"
      >
        <feGaussianBlur stdDeviation=".98" />
      </filter>
      <filter
        id="blur_wing_right_glare"
        x="-.2"
        width="1.4"
        y="-.2"
        height="1.4"
      >
        <feGaussianBlur stdDeviation="1.19 1.17" />
      </filter>
      <filter
        id="blur_foot_left_layer_1"
        x="-.2"
        width="1.4"
        y="-.2"
        height="1.4"
      >
        <feGaussianBlur stdDeviation="3.38" />
      </filter>
      <filter id="blur_foot_left_layer_2">
        <feGaussianBlur stdDeviation="2.1 2.06" />
      </filter>
      <filter id="blur_foot_left_glare">
        <feGaussianBlur stdDeviation=".32" />
      </filter>
      <filter id="blur_foot_right_shadow">
        <feGaussianBlur stdDeviation="1.95 1.9" />
      </filter>
      <filter
        id="blur_foot_right_layer_1"
        x="-.2"
        width="1.4"
        y="-.2"
        height="1.4"
      >
        <feGaussianBlur stdDeviation="4.12" />
      </filter>
      <filter
        id="blur_foot_right_layer_2"
        x="-.2"
        width="1.4"
        y="-.2"
        height="1.4"
      >
        <feGaussianBlur stdDeviation="3.12 3.37" />
      </filter>
      <filter
        id="blur_foot_right_glare"
        x="-.2"
        width="1.4"
        y="-.2"
        height="1.4"
      >
        <feGaussianBlur stdDeviation=".41" />
      </filter>
      <filter
        id="blur_wing_tip_right_shadow_lower"
        x="-.3"
        width="1.6"
        y="-.3"
        height="1.6"
      >
        <feGaussianBlur stdDeviation="2.45" />
      </filter>
      <filter
        id="blur_wing_tip_right_shadow_upper"
        x="-.2"
        width="1.4"
        y="-.2"
        height="1.4"
      >
        <feGaussianBlur stdDeviation="1.12 0.81" />
      </filter>
      <filter
        id="blur_wing_tip_right_glare"
        x="-.2"
        width="1.4"
        y="-.2"
        height="1.4"
      >
        <feGaussianBlur stdDeviation=".88" />
      </filter>
      <filter
        id="blur_pupil_left_glare"
        x="-.3"
        width="1.6"
        y="-.3"
        height="1.6"
      >
        <feGaussianBlur stdDeviation=".44" />
      </filter>
      <filter id="blur_eyebrow_left">
        <feGaussianBlur stdDeviation=".12" />
      </filter>
      <filter
        id="blur_pupil_right_glare"
        x="-.2"
        width="1.4"
        y="-.2"
        height="1.4"
      >
        <feGaussianBlur stdDeviation=".45" />
      </filter>
      <filter id="blur_eyebrow_right">
        <feGaussianBlur stdDeviation=".13" />
      </filter>
      <filter
        id="blur_beak_shadow_lower"
        x="-.2"
        width="1.4"
        y="-.2"
        height="1.4"
      >
        <feGaussianBlur stdDeviation="1.75" />
      </filter>
      <filter id="blur_beak_shadow_upper">
        <feGaussianBlur stdDeviation="0.8 0.74" />
      </filter>
      <filter
        id="blur_mandible_lower_glare"
        x="-.2"
        width="1.4"
        y="-.2"
        height="1.4"
      >
        <feGaussianBlur stdDeviation=".77" />
      </filter>
      <filter id="blur_mandible_upper_shadow">
        <feGaussianBlur stdDeviation=".65" />
      </filter>
      <filter
        id="blur_mandible_upper_glare"
        x="-.2"
        width="1.4"
        y="-.2"
        height="1.4"
      >
        <feGaussianBlur stdDeviation=".73" />
      </filter>
      <filter id="blur_naris_left" x="-.2" width="1.4" y="-.2" height="1.4">
        <feGaussianBlur stdDeviation=".1" />
      </filter>
      <filter id="blur_naris_right">
        <feGaussianBlur stdDeviation=".1" />
      </filter>
      <filter id="blur_beak_corner" x="-.2" width="1.4" y="-.2" height="1.4">
        <feGaussianBlur stdDeviation=".23" />
      </filter>
      <radialGradient
        id="fill_belly_shadow_left"
        href="#gradient_belly_shadow"
        xlinkHref="#gradient_belly_shadow"
        gradientUnits="userSpaceOnUse"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(19 0 0 18 61.18 121.19)"
      />
      <radialGradient
        id="fill_belly_shadow_right"
        href="#gradient_belly_shadow"
        xlinkHref="#gradient_belly_shadow"
        gradientUnits="userSpaceOnUse"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(23.6 0 0 18 125.74 131.6)"
      />
      <radialGradient
        id="fill_belly_shadow_middle"
        href="#gradient_belly_shadow"
        xlinkHref="#gradient_belly_shadow"
        gradientUnits="userSpaceOnUse"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(9.35 0 0 10 94.21 127.47)"
      />
      <radialGradient
        id="fill_wing_tip_right_shadow_lower"
        href="#gradient_wing_tip_right_shadow"
        xlinkHref="#gradient_wing_tip_right_shadow"
        gradientUnits="userSpaceOnUse"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(18.9901 5.08838 -5.34203 19.9367 169.71 194.53)"
      />
      <radialGradient
        id="fill_wing_tip_right_shadow_upper"
        href="#gradient_wing_tip_right_shadow"
        xlinkHref="#gradient_wing_tip_right_shadow"
        gradientUnits="userSpaceOnUse"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(19.7224 -.83351 .62745 14.84675 169.71 189.89)"
      />
      <radialGradient
        id="fill_wing_tip_right_glare_1"
        href="#gradient_wing_tip_right_glare_1"
        xlinkHref="#gradient_wing_tip_right_glare_1"
        gradientUnits="userSpaceOnUse"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="rotate(23.5 -332.242 532.18) scale(6.95 3.21)"
      />
      <radialGradient
        id="fill_eyeball_left"
        href="#gradient_eyeball"
        xlinkHref="#gradient_eyeball"
        gradientUnits="userSpaceOnUse"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(10.23944 -.10723 .1642 15.67914 86.49 51.41)"
      />
      <radialGradient
        id="fill_eyelid_left"
        href="#gradient_eyelid_left"
        xlinkHref="#gradient_eyelid_left"
        gradientUnits="userSpaceOnUse"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="rotate(-9.35 309.884 -497.172) scale(6.25 5.77)"
      />
      <radialGradient
        id="fill_eyeball_right"
        href="#gradient_eyeball"
        xlinkHref="#gradient_eyeball"
        gradientUnits="userSpaceOnUse"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="rotate(-1.8 1695.327 -3731.952) scale(13.64 15.68)"
      />
      <radialGradient
        id="fill_beak_base"
        href="#gradient_beak_base"
        xlinkHref="#gradient_beak_base"
        gradientUnits="userSpaceOnUse"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="rotate(-36 141.335 -120.193) scale(11.44 10.38)"
      />
      <radialGradient
        id="fill_mandible_lower_base"
        href="#gradient_mandible_lower"
        xlinkHref="#gradient_mandible_lower"
        gradientUnits="userSpaceOnUse"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(25.10142 -10.34606 7.26701 17.6311 109.77 70.61)"
      />
      <radialGradient
        id="fill_naris_left"
        href="#gradient_nares"
        xlinkHref="#gradient_nares"
        gradientUnits="userSpaceOnUse"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(1.32 0 0 1.42 92.11 59.88)"
      />
      <radialGradient
        id="fill_naris_right"
        href="#gradient_nares"
        xlinkHref="#gradient_nares"
        gradientUnits="userSpaceOnUse"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(2.78 0 0 1.62 104.65 59.7)"
      />
      <clipPath id="clip_body">
        <use href="#body_base" xlinkHref="#body_base" />
      </clipPath>
      <clipPath id="clip_wing_left">
        <use href="#wing_left_base" xlinkHref="#wing_left_base" />
      </clipPath>
      <clipPath id="clip_wing_right">
        <use href="#wing_right_base" xlinkHref="#wing_right_base" />
      </clipPath>
      <clipPath id="clip_foot_left">
        <use href="#foot_left_base" xlinkHref="#foot_left_base" />
      </clipPath>
      <clipPath id="clip_foot_right">
        <use href="#foot_right_base" xlinkHref="#foot_right_base" />
      </clipPath>
      <clipPath id="clip_wing_tip_right">
        <use href="#wing_tip_right_base" xlinkHref="#wing_tip_right_base" />
      </clipPath>
      <clipPath id="clip_eye_left">
        <use href="#eyeball_left" xlinkHref="#eyeball_left" />
      </clipPath>
      <clipPath id="clip_pupil_left">
        <use href="#pupil_left_base" xlinkHref="#pupil_left_base" />
      </clipPath>
      <clipPath id="clip_eye_right">
        <use href="#eyeball_right" xlinkHref="#eyeball_right" />
      </clipPath>
      <clipPath id="clip_pupil_right">
        <use href="#pupil_right_base" xlinkHref="#pupil_right_base" />
      </clipPath>
      <clipPath id="clip_mandible_lower">
        <use href="#mandible_lower_base" xlinkHref="#mandible_lower_base" />
      </clipPath>
      <clipPath id="clip_mandible_upper">
        <use href="#mandible_upper_base" xlinkHref="#mandible_upper_base" />
      </clipPath>
      <clipPath id="clip_beak">
        <use href="#mandible_lower_base" xlinkHref="#mandible_lower_base" />
        <use href="#mandible_upper_base" xlinkHref="#mandible_upper_base" />
      </clipPath>
    </defs>
    <g id="tux">
      <g id="body">
        <path
          id="body_base"
          fill="#020204"
          d="M106.95 0c-6 0-12.02 1.18-17.46 4.12-5.78 3.11-10.52 8.09-13.43 13.97-2.92 5.88-4.06 12.16-4.24 19.08-.33 13.14.3 26.92 1.29 39.41.26 3.8.74 6.02.25 9.93-1.62 8.3-8.88 13.88-12.76 21.17-4.27 8.04-6.07 17.13-9.29 25.65-2.95 7.79-7.09 15.1-9.88 22.95-3.91 10.97-5.08 23.03-2.5 34.39 1.97 8.66 6.08 16.78 11.62 23.73-.8 1.44-1.58 2.91-2.4 4.34-2.57 4.43-5.71 8.64-7.17 13.55-.73 2.45-1.02 5.07-.55 7.59.47 2.52 1.75 4.93 3.75 6.53 1.31 1.04 2.9 1.72 4.53 2.1 1.63.37 3.32.46 5 .43 6.37-.14 12.55-2.07 18.71-3.69 3.66-.96 7.34-1.81 11.03-2.58 13.14-2.69 27.8-1.61 39.99.15 4.13.63 8.23 1.44 12.29 2.43 6.36 1.54 12.69 3.5 19.23 3.69 1.72.05 3.46-.03 5.14-.4 1.68-.38 3.31-1.06 4.65-2.13 2.01-1.6 3.29-4.02 3.76-6.54.47-2.52.18-5.15-.56-7.61-1.48-4.92-4.65-9.11-7.27-13.52-1.04-1.75-2-3.53-3.03-5.28 7.9-8.87 14.26-19.13 17.94-30.4 4.01-12.3 4.75-25.55 3.06-38.38-1.69-12.83-5.76-25.27-11.11-37.05-6.72-14.76-12.37-20.1-16.47-33.07-4.42-14.02-.77-30.61-4.06-43.32-1.17-4.32-3.04-8.45-5.45-12.23-2.82-4.43-6.4-8.39-10.65-11.47C124.13 2.62 115.61 0 106.95 0z"
        />
        <path
          id="belly"
          fill="#fdfdfb"
          d="M83.13 74c-.9 1.13-1.48 2.49-1.84 3.89-.35 1.4-.48 2.85-.54 4.3-.11 2.89.07 5.83-.7 8.62-.82 2.98-2.65 5.57-4.44 8.08-3.11 4.36-6.25 8.84-7.78 13.97a24.81 24.81 0 0 0-.91 9.62c-3.47 5.1-6.48 10.53-8.98 16.18-3.78 8.57-6.37 17.69-7.28 27.01-1.12 11.41.34 23.15 4.85 33.69 3.25 7.63 8.11 14.6 14.38 20.04a49.15 49.15 0 0 0 10.5 6.97c13.11 6.45 29.31 6.46 42.2-.41 6.74-3.59 12.43-8.84 17.91-14.15 3.3-3.2 6.59-6.48 9.11-10.32 4.85-7.41 6.54-16.41 7.59-25.2 1.83-15.36 1.89-31.6-4.85-45.53-2.32-4.8-5.41-9.22-9.12-13.05-.98-6.7-2.93-13.27-5.76-19.42-2.05-4.45-4.54-8.68-6.44-13.18-.78-1.85-1.46-3.75-2.32-5.56-.87-1.81-1.93-3.55-3.39-4.94-1.48-1.42-3.33-2.43-5.28-3.07-1.95-.65-4.01-.94-6.06-1.04-4.11-.21-8.22.33-12.33.16-3.27-.13-6.53-.7-9.8-.51-1.63.1-3.26.39-4.78 1.01-1.52.61-2.92 1.56-3.94 2.84z"
        />
        <g id="body_self_shadows">
          <path
            id="belly_shadow_left"
            opacity=".25"
            fill="url(#fill_belly_shadow_left)"
            filter="url(#blur_belly_shadow_left)"
            clipPath="url(#clip_body)"
            d="M68.67 115.18c.87 1.31-.55 5.84 19.86 2.94 0 0-3.59.39-7.12 1.21-5.49 1.84-10.27 3.89-13.97 6.61-3.65 2.7-6.33 6.21-9.68 9.22 0 0 5.43-9.92 6.78-12.91 1.36-2.99-.22-2.85.85-7.25s3.69-8.63 3.69-8.63-2.14 6.22-.41 8.81z"
          />
          <path
            id="belly_shadow_right"
            opacity=".42"
            fill="url(#fill_belly_shadow_right)"
            filter="url(#blur_belly_shadow_right)"
            clipPath="url(#clip_body)"
            d="M134.28 113.99c-4.16 2.9-6.6 2.56-11.64 3.12-5.05.57-18.7.36-18.7.36s1.97-.03 6.36.78c4.38.82 13.31 1.6 18.34 3.51 5.04 1.92 6.87 2.47 9.93 4.4 4.35 2.75 7.55 7.06 11.71 10.08 0 0 .2-4-1.48-6.99s-6.2-7.7-7.53-12.1c-1.32-4.4-1.96-13.04-1.96-13.04s-.88 6.99-5.03 9.88z"
          />
          <path
            id="belly_shadow_middle"
            opacity=".2"
            fill="url(#fill_belly_shadow_middle)"
            filter="url(#blur_belly_shadow_middle)"
            clipPath="url(#clip_body)"
            d="M95.17 107.81c-.16 1.25-.36 2.5-.6 3.74-.12.61-.26 1.22-.48 1.8-.23.58-.56 1.14-1.02 1.55-.41.37-.9.62-1.4.85-1.94.88-4.01 1.47-6.12 1.74.84.06 1.68.14 2.53.23.53.06 1.06.12 1.57.25.52.14 1.03.34 1.46.65.47.35.84.82 1.12 1.34.55 1.02.73 2.2.83 3.37.13 1.48.14 2.98.03 4.46.1-.99.31-1.98.62-2.92.57-1.72 1.47-3.32 2.69-4.65.49-.52 1.02-1.01 1.6-1.42a8.858 8.858 0 0 1 6.24-1.51c-2.21.09-4.44-.6-6.2-1.93-.9-.68-1.68-1.52-2.22-2.5a6.991 6.991 0 0 1-.65-5.05z"
          />
          <path
            id="belly_shadow_lower"
            opacity=".11"
            fill="#000"
            filter="url(#blur_belly_shadow_lower)"
            clipPath="url(#clip_body)"
            d="M89.85 137.14a75.366 75.366 0 0 0-2.17 12.31c-.55 5.87-.42 11.78-.74 17.67-.26 4.99-.85 10.04.02 14.97a25.27 25.27 0 0 0 2.2 6.78c.16-.82.29-1.64.36-2.47.37-4-.3-8.01-.53-12.01-.4-7.02.57-14.04.97-21.06.3-5.39.27-10.8-.11-16.19z"
          />
        </g>
        <g id="body_glare">
          <path
            id="belly_glare"
            opacity=".75"
            fill="#7c7c7c"
            filter="url(#blur_belly_glare)"
            clipPath="url(#clip_body)"
            d="M160.08 131.23c1.03-.16 7.34 5.21 6.48 7.21-.86 1.99-2.49.79-3.65.8-1.16.02-4.33 1.46-4.86.55-.54-.91 1.4-3.03 2.41-4.81.82-1.43-1.4-3.59-.38-3.75z"
          />
          <path
            id="head_glare"
            fill="#7c7c7c"
            filter="url(#blur_head_glare)"
            clipPath="url(#clip_body)"
            d="M121.52 11.12c-2.21 1.56-1.25 3.51-.3 5.46.95 1.96-2.09 7.59-2.12 7.83-.03.24 5.98-2.85 7.62-4.87 1.94-2.37 6.83 3.22 6.56 2.37.01-1.52-9.55-12.34-11.76-10.79z"
          />
          <path
            id="neck_glare"
            fill="#838384"
            filter="url(#blur_neck_glare)"
            clipPath="url(#clip_body)"
            d="M138.27 76.63c-1.86 1.7.88 4.25 2.17 7.24.81 1.86 3.04 4.49 5.2 4.07 1.63-.32 2.63-2.66 2.48-4.3-.3-3.18-2.98-3.93-4.93-5.02-1.54-.86-3.61-3.18-4.92-1.99z"
          />
        </g>
      </g>
      <g id="wings">
        <g id="wing_left">
          <path
            id="wing_left_base"
            fill="#020204"
            d="M63.98 100.91c-6.1 6.92-12.37 13.63-15.81 21.12-1.71 3.8-2.51 7.93-3.68 11.93-1.32 4.54-3.12 8.94-5.14 13.22-1.87 3.95-3.93 7.81-5.98 11.66-1.5 2.81-3.02 5.67-3.54 8.81-.41 2.48-.18 5.04.46 7.47.63 2.43 1.64 4.75 2.79 6.98 4.88 9.55 12.21 17.77 20.89 24.07 3.94 2.85 8.15 5.32 12.58 7.35 2.4 1.09 4.92 2.07 7.56 2.11 1.32.03 2.65-.19 3.86-.72 1.2-.53 2.28-1.38 3-2.49.88-1.36 1.18-3.05 1-4.66-.18-1.61-.81-3.15-1.65-4.53-2.06-3.38-5.31-5.83-8.44-8.25a283.364 283.364 0 0 1-19.55-16.58c-1.76-1.65-3.53-3.34-4.76-5.42-1.2-2.02-1.85-4.32-2.29-6.63-1.21-6.33-.9-12.99 1.25-19.07.85-2.38 1.96-4.65 3.04-6.93 1.86-3.95 3.62-7.98 6.07-11.6 3.05-4.51 7.13-8.33 9.61-13.17 2.1-4.09 2.95-8.68 3.76-13.2.64-3.54 1.85-7 2.47-10.54-1.21 2.3-5.11 6.07-7.5 9.07z"
          />
          <path
            id="wing_left_glare"
            opacity=".95"
            fill="#7c7c7c"
            filter="url(#blur_wing_left_glare)"
            clipPath="url(#clip_wing_left)"
            d="M56.96 126.1c-2 1.84-3.73 3.97-5.13 6.31-2.3 3.84-3.65 8.16-5.33 12.31-1.24 3.09-2.69 6.2-2.86 9.53-.09 1.71.16 3.42.22 5.13s-.1 3.49-.94 4.98a6.048 6.048 0 0 1-3.22 2.71c1.83.61 3.45 1.79 4.6 3.33.96 1.3 1.58 2.81 2.41 4.18.68 1.12 1.51 2.16 2.54 2.97 1.02.82 2.25 1.4 3.54 1.56 1.79.23 3.65-.36 4.97-1.58-1.66-15.55-.14-31.42 4.44-46.37.29-.94.59-1.89.67-2.87.07-.99-.12-2.03-.72-2.81a2.989 2.989 0 0 0-2.77-1.17c-.52.06-1.03.26-1.45.57-.42.32-.76.74-.97 1.22z"
          />
        </g>
        <g id="wing_right">
          <path
            id="wing_right_base"
            fill="#020204"
            d="M162.76 127.12c5.24 4.22 8.57 10.59 9.6 17.24.8 5.18.28 10.51-.89 15.62-1.17 5.12-2.97 10.06-4.77 15-.71 1.96-1.43 3.95-1.71 6.02-.29 2.08-.11 4.27.89 6.11 1.15 2.11 3.29 3.56 5.59 4.24 2.27.68 4.72.66 7.02.09 2.3-.57 6.17-1.31 8.04-2.77 4.75-3.69 5.88-10.1 7.01-15.72 1.17-5.87.6-12.02-.43-17.95-1.41-8.09-3.78-15.99-6.79-23.62a82.272 82.272 0 0 0-8.44-15.96c-3.32-4.89-8.02-8.7-11.5-13.48-1.21-1.66-2.66-3.38-3.84-5.06-2.56-3.62-1.98-2.94-3.57-5.29-1.15-1.7-2.97-2.28-4.88-3.02-1.92-.74-4.06-.96-6.04-.41-2.6.73-4.73 2.79-5.86 5.24-1.13 2.46-1.33 5.28-.89 7.95.57 3.44 2.14 6.64 3.92 9.64 2 3.39 4.32 6.66 7.35 9.18 3.16 2.63 6.98 4.37 10.19 6.95z"
          />
          <path
            id="wing_right_glare"
            fill="#838384"
            filter="url(#blur_wing_right_glare)"
            clipPath="url(#clip_wing_right)"
            d="M150.42 118.99c.42.4.86.81 1.31 1.19 3.22 2.63 4.93 5.58 8.2 8.16 5.34 4.22 10.75 11.5 11.8 18.15.82 5.19-.26 8.01-1.58 14.12-1.32 6.12-5.06 14.78-7.09 20.68-.8 2.35 1.64 1.38 1.32 3.86-.16 1.22-.18 2.45-.03 3.67.02-.23.03-.48.06-.71.39-3.38 1.42-6.63 2.55-9.82 2.17-6.13 4.66-12.15 6.38-18.45 1.72-6.29 1.53-10.82.63-16.23-1.13-6.81-5.09-13.09-10.69-17.24-3.97-2.93-8.64-4.81-12.86-7.38z"
          />
        </g>
      </g>
      <g id="feet">
        <g id="foot_left">
          <path
            id="foot_left_base"
            fill="url(#fill_foot_left_base)"
            d="M34.98 175.33c1.38-.57 2.93-.68 4.39-.41 1.47.27 2.86.91 4.09 1.74 2.47 1.68 4.3 4.12 6.05 6.54 4.03 5.54 7.9 11.2 11.42 17.08 2.85 4.78 5.46 9.71 8.76 14.18 2.15 2.93 4.57 5.64 6.73 8.55 2.16 2.92 4.07 6.08 5.03 9.58 1.25 4.55.76 9.56-1.4 13.75-1.52 2.95-3.86 5.48-6.7 7.19-2.84 1.71-5.83 2.47-9.15 2.47-5.27 0-10.42-2.83-15.32-4.78-9.98-3.98-20.82-5.22-31.11-8.32-3.16-.95-6.27-2.08-9.45-2.95-1.42-.39-2.85-.73-4.19-1.34-1.34-.6-2.59-1.51-3.33-2.77-.57-.98-.8-2.13-.8-3.26 0-1.14.28-2.26.67-3.32.77-2.13 2.02-4.06 2.86-6.17 1.37-3.44 1.62-7.23 1.43-10.93-.18-3.69-.78-7.36-1.03-11.05-.12-1.65-.16-3.32.16-4.95.31-1.62 1.01-3.21 2.2-4.35 1.1-1.06 2.55-1.69 4.05-2 1.49-.31 3.03-.32 4.55-.29 1.52.03 3.05.12 4.57-.01 1.52-.12 3.05-.46 4.37-1.22 1.26-.72 2.29-1.79 3.14-2.96.85-1.17 1.54-2.45 2.25-3.72.7-1.26 1.43-2.52 2.36-3.64.92-1.12 2.06-2.09 3.4-2.64z"
          />
          <path
            id="foot_left_layer_1"
            fill="#d99a03"
            filter="url(#blur_foot_left_layer_1)"
            clipPath="url(#clip_foot_left)"
            d="M37.16 177.7c1.25-.5 2.67-.56 3.98-.26 1.32.3 2.55.94 3.61 1.77 2.14 1.65 3.62 3.97 5.05 6.26 3.42 5.54 6.76 11.15 9.92 16.86 2.4 4.31 4.68 8.7 7.62 12.65 1.95 2.62 4.18 5.03 6.17 7.62 1.99 2.59 3.76 5.41 4.64 8.56 1.14 4.05.68 8.54-1.28 12.26-1.42 2.68-3.58 4.96-6.2 6.48a15.935 15.935 0 0 1-8.69 2.14c-4.82-.22-9.23-2.63-13.77-4.26-8.71-3.16-18.14-3.59-27.08-6.05-3.2-.87-6.32-2.03-9.53-2.84-1.43-.36-2.88-.66-4.23-1.23-1.35-.57-2.62-1.45-3.36-2.72-.54-.95-.76-2.06-.73-3.15.04-1.09.31-2.17.7-3.19.78-2.04 2-3.88 2.78-5.92 1.19-3.08 1.34-6.47 1.12-9.76-.22-3.29-.8-6.56-1-9.85-.08-1.48-.1-2.97.2-4.41.3-1.45.93-2.85 1.98-3.89 1.14-1.13 2.7-1.74 4.29-1.99 1.58-.24 3.19-.13 4.78.01 1.6.14 3.2.32 4.8.23 1.6-.1 3.22-.49 4.54-1.39 1.2-.81 2.1-2 2.79-3.27s1.18-2.64 1.71-3.98c.52-1.35 1.09-2.69 1.91-3.89.82-1.19 1.93-2.24 3.28-2.79z"
          />
          <path
            id="foot_left_layer_2"
            fill="#f5bd0c"
            filter="url(#blur_foot_left_layer_2)"
            clipPath="url(#clip_foot_left)"
            d="M35.99 174.57c1.22-.6 2.65-.72 3.98-.45 1.33.27 2.57.92 3.62 1.77 2.09 1.7 3.43 4.13 4.67 6.51 2.84 5.46 5.5 11.04 8.9 16.19 2.48 3.73 5.33 7.2 7.83 10.92 3.39 5.03 6.15 10.57 7.29 16.5.76 4 .74 8.31-1.18 11.9-1.27 2.37-3.32 4.31-5.75 5.52-2.42 1.22-5.21 1.71-7.92 1.47-4.27-.37-8.14-2.47-12.16-3.94-7.13-2.59-14.84-3.22-22.18-5.18-3.09-.82-6.13-1.89-9.26-2.54-1.39-.29-2.8-.5-4.12-1-1.32-.5-2.57-1.33-3.25-2.55-.47-.86-.63-1.86-.56-2.84.07-.97.36-1.92.74-2.83.77-1.8 1.9-3.46 2.49-5.32.88-2.75.52-5.72-.14-8.53-.65-2.8-1.6-5.55-1.89-8.41-.13-1.27-.13-2.57.17-3.82.29-1.25.88-2.45 1.81-3.34 1.2-1.15 2.88-1.73 4.56-1.89 1.67-.16 3.35.06 5.01.3 1.66.24 3.34.5 5.01.42 1.68-.07 3.39-.51 4.7-1.54 1.3-1.02 2.12-2.53 2.59-4.09.47-1.57.62-3.2.81-4.82.19-1.62.43-3.26 1.06-4.77.63-1.51 1.69-2.9 3.17-3.64z"
          />
          <path
            id="foot_left_glare"
            fill="url(#fill_foot_left_glare)"
            filter="url(#blur_foot_left_glare)"
            clipPath="url(#clip_foot_left)"
            d="M51.2 188.21c2.25 4.06 3.62 8.72 5.85 12.82 2.05 3.77 4.38 7.65 6.46 11.12.93 1.55 3.09 3.93 5.27 7.62 1.98 3.34 3.98 8.01 5.1 9.58-.64-1.84-1.96-6.77-3.54-10.28-1.47-3.28-3.19-5.15-4.24-6.92-2.08-3.47-4.33-6.6-6.47-9.91-2.95-4.57-5.2-9.68-8.43-14.03z"
          />
        </g>
        <g id="foot_right">
          <path
            id="foot_right_shadow"
            opacity=".2"
            fill="url(#fill_foot_right_shadow)"
            filter="url(#blur_foot_right_shadow)"
            clipPath="url(#clip_body)"
            d="M198.7 215.61c-.4 1.33-1.02 2.62-1.81 3.8-1.75 2.59-4.3 4.55-6.84 6.35-4.33 3.07-8.85 5.89-12.89 9.38-2.7 2.34-5.17 4.97-7.45 7.73-1.95 2.36-3.79 4.84-6.02 6.94-2.25 2.12-4.89 3.84-7.74 4.77-3.47 1.13-7.13 1.08-10.47.22-2.34-.6-4.63-1.64-6.08-3.53-1.45-1.89-1.92-4.44-2.09-6.94-.3-4.42.23-8.93.71-13.42.4-3.73.77-7.46.92-11.18.27-6.77-.18-13.47-1.09-20.05-.16-1.11-.32-2.22-.23-3.35.09-1.14.47-2.32 1.27-3.2.74-.81 1.77-1.29 2.79-1.52 1.02-.24 2.06-.25 3.09-.28 2.43-.06 4.86-.21 7.25.01 1.51.13 2.99.41 4.49.55 2.51.24 5.12.12 7.64-.62 2.71-.8 5.29-2.29 8.05-2.7 1.13-.17 2.26-.15 3.36.01 1.12.15 2.24.46 3.1 1.15.66.52 1.14 1.23 1.51 1.99.56 1.14.9 2.39 1.1 3.68.17 1.14.24 2.31.53 3.41.48 1.81 1.58 3.35 2.89 4.6 1.32 1.25 2.85 2.24 4.39 3.22 1.53.97 3.07 1.93 4.7 2.73.77.38 1.56.72 2.29 1.15.74.44 1.42.97 1.91 1.67.66.95.92 2.2.72 3.43z"
          />
          <path
            id="foot_right_base"
            fill="url(#fill_foot_right_base)"
            d="M213.47 222.92c-2.26 2.68-5.4 4.45-8.53 6.05-5.33 2.71-10.86 5.1-15.87 8.37-3.36 2.19-6.46 4.76-9.36 7.53-2.48 2.37-4.83 4.9-7.61 6.91-2.81 2.03-6.05 3.5-9.48 4.01-.95.14-1.9.21-2.86.21-3.24 0-6.48-.78-9.46-2.08-2.7-1.17-5.3-2.86-6.86-5.36-1.56-2.52-1.92-5.59-1.92-8.56-.01-5.23.96-10.41 1.87-15.57.76-4.29 1.48-8.58 1.95-12.91.85-7.86.84-15.81.28-23.71-.1-1.32-.21-2.65-.01-3.96.2-1.31.74-2.62 1.74-3.48.93-.8 2.17-1.16 3.4-1.22 1.22-.07 2.44.12 3.65.3 2.85.42 5.73.74 8.52 1.48 1.76.46 3.48 1.08 5.23 1.56 2.94.79 6.01 1.17 9.02.82 3.25-.38 6.41-1.6 9.68-1.52 1.34.03 2.67.28 3.95.69 1.3.41 2.59 1 3.55 1.98.73.74 1.24 1.67 1.62 2.64.57 1.44.88 2.98 1.01 4.52.11 1.37.09 2.76.35 4.11.43 2.21 1.6 4.24 3.04 5.97 1.45 1.74 3.18 3.21 4.91 4.66 1.73 1.45 3.46 2.89 5.32 4.16.87.6 1.77 1.16 2.6 1.81.83.66 1.59 1.42 2.11 2.34.45.81.69 1.72.69 2.65 0 .52-.07 1.04-.23 1.56-.45 1.43-1.28 2.82-2.3 4.04z"
          />
          <path
            id="foot_right_layer_1"
            fill="#cd8907"
            filter="url(#blur_foot_right_layer_1)"
            clipPath="url(#clip_foot_right)"
            d="M213.21 216.12c-.53 1.33-1.28 2.58-2.22 3.67-2.07 2.42-4.93 4.01-7.78 5.44-4.88 2.44-9.92 4.58-14.5 7.52-3.06 1.97-5.9 4.28-8.55 6.78-2.26 2.13-4.41 4.41-6.95 6.21-2.57 1.83-5.53 3.14-8.65 3.6-3.8.56-7.72-.16-11.25-1.67-2.46-1.06-4.84-2.56-6.27-4.83-1.42-2.26-1.75-5.02-1.75-7.69-.02-4.71.87-9.37 1.71-14 .7-3.85 1.36-7.71 1.78-11.6.76-7.08.73-14.22.25-21.32-.08-1.19-.17-2.39.01-3.57.18-1.18.67-2.35 1.57-3.13.85-.73 1.99-1.05 3.11-1.1 1.11-.06 2.22.12 3.33.28 2.61.38 5.23.67 7.78 1.33 1.61.42 3.18.98 4.78 1.4 2.68.72 5.49 1.06 8.24.74 2.97-.34 5.85-1.44 8.83-1.37 1.23.03 2.44.26 3.61.62 1.19.37 2.37.9 3.25 1.78.66.67 1.11 1.51 1.48 2.38.53 1.29.89 2.67.91 4.07.03 1.46-.28 2.92-.09 4.37.16 1.17.66 2.28 1.3 3.28.63 1 1.4 1.91 2.17 2.81 1.48 1.75 2.96 3.53 4.82 4.87 2.11 1.53 4.62 2.43 6.8 3.85.65.43 1.28.91 1.74 1.54.78 1.06.98 2.5.54 3.74z"
          />
          <path
            id="foot_right_layer_2"
            fill="#f5c021"
            filter="url(#blur_foot_right_layer_2)"
            clipPath="url(#clip_foot_right)"
            d="M212.91 214.61c-.6 1.35-1.37 2.6-2.28 3.71-2.12 2.58-4.99 4.35-8 5.49-4.97 1.88-10.39 2.13-15.26 4.27-2.97 1.3-5.65 3.26-8.36 5.12-2.18 1.49-4.42 2.94-6.82 3.98-2.72 1.19-5.6 1.85-8.5 2.32-1.84.29-3.71.51-5.57.41-1.86-.1-3.72-.54-5.37-1.49-1.24-.72-2.36-1.75-3.03-3.1-.73-1.49-.86-3.24-.85-4.94.05-4.5 1.02-8.96.99-13.47-.03-3.93-.81-7.8-1.03-11.72-.43-7.54 1.19-15.2-.24-22.59-.22-1.19-.53-2.37-.52-3.58.01-.6.1-1.21.31-1.77.22-.55.56-1.06 1.01-1.42.39-.29.84-.47 1.31-.56.46-.08.94-.06 1.41.01.93.15 1.82.51 2.73.78 2.6.78 5.35.76 8 1.35 1.66.36 3.26.97 4.91 1.41 2.75.76 5.63 1.08 8.46.75 3.04-.36 6.01-1.46 9.07-1.38 1.26.03 2.5.26 3.71.62s2.42.87 3.34 1.8c.65.67 1.13 1.52 1.51 2.4.57 1.29.96 2.69.95 4.11-.01.74-.12 1.47-.19 2.21-.06.74-.08 1.49.09 2.2.18.72.55 1.37.97 1.96.42.59.9 1.12 1.34 1.7 1.22 1.61 2.1 3.49 3.05 5.3.95 1.81 2.02 3.6 3.53 4.91 2.05 1.77 4.7 2.48 6.99 3.89.67.41 1.31.89 1.78 1.55.38.52.63 1.15.73 1.81.09.65.03 1.34-.17 1.96z"
          />
          <path
            id="foot_right_glare"
            fill="url(#fill_foot_right_glare)"
            filter="url(#blur_foot_right_glare)"
            clipPath="url(#clip_foot_right)"
            d="M148.08 181.58c2.82-.76 5.22 1.38 7.27 2.99 1.32 1.13 3.24.85 4.86.9 2.69-.09 5.36.45 8.05.12 5.3-.45 10.49-1.75 15.81-1.97 2.54-.16 5.4-.31 7.59 1.17.89.62 2.2 3.23 3.07 2.25-.36-2.74-2.39-5.39-5.11-6.12-2.14-.34-4.3.25-6.46.06-6.39-.15-12.75-1.34-19.16-1-4.46.04-8.91-.17-13.37-.34-1.75-.36-2.37 1.19-3.32 1.79.25.19.34.25.77.15z"
          />
        </g>
      </g>
      <g id="wing_tip_right">
        <g id="wing_tip_right_shadow">
          <path
            id="wing_tip_right_shadow_lower"
            opacity=".35"
            fill="url(#fill_wing_tip_right_shadow_lower)"
            filter="url(#blur_wing_tip_right_shadow_lower)"
            clipPath="url(#clip_foot_right)"
            d="M185.49 187.61c-.48-.95-1.36-1.66-2.35-2.07-.98-.41-2.06-.55-3.13-.54-2.13.02-4.25.57-6.38.39-1.79-.16-3.49-.83-5.24-1.26-1.81-.44-3.73-.61-5.52-.12-1.92.52-3.61 1.81-4.67 3.49-.94 1.48-1.38 3.23-1.52 4.98-.14 1.75.01 3.5.19 5.25.12 1.26.27 2.52.57 3.75.31 1.23.78 2.43 1.52 3.46 1.07 1.48 2.66 2.54 4.37 3.17 2.8 1.03 5.98.98 8.73-.15 4.88-2.12 9.01-5.92 11.52-10.6.91-1.68 1.61-3.47 2.06-5.31.18-.74.32-1.49.32-2.25.01-.75-.12-1.52-.47-2.19z"
          />
          <path
            id="wing_tip_right_shadow_upper"
            opacity=".35"
            fill="url(#fill_wing_tip_right_shadow_upper)"
            filter="url(#blur_wing_tip_right_shadow_upper)"
            clipPath="url(#clip_foot_right)"
            d="M185.49 184.89c-.48-.69-1.36-1.2-2.35-1.5-.98-.3-2.06-.39-3.13-.39-2.13.02-4.25.42-6.38.28-1.79-.11-3.49-.6-5.24-.9-1.81-.32-3.73-.45-5.52-.09-1.92.37-3.61 1.3-4.67 2.52-.94 1.07-1.38 2.34-1.52 3.6-.14 1.26.01 2.53.19 3.79.12.91.27 1.83.57 2.72.31.89.78 1.76 1.52 2.5 1.07 1.07 2.66 1.83 4.37 2.29 2.8.75 5.98.71 8.73-.11 4.88-1.53 9.01-4.28 11.52-7.66.91-1.22 1.61-2.51 2.06-3.84.18-.54.32-1.08.32-1.62.01-.55-.12-1.11-.47-1.59z"
          />
        </g>
        <path
          id="wing_tip_right_base"
          fill="#020204"
          d="M189.55 178.72c-.35-.95-.97-1.79-1.72-2.47-.75-.68-1.64-1.2-2.57-1.6-1.86-.79-3.89-1.09-5.89-1.46-1.87-.35-3.74-.78-5.62-1.1-1.96-.33-3.98-.55-5.92-.11-1.69.38-3.26 1.26-4.54 2.43-1.28 1.17-2.28 2.63-3 4.21-1.27 2.79-1.67 5.92-1.43 8.97.18 2.27.76 4.61 2.25 6.32 1.21 1.39 2.92 2.26 4.68 2.78 3.04.9 6.35.85 9.36-.13a24.7 24.7 0 0 0 12.35-9.29c.98-1.43 1.82-2.98 2.2-4.66.29-1.28.3-2.66-.15-3.89z"
        />
        <g id="wing_tip_right_glare">
          <defs>
            <path
              id="path_wing_tip_right_glare"
              d="M168.89 171.07c-.47.03-.93.08-1.4.17-2.99.53-5.73 2.42-7.27 5.03-1.09 1.85-1.58 4.03-1.43 6.17.07-1.5.46-2.97 1.19-4.28 1.23-2.23 3.47-3.91 5.98-4.37 1.54-.28 3.13-.11 4.68.08 1.5.19 3 .39 4.47.7 2.28.5 4.53 1.26 6.44 2.59.44.31.86.66 1.21 1.08.35.41.62.89.73 1.42.15.78-.07 1.6-.46 2.29-.39.7-.92 1.3-1.48 1.86-.46.46-.94.89-1.43 1.32 2.21-.43 4.44-1.03 6.28-2.31.77-.55 1.48-1.2 1.94-2.02.46-.83.65-1.83.43-2.75-.16-.62-.5-1.19-.92-1.67-.42-.48-.93-.87-1.45-1.24a17.266 17.266 0 0 0-7.81-2.99c-1.8-.33-3.61-.61-5.42-.83-1.41-.18-2.86-.33-4.28-.25z"
            />
          </defs>
          <use
            id="wing_tip_right_glare_1"
            href="#path_wing_tip_right_glare"
            xlinkHref="#path_wing_tip_right_glare"
            fill="url(#fill_wing_tip_right_glare_1)"
            filter="url(#blur_wing_tip_right_glare)"
            clipPath="url(#clip_wing_tip_right)"
          />
          <use
            id="wing_tip_right_glare_2"
            href="#path_wing_tip_right_glare"
            xlinkHref="#path_wing_tip_right_glare"
            fill="url(#fill_wing_tip_right_glare_2)"
            filter="url(#blur_wing_tip_right_glare)"
            clipPath="url(#clip_wing_tip_right)"
          />
        </g>
      </g>
      <g id="face">
        <g id="eyes">
          <g id="eye_left">
            <path
              id="eyeball_left"
              fill="url(#fill_eyeball_left)"
              d="M84.45 38.28c-1.53.08-3 .79-4.12 1.84-1.13 1.05-1.92 2.43-2.41 3.88-.97 2.92-.75 6.08-.53 9.15.2 2.77.41 5.6 1.45 8.18.52 1.3 1.25 2.51 2.22 3.51.97.99 2.2 1.76 3.55 2.09 1.26.32 2.62.26 3.86-.13 1.25-.4 2.38-1.11 3.32-2.02 1.36-1.33 2.27-3.07 2.8-4.9.53-1.83.68-3.75.65-5.66-.04-2.38-.35-4.77-1.09-7.03-.75-2.26-1.94-4.4-3.6-6.11-.8-.83-1.72-1.55-2.75-2.06-1.04-.51-2.2-.8-3.35-.74z"
            />
            <g id="pupil_left">
              <path
                id="pupil_left_base"
                fill="#020204"
                d="M80.75 50.99c-.32 1.94-.33 3.97.33 5.81.44 1.22 1.17 2.33 2.05 3.28.57.62 1.23 1.18 1.99 1.55.77.37 1.65.52 2.48.32.76-.19 1.42-.68 1.91-1.29s.82-1.34 1.05-2.09c.69-2.21.58-4.62-.11-6.83-.49-1.61-1.32-3.16-2.6-4.24-.62-.52-1.34-.93-2.12-1.11-.78-.19-1.63-.14-2.36.19-.81.37-1.44 1.07-1.85 1.86-.41.79-.62 1.67-.77 2.55z"
              />
              <path
                id="pupil_left_glare"
                fill="url(#fill_pupil_left_glare)"
                filter="url(#blur_pupil_left_glare)"
                clipPath="url(#clip_pupil_left)"
                d="M84.84 49.59c.21.55.91.75 1.3 1.19.37.42.76.87.97 1.4.39 1.01-.39 2.51.43 3.23.25.22.77.23 1.02 0 .99-.9.77-2.71.38-3.99-.36-1.15-1.23-2.25-2.31-2.8-.5-.26-1.25-.47-1.68-.11-.27.24-.24.74-.11 1.08z"
              />
            </g>
            <path
              id="eyelid_left"
              fill="url(#fill_eyelid_left)"
              clipPath="url(#clip_eye_left)"
              d="M81.14 44.46c2.32-1.38 5.13-1.7 7.82-1.45 2.68.26 5.27 1.04 7.87 1.75 1.91.52 3.84 1 5.63 1.84 1.78.84 3.44 2.08 4.43 3.8.16.27.29.56.46.83.17.27.37.52.62.71.25.19.57.32.88.3.16-.01.32-.05.45-.13.14-.08.26-.2.33-.34.08-.16.11-.35.1-.53-.01-.18-.05-.36-.1-.54-.65-2.37-2.19-4.38-3.35-6.55-.7-1.3-1.28-2.66-1.98-3.96-2.43-4.45-6.42-7.94-10.95-10.21-4.53-2.27-9.59-3.36-14.65-3.65-5.86-.35-11.73.35-17.51 1.37-2.51.44-5.06.96-7.27 2.21-1.11.62-2.13 1.42-2.92 2.42-.8.99-1.36 2.18-1.55 3.44-.17 1.22.01 2.47.44 3.62.42 1.15 1.08 2.2 1.86 3.15 1.54 1.91 3.53 3.39 5.36 5.03 1.83 1.63 3.52 3.44 5.57 4.79 1.02.68 2.13 1.24 3.31 1.57 1.18.33 2.44.42 3.64.17 1.24-.25 2.4-.86 3.41-1.64 1.01-.77 1.88-1.7 2.71-2.66 1.66-1.93 3.21-4.04 5.39-5.34z"
            />
            <path
              id="eyebrow_left"
              fill="url(#fill_eyebrow_left)"
              filter="url(#blur_eyebrow_left)"
              d="M90.77 36.57c2.16 2.02 3.76 4.52 4.85 7.16-.48-2.91-1.23-5.26-3.13-7.16-1.16-1.09-2.49-2.05-3.98-2.72-1.32-.59-2.77-.96-3.61-.97-.83-.02-1.03 0-1.2.01-.18.01-.31.01.23.08.54.06 1.75.39 3.05.97 1.3.58 2.62 1.54 3.79 2.63z"
            />
          </g>
          <g id="eye_right">
            <path
              id="eyeball_right"
              fill="url(#fill_eyeball_right)"
              d="M111.61 38.28c-2.39 1.65-4.4 3.94-5.38 6.68-1.24 3.45-.77 7.31.43 10.77 1.22 3.55 3.27 6.93 6.36 9.06 1.54 1.07 3.33 1.8 5.19 2.02 1.87.22 3.8-.09 5.47-.95 2.02-1.06 3.57-2.91 4.53-4.98.96-2.08 1.37-4.37 1.5-6.66.16-2.9-.12-5.86-1.08-8.61-1.04-2.99-2.92-5.75-5.58-7.47-1.32-.86-2.83-1.45-4.4-1.67a9.405 9.405 0 0 0-4.67.52c-.84.33-1.62.78-2.37 1.29z"
            />
            <g id="pupil_right">
              <path
                id="pupil_right_base"
                fill="#020204"
                d="M117.14 45.52c-.9.06-1.78.37-2.55.85-.76.48-1.41 1.13-1.92 1.88-1.03 1.49-1.48 3.31-1.55 5.12-.05 1.35.1 2.72.55 4 .45 1.28 1.2 2.47 2.25 3.33 1.07.89 2.42 1.42 3.81 1.49 1.39.06 2.79-.34 3.93-1.13.91-.63 1.64-1.5 2.16-2.48.52-.97.84-2.05.98-3.15.25-1.93-.03-3.95-.93-5.69-.89-1.74-2.41-3.17-4.24-3.84-.8-.29-1.65-.44-2.49-.38z"
              />
              <path
                id="pupil_right_glare"
                fill="url(#fill_pupil_right_glare)"
                filter="url(#blur_pupil_right_glare)"
                clipPath="url(#clip_pupil_right)"
                d="M122.71 53.36c1-1-.71-3.65-2.05-4.74-.97-.78-3.78-1.61-3.66-.75.12.85 1.39 1.95 2.23 2.79 1.05 1.03 3 3.18 3.48 2.7z"
              />
            </g>
            <path
              id="eyelid_right"
              fill="url(#fill_eyelid_right)"
              clipPath="url(#clip_eye_right)"
              d="M102.56 47.01c2.06-1.71 4.45-3.01 7-3.8 5.25-1.62 11.2-.98 15.84 1.97 1.6 1.01 3.03 2.27 4.52 3.45 1.48 1.17 3.06 2.27 4.85 2.9.97.34 2 .54 3.02.43.92-.09 1.81-.44 2.57-.96.76-.53 1.4-1.23 1.88-2.02.96-1.58 1.27-3.5 1.1-5.34-.33-3.69-2.41-6.94-4.15-10.21-.55-1.02-1.07-2.06-1.73-3.01-2.01-2.93-5.23-4.86-8.6-5.99-3.37-1.13-6.93-1.54-10.46-1.98-1.58-.2-3.17-.41-4.74-.22-1.81.22-3.51.95-5.28 1.4-.84.22-1.69.37-2.52.61-.83.24-1.65.57-2.33 1.11-.98.79-1.6 1.98-1.87 3.21-.27 1.24-.21 2.52-.01 3.77.39 2.5 1.33 4.93 1.24 7.46-.06 1.73-.61 3.44-.54 5.17.02.51.12 1.55.21 2.05z"
            />
            <path
              id="eyebrow_right"
              fill="url(#fill_eyebrow_right)"
              filter="url(#blur_eyebrow_right)"
              d="M119.93 31.18c-.41.52-.78 1.08-1.07 1.7 1.85.4 3.61 1.16 5.19 2.21 3.06 2.03 5.38 4.99 7.01 8.29.38-.42.72-.87 1.02-1.37-1.64-3.44-4-6.55-7.16-8.65-1.52-1-3.21-1.77-4.99-2.18z"
            />
          </g>
        </g>
        <g id="beak">
          <g id="beak_shadow">
            <path
              id="beak_shadow_lower"
              fill="#000"
              fillOpacity=".259"
              filter="url(#blur_beak_shadow_lower)"
              clipPath="url(#clip_body)"
              d="M81.12 89.33c1.47 4.26 4.42 7.89 7.92 10.72 1.16.95 2.39 1.82 3.76 2.43 1.36.62 2.87.97 4.36.84 1.46-.12 2.85-.7 4.13-1.42 1.28-.72 2.46-1.59 3.7-2.37 2.12-1.35 4.39-2.44 6.6-3.64 2.65-1.45 5.23-3.1 7.46-5.14 1.03-.93 1.98-1.95 3.11-2.75 1.13-.81 2.49-1.39 3.87-1.29 1.04.07 2.01.51 3.03.73.51.11 1.03.16 1.55.08.51-.08 1.01-.29 1.37-.67.44-.46.64-1.12.61-1.76-.02-.63-.24-1.25-.54-1.81-.59-1.13-1.49-2.1-1.89-3.31-.36-1.08-.29-2.24-.26-3.37.03-1.14.01-2.32-.51-3.33-.4-.76-1.07-1.37-1.83-1.77-.76-.41-1.62-.62-2.48-.7-1.72-.16-3.44.18-5.17.27-2.28.13-4.58-.15-6.87-.02-2.85.18-5.65 1-8.51 1.01-3.26.01-6.52-1.06-9.74-.55-1.39.22-2.71.72-4.03 1.16-1.33.45-2.7.84-4.1.82-1.59-.03-3.13-.58-4.72-.69-.79-.06-1.6 0-2.35.28-.74.28-1.41.79-1.78 1.5-.21.4-.31.86-.33 1.31-.02.46.04.91.15 1.36.22.88.63 1.71.96 2.55 1.2 3.07 1.46 6.42 2.53 9.53z"
            />
            <path
              id="beak_shadow_upper"
              opacity=".3"
              fill="#000"
              filter="url(#blur_beak_shadow_upper)"
              clipPath="url(#clip_body)"
              d="M77.03 77.2c2.85 1.76 5.41 3.93 7.56 6.39 1.99 2.29 3.68 4.89 6.29 6.58 1.83 1.2 4.04 1.87 6.28 2.08 2.63.24 5.29-.15 7.83-.84 2.35-.63 4.62-1.53 6.7-2.71 3.97-2.25 7.28-5.55 11.65-7.03.95-.33 1.94-.56 2.86-.96.92-.39 1.79-.99 2.23-1.83.42-.82.4-1.75.54-2.64.15-.96.48-1.88.66-2.83.18-.95.2-1.96-.24-2.83-.37-.72-1.04-1.29-1.81-1.66-.77-.36-1.64-.52-2.51-.56-1.72-.08-3.43.33-5.16.47-2.28.19-4.58-.08-6.87-.01-2.85.08-5.66.67-8.51.8-3.25.14-6.49-.34-9.74-.44-1.41-.05-2.83-.03-4.21.2-1.39.22-2.75.65-3.92 1.37-1.14.69-2.07 1.64-3.11 2.45-.52.41-1.08.78-1.68 1.07-.61.28-1.28.48-1.96.51-.35.01-.71-.01-1.05.04-.59.08-1.13.39-1.47.83-.34.45-.47 1.02-.36 1.55z"
            />
          </g>
          <path
            id="beak_base"
            fill="url(#fill_beak_base)"
            d="M91.66 58.53c1.53-1.71 2.57-3.8 4.03-5.56.73-.88 1.58-1.69 2.57-2.26.99-.57 2.15-.89 3.29-.79 1.27.11 2.46.74 3.39 1.61.93.87 1.62 1.97 2.17 3.12.53 1.11.95 2.28 1.71 3.24.81 1.02 1.94 1.71 2.97 2.52.51.4 1.01.83 1.41 1.34.41.51.72 1.1.86 1.74.13.65.06 1.33-.16 1.95-.23.62-.61 1.18-1.09 1.64-.95.92-2.25 1.42-3.56 1.6-2.62.37-5.27-.41-7.92-.34-2.67.08-5.29 1.02-7.97.93-1.33-.05-2.69-.38-3.79-1.14-.55-.39-1.03-.88-1.38-1.45a4.1 4.1 0 0 1-.58-1.9c-.02-.64.13-1.28.39-1.86.25-.59.61-1.12 1.01-1.62.81-.99 1.8-1.81 2.65-2.77z"
          />
          <g id="mandible_lower">
            <path
              id="mandible_lower_base"
              fill="url(#fill_mandible_lower_base)"
              d="M77.14 75.05c.06.26.15.5.28.73.23.38.57.69.93.95.36.27.75.49 1.13.72 2.01 1.27 3.65 3.04 5.11 4.92 1.95 2.52 3.68 5.31 6.29 7.14 1.84 1.3 4.04 2.03 6.28 2.26 2.63.26 5.29-.16 7.83-.91 2.35-.69 4.62-1.66 6.7-2.95 3.97-2.44 7.28-6.02 11.65-7.63.95-.35 1.94-.6 2.86-1.03.92-.44 1.79-1.08 2.23-2 .42-.88.4-1.9.54-2.87.15-1.03.48-2.03.66-3.06.18-1.03.2-2.13-.24-3.08-.37-.78-1.04-1.4-1.81-1.79-.77-.4-1.64-.58-2.51-.62-1.72-.08-3.43.36-5.16.52-2.28.21-4.58-.09-6.87-.02-2.85.09-5.66.73-8.51.87-3.25.15-6.49-.35-9.74-.48-1.41-.06-2.83-.04-4.22.2-1.39.23-2.75.71-3.91 1.51-1.13.78-2.03 1.84-3.07 2.74-.52.45-1.08.86-1.7 1.16-.61.3-1.29.49-1.98.47-.35-.01-.72-.06-1.05.04-.21.07-.4.2-.56.35-.16.16-.29.34-.41.52-.29.42-.54.87-.75 1.34z"
            />
            <path
              id="mandible_lower_glare"
              fill="#d9b30d"
              filter="url(#blur_mandible_lower_glare)"
              clipPath="url(#clip_mandible_lower)"
              d="M89.9 78.56a5.77 5.77 0 0 0 .56 4.11c.68 1.24 1.84 2.2 3.19 2.65 1.7.57 3.62.29 5.21-.54.93-.48 1.77-1.16 2.3-2.06.27-.44.46-.94.53-1.46.06-.51.02-1.05-.16-1.54-.2-.53-.56-1-.99-1.37a4.48 4.48 0 0 0-1.5-.82c-1.08-.36-2.77-.66-3.91-.68-2.02-.04-4.9.34-5.23 1.71z"
            />
          </g>
          <g id="mandible_upper">
            <path
              id="mandible_upper_shadow"
              fill="#604405"
              filter="url(#blur_mandible_upper_shadow)"
              clipPath="url(#clip_mandible_lower)"
              d="M84.31 67.86c-1.16.68-2.27 1.43-3.36 2.2-.57.41-1.15.84-1.45 1.47-.21.44-.26.94-.27 1.43 0 .5.03.99-.04 1.48-.04.33-.13.66-.14.99-.01.17 0 .34.04.5.05.16.13.32.24.44.15.16.35.26.56.32.21.06.42.09.64.14 1.01.24 1.89.86 2.66 1.56.77.69 1.47 1.48 2.28 2.13 2.18 1.78 5.07 2.52 7.89 2.56 2.82.05 5.61-.54 8.36-1.16 2.16-.49 4.32-.99 6.39-1.76 3.2-1.18 6.16-2.96 8.72-5.19 1.17-1.01 2.26-2.12 3.57-2.94 1.15-.73 2.44-1.21 3.62-1.9.11-.06.21-.13.3-.2.1-.08.18-.18.24-.28.09-.19.09-.42.03-.62s-.18-.38-.31-.55c-.15-.18-.31-.34-.49-.5-1.23-1.05-2.89-1.43-4.51-1.56-1.61-.12-3.24-.03-4.83-.3-1.5-.25-2.92-.81-4.37-1.27-1.52-.49-3.07-.87-4.64-1.13-3.71-.61-7.52-.49-11.19.27-3.49.73-6.87 2.05-9.94 3.87z"
            />
            <path
              id="mandible_upper_base"
              fill="url(#fill_mandible_upper_base)"
              d="M83.94 63.95a20.75 20.75 0 0 0-4.43 4.04c-.72.89-1.38 1.86-1.74 2.94-.29.86-.39 1.76-.57 2.65-.07.33-.15.66-.14 1 0 .16.02.33.07.5.05.16.14.31.25.43.2.2.47.31.74.37.28.05.56.06.84.09 1.25.15 2.4.75 3.44 1.47 1.04.71 2 1.55 3.07 2.22 2.35 1.49 5.16 2.15 7.95 2.26 2.78.11 5.56-.31 8.3-.86 2.17-.43 4.33-.95 6.39-1.76 3.16-1.25 6.01-3.16 8.72-5.19 1.24-.92 2.46-1.87 3.57-2.94.37-.37.74-.74 1.14-1.08.4-.33.85-.62 1.35-.78.76-.24 1.58-.17 2.37-.04.59.1 1.18.23 1.78.21.3-.02.6-.07.88-.18.28-.11.54-.28.73-.52.25-.3.38-.7.38-1.09 0-.4-.12-.79-.32-1.13-.4-.68-1.09-1.14-1.81-1.46-.99-.44-2.06-.65-3.11-.91-3.23-.78-6.37-1.93-9.34-3.41-1.48-.73-2.92-1.54-4.37-2.32-1.5-.8-3.02-1.57-4.64-2.07-3.64-1.1-7.6-.74-11.19.51a23.88 23.88 0 0 0-10.31 7.05z"
            />
            <path
              id="mandible_upper_glare"
              fill="#f6da4a"
              filter="url(#blur_mandible_upper_glare)"
              clipPath="url(#clip_mandible_upper)"
              d="M109.45 64.75c-.2-.24-.48-.42-.78-.51-.3-.09-.62-.09-.93-.04-.62.11-1.18.44-1.7.8-1.47 1.01-2.77 2.26-3.91 3.64-1.5 1.83-2.74 3.94-3.16 6.27-.07.39-.11.8-.07 1.19.05.4.2.79.49 1.07.24.25.58.4.92.45.35.05.71 0 1.04-.11.66-.22 1.21-.69 1.74-1.15 2.87-2.58 5.47-5.66 6.51-9.38.1-.37.19-.75.19-1.14 0-.39-.1-.78-.34-1.09z"
            />
            <path
              id="naris_left"
              opacity=".8"
              fill="url(#fill_naris_left)"
              filter="url(#blur_naris_left)"
              d="M92.72 59.06c-.77-.25-2.03 1.1-1.62 1.79.11.19.46.43.7.3.35-.19.64-.89 1.02-1.16.25-.18.2-.84-.1-.93z"
            />
            <path
              id="naris_right"
              opacity=".8"
              fill="url(#fill_naris_right)"
              filter="url(#blur_naris_right)"
              d="M102.56 59.42c.2.64 1.23.53 1.83.84.52.27.94.86 1.53.88.56.01 1.44-.2 1.51-.76.09-.73-.98-1.2-1.67-1.47-.89-.34-2.03-.52-2.86-.06-.19.11-.4.36-.34.57z"
            />
          </g>
          <path
            id="beak_corner"
            fill="url(#fill_beak_corner)"
            filter="url(#blur_beak_corner)"
            clipPath="url(#clip_beak)"
            d="M129.27 69.15a2.42 3.1 16.94 0 1-2.81 3.04 2.42 3.1 16.94 0 1-2.12-3.04 2.42 3.1 16.94 0 1 2.81-3.05 2.42 3.1 16.94 0 1 2.12 3.05z"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default Linux;
