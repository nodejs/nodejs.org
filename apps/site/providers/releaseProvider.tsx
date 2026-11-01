'use client';

import { createContext, use, useEffect, useMemo, useReducer } from 'react';

import { DetectedOSContext } from '#site/providers/detectedOSProvider';
import reducer, {
  getActions,
  releaseState,
} from '#site/reducers/releaseReducer';
import { getUserPlatform } from '#site/util/userAgent';

import type { NodeRelease } from '#site/types';
import type * as Types from '#site/types/release';
import type { PropsWithChildren, FC } from 'react';

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
  <ReleasesContext value={{ releases, snippets }}>{children}</ReleasesContext>
);

export const ReleaseProvider: FC<
  PropsWithChildren<Types.ReleaseProviderProps>
> = ({ children, initialRelease }) => {
  const { releases } = use(ReleasesContext);
  const parentProvider = use(ReleaseContext);
  const { os, architecture, bitness } = use(DetectedOSContext);

  const [state, dispatch] = useReducer(reducer, {
    ...releaseState,
    // The initialRelease can only be `undefined` if a parent provider exists
    // This is an intentional design flaw, forcing a context to exist.
    // Note that if there is no parent provider the initial state for said provider will be used
    version: initialRelease?.versionWithPrefix || parentProvider?.version,
  });

  const actions = useMemo(() => getActions(dispatch), [dispatch]);

  // The detected OS and platform seed the selection once they are known
  useEffect(() => {
    if (os !== 'LOADING') {
      actions.setOS(os);
    }
  }, [actions, os]);

  useEffect(() => {
    if (architecture && bitness) {
      actions.setPlatform(getUserPlatform(architecture, bitness));
    }
  }, [actions, architecture, bitness]);

  useEffect(() => {
    // This allows us to nest one Release Provider unto another (whenever possible)
    // and to actually set the version of a given provider based on a parent provider
    // Which is super handy for the Download page to reuse other current Node.js states
    if (parentProvider.version && parentProvider.version !== state.version) {
      actions.setVersion(parentProvider.version);
    }
    // We should only react if the parentProvider changes
    // eslint-disable-next-line @eslint-react/exhaustive-deps
  }, [actions, parentProvider]);

  const release = useMemo(
    () => releases.find(r => r.versionWithPrefix === state.version)!,
    // Memoizes the release based on the version
    // eslint-disable-next-line @eslint-react/exhaustive-deps
    [state.version]
  );

  return (
    <ReleaseContext value={{ ...state, ...actions, release }}>
      {children}
    </ReleaseContext>
  );
};
