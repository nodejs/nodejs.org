'use client';

import type { Dispatch, PropsWithChildren, FC } from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import type {
  ReleaseDispatchActions,
  ReleaseAction,
  ReleaseContextType,
  ReleaseProviderProps,
  ReleaseState,
} from '@/types/release';
import type { NodeRelease } from '@/types/releases';
import type { UserOS } from '@/types/userOS';

const releaseReducer = (
  state: ReleaseState,
  action: ReleaseAction
): ReleaseState => {
  switch (action.type) {
    case 'SET_VERSION':
      return {
        ...state,
        version: action.payload,
        release:
          state.releases.find(
            ({ versionWithPrefix }) => versionWithPrefix === action.payload
          ) || ({} as NodeRelease),
      };
    case 'SET_OS':
      return { ...state, os: action.payload };
    case 'SET_BITNESS':
      return { ...state, bitness: action.payload };
    case 'SET_PLATFORM':
      return { ...state, platform: action.payload };
    case 'SET_RELEASES':
      return { ...state, releases: action.payload };
    default:
      return state;
  }
};

const initialState: ReleaseState = {
  releases: [],
  version: '',
  os: 'OTHER',
  bitness: '',
  platform: '',
  release: {} as NodeRelease,
};

const createDispatchActions = (
  dispatch: Dispatch<ReleaseAction>
): ReleaseDispatchActions => ({
  setVersion: version => dispatch({ type: 'SET_VERSION', payload: version }),
  setOs: (os: UserOS) => dispatch({ type: 'SET_OS', payload: os }),
  setBitness: bitness => dispatch({ type: 'SET_BITNESS', payload: bitness }),
  setPlatform: platform =>
    dispatch({ type: 'SET_PLATFORM', payload: platform }),
  setReleases: releases =>
    dispatch({ type: 'SET_RELEASES', payload: releases }),
});

const ReleaseContext = createContext<ReleaseContextType>({
  state: initialState,
  dispatch: createDispatchActions(() => {}),
});

export const useReleaseContext = () => useContext(ReleaseContext);

const ReleaseProvider: FC<PropsWithChildren<ReleaseProviderProps>> = ({
  children,
  releases,
}) => {
  const [state, dispatch] = useReducer(releaseReducer, initialState);
  const { version } = state;
  const actions = useMemo(() => createDispatchActions(dispatch), [dispatch]);

  useEffect(() => {
    actions.setReleases(releases);

    if (!releases || !releases.length) return;

    const release = releases.find(
      ({ versionWithPrefix }) => versionWithPrefix === version
    );

    if (release) {
      actions.setVersion(release.versionWithPrefix);
    }
  }, [actions, releases, version]);

  return (
    <ReleaseContext.Provider value={{ state, dispatch: actions }}>
      {children}
    </ReleaseContext.Provider>
  );
};

export default ReleaseProvider;
