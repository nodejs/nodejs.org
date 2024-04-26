'use client';

import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { FC, PropsWithChildren } from 'react';
import { useContext, useRef } from 'react';

const FrozenRouter: FC<PropsWithChildren> = props => {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
};

export default FrozenRouter;
