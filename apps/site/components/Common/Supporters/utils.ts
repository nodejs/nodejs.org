import type { Supporter } from '@/types';

export const randomSupporterList = (
  supporters: Array<Supporter>,
  pick: number
) =>
  supporters
    .sort(() => 0.5 - Math.random())
    .slice(0, pick)
    .sort((a, b) => b.threshold - a.threshold);
