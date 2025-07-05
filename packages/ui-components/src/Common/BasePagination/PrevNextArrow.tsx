import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import type { FC, SVGAttributes } from 'react';

type PrevNextArrowProps = {
  type: 'previous' | 'next';
} & SVGAttributes<SVGSVGElement>;

const PrevNextArrow: FC<PrevNextArrowProps> = ({ type, ...extra }) => {
  const ChevronComponent =
    type === 'previous' ? ChevronLeftIcon : ChevronRightIcon;

  return <ChevronComponent {...extra} />;
};

export default PrevNextArrow;
