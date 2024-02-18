'use client';

import type { ReactNode, Dispatch } from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import type { NodeRelease } from '@/types/releases';
import type { UserOS } from '@/types/userOS';

type ReleaseState = {
  releases: Array<NodeRelease>;
  version: string;
  os: UserOS;
  bitness: string;
  platform: string;
  release: NodeRelease;
};

type Action =
  | { type: 'SET_VERSION'; payload: string }
  | { type: 'SET_OS'; payload: UserOS }
  | { type: 'SET_BITNESS'; payload: string }
  | { type: 'SET_PLATFORM'; payload: string }
  | { type: 'SET_RELEASES'; payload: Array<NodeRelease> };

const releaseReducer = (state: ReleaseState, action: Action): ReleaseState => {
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

type DispatchActions = {
  setVersion: (version: string) => void;
  setOs: (os: UserOS) => void;
  setBitness: (bitness: string) => void;
  setPlatform: (platform: string) => void;
  setReleases: (releases: Array<NodeRelease>) => void;
};

const createDispatchActions = (
  dispatch: Dispatch<Action>
): DispatchActions => ({
  setVersion: version => dispatch({ type: 'SET_VERSION', payload: version }),
  setOs: (os: UserOS) => dispatch({ type: 'SET_OS', payload: os }),
  setBitness: bitness => dispatch({ type: 'SET_BITNESS', payload: bitness }),
  setPlatform: platform =>
    dispatch({ type: 'SET_PLATFORM', payload: platform }),
  setReleases: releases =>
    dispatch({ type: 'SET_RELEASES', payload: releases }),
});

const ReleaseContext = createContext<{
  state: ReleaseState;
  dispatch: DispatchActions;
}>({
  state: initialState,
  dispatch: createDispatchActions(() => {}),
});

export const useReleaseContext = () => useContext(ReleaseContext);

const ReleaseProvider = ({
  children,
  releases,
}: {
  children: ReactNode;
  releases: Array<NodeRelease>;
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
