'use client';

import type { PropsWithChildren, FC } from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import reducer, { getActions, releaseState } from '@/reducers/releaseReducer';
import type { NodeRelease } from '@/types';
import type * as Types from '@/types/release';

export const ReleasesContext = createContext<Types.ReleasesContextType>({
  releases: [],
  snippets: [],
});

export const ReleaseContext = createContext<Types.ReleaseContextType>({
  ...releaseState,
  ...getActions(() => {}),
  release: {} as NodeRelease,
});

export const ReleasesProvider: FC<
  PropsWithChildren<Types.ReleasesProviderProps>
> = ({ children, releases, snippets }) => (
  <ReleasesContext.Provider value={{ releases, snippets }}>
    {children}
  </ReleasesContext.Provider>
);

export const ReleaseProvider: FC<
  PropsWithChildren<Types.ReleaseProviderProps>
> = ({ children, initialRelease }) => {
  const { releases } = useContext(ReleasesContext);
  const parentProvider = useContext(ReleaseContext);

  const [state, dispatch] = useReducer(reducer, {
    ...releaseState,
    // The initialRelease can only be `undefined` if a parent provider exists
    // This is an intentional design flaw, forcing a context to exist.
    // Note that if there is no parent provider the initial state for said provider will be used
    version: initialRelease?.versionWithPrefix || parentProvider?.version,
  });

  const actions = useMemo(() => getActions(dispatch), [dispatch]);

  useEffect(() => {
    // This allows us to nest one Release Provider unto another (whenever possible)
    // and to actually set the version of a given provider based on a parent provider
    // Which is super handy for the Download page to reuse other current Node.js states
    if (parentProvider.version && parentProvider.version !== state.version) {
      actions.setVersion(parentProvider.version);
    }
    // We should only react if the parentProvider changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, parentProvider]);

  const release = useMemo(
    () => releases.find(r => r.versionWithPrefix === state.version)!,
    // Memoizes the release based on the version
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.version]
  );

  return (
    <ReleaseContext.Provider value={{ ...state, ...actions, release }}>
      {children}
    </ReleaseContext.Provider>
  );
};
