import { useMemo } from 'react';
import useSWR from 'swr';
import { UserAgentDetectOS } from '../constants/swr';
import { detectOS } from '../util/detectOS';
import { getBitness } from '../util/getBitness';

const fetcher = async () => {
  const userAgent = navigator?.userAgent;

  return {
    os: detectOS(),
    bitness:
      (await getBitness()) === '64' ||
      userAgent?.includes('WOW64') ||
      userAgent?.includes('Win64')
        ? '64'
        : '86',
  };
};

export const useDetectOS = () => {
  const { data } = useSWR(UserAgentDetectOS, fetcher);

  return useMemo(() => {
    return {
      os: data?.os || 'OTHER',
      bitness: data?.bitness || '86',
    };
  }, [data]);
};
