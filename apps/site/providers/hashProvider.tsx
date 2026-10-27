'use client';

import { HashContext } from '@node-core/ui-components/contexts/HashContext';

import useHash from '#site/hooks/useHash';

import type { FC, PropsWithChildren } from 'react';

export const HashProvider: FC<PropsWithChildren> = ({ children }) => {
  const [hash, setHash] = useHash();

  return <HashContext value={{ hash, setHash }}>{children}</HashContext>;
};
