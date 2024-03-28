'use client';

import type { Dispatch, PropsWithChildren, FC } from 'react';
import { createContext, useMemo, useReducer } from 'react';

import WithChangelogModal from '@/components/withChangelogModal';
import type { NodeRelease } from '@/types';
import type {
  ReleaseDispatchActions,
  ReleaseAction,
  ReleaseContextType,
  ReleaseProviderProps,
  ReleaseState,
} from '@/types/release';

const initialState: ReleaseState = {
  releases: [],
  release: {} as NodeRelease,
  os: 'OTHER',
  bitness: '',
  platform: 'NVM',
  modalOpen: false,
};

const createDispatchActions = (
  dispatch: Dispatch<ReleaseAction>
): ReleaseDispatchActions => ({
  setVersion: payload => dispatch({ type: 'SET_VERSION', payload }),
  setOS: payload => dispatch({ type: 'SET_OS', payload }),
  setBitness: payload => dispatch({ type: 'SET_BITNESS', payload }),
  setPlatform: payload => dispatch({ type: 'SET_PLATFORM', payload }),
  setModalOpen: payload => dispatch({ type: 'SET_MODAL_OPEN', payload }),
});

export const ReleaseContext = createContext<ReleaseContextType>({
  ...initialState,
  ...createDispatchActions(() => {}),
});

export const ReleaseProvider: FC<PropsWithChildren<ReleaseProviderProps>> = ({
  children,
  releases,
  initialRelease,
}) => {
  const getReleaseFromVersion = (version: string) =>
    releases.find(({ versionWithPrefix }) => versionWithPrefix === version) ??
    ({} as NodeRelease);

  const releaseReducer = (state: ReleaseState, action: ReleaseAction) => {
    switch (action.type) {
      case 'SET_VERSION':
        return { ...state, release: getReleaseFromVersion(action.payload) };
      case 'SET_OS':
        return { ...state, os: action.payload };
      case 'SET_BITNESS':
        return { ...state, bitness: action.payload };
      case 'SET_PLATFORM':
        return { ...state, platform: action.payload };
      case 'SET_MODAL_OPEN':
        return { ...state, modalOpen: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(releaseReducer, {
    ...initialState,
    releases: releases,
    release: initialRelease,
  });

  const actions = useMemo(() => createDispatchActions(dispatch), [dispatch]);

  return (
    <ReleaseContext.Provider value={{ ...state, ...actions }}>
      {children}

      <WithChangelogModal
        release={state.release}
        modalOpen={state.modalOpen}
        setModalOpen={actions.setModalOpen}
      />
    </ReleaseContext.Provider>
  );
};
