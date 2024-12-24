'use client';

import type { Dispatch, PropsWithChildren, FC } from 'react';
import { createContext, useMemo, useReducer } from 'react';

import type { DownloadSnippet, NodeRelease } from '@/types';
import type {
  ReleaseDispatchActions,
  ReleaseAction,
  ReleaseContextType,
  ReleaseProviderProps,
  ReleaseState,
} from '@/types/release';

const initialState: ReleaseState = {
  os: 'LOADING',
  bitness: '',
  platform: 'NVM',
  version: '',
};

const createDispatchActions = (
  dispatch: Dispatch<ReleaseAction>
): ReleaseDispatchActions => ({
  setVersion: payload => dispatch({ type: 'SET_VERSION', payload }),
  setOS: payload => dispatch({ type: 'SET_OS', payload }),
  setBitness: payload => dispatch({ type: 'SET_BITNESS', payload }),
  setPlatform: payload => dispatch({ type: 'SET_PLATFORM', payload }),
});

export const ReleaseContext = createContext<ReleaseContextType>({
  ...initialState,
  ...createDispatchActions(() => {}),
  releases: [],
  snippets: [],
  release: {} as NodeRelease,
  snippet: {} as DownloadSnippet,
});

export const ReleaseProvider: FC<PropsWithChildren<ReleaseProviderProps>> = ({
  children,
  releases,
  snippets,
  initialRelease,
}) => {
  const releaseReducer = (state: ReleaseState, action: ReleaseAction) => {
    switch (action.type) {
      case 'SET_VERSION':
        return { ...state, version: action.payload };
      case 'SET_OS':
        return { ...state, os: action.payload };
      case 'SET_BITNESS':
        return { ...state, bitness: action.payload };
      case 'SET_PLATFORM':
        return { ...state, platform: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(releaseReducer, {
    ...initialState,
    version: initialRelease.versionWithPrefix,
  });

  const actions = useMemo(() => createDispatchActions(dispatch), [dispatch]);

  const releaseFromVersion = useMemo(
    () => releases.find(r => r.versionWithPrefix === state.version)!,
    // Memoizes the release based on the version
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.version]
  );

  const snippetFromPlatform = useMemo(
    () => snippets.find(s => s.name === state.platform.toLowerCase())!,
    // Memoizes the snippet based on the platform
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.platform]
  );

  const providerContext = {
    ...state,
    ...actions,
    releases,
    snippets,
    release: releaseFromVersion,
    snippet: snippetFromPlatform,
  };

  return (
    <ReleaseContext.Provider value={providerContext}>
      {children}
    </ReleaseContext.Provider>
  );
};
