import { useMemo } from 'react';
import useSWR from 'swr';
import { detectOS } from '../util/detectOS';
import { downloadUrlByOS } from '../util/downloadUrlByOS';

import { getBitness } from '../util/getBitness';
import { UserAgentBitness } from '../constants/swr';

type UseDownloadLinkArgs = {
  version: string;
};

export const useDownloadLink = ({ version }: UseDownloadLinkArgs) => {
  const { data: bitness } = useSWR(UserAgentBitness, getBitness);
  const downloadLink = useMemo(
    () =>
      downloadUrlByOS({
        userAgent: navigator?.userAgent,
        userOS: detectOS(),
        version,
        bitness,
      }),
    [bitness, version]
  );

  return downloadLink;
};
