import type { Dispatch } from 'react';

import type * as Types from '@/types/release';

export const releaseState: Types.ReleaseState = {
  // The initial LOADING state is used to render a skeleton loader
  // Until the User's OS is detected (or failed to be detected)
  os: 'LOADING',
  bitness: '',
  platform: '',
  // The package manager field is always set by default to `NPM`
  // as that is the default package manager for the Node.js ecosystem
  // and the one mainly recommended by the project.
  packageManager: 'NPM',
  version: '',
};

export const getActions = (
  dispatch: Dispatch<Types.ReleaseAction>
): Types.ReleaseDispatchActions => ({
  setVersion: payload => dispatch({ type: 'SET_VERSION', payload }),
  setOS: payload => dispatch({ type: 'SET_OS', payload }),
  setBitness: payload => dispatch({ type: 'SET_BITNESS', payload }),
  setPlatform: payload => dispatch({ type: 'SET_PLATFORM', payload }),
  setPackageManager: payload => dispatch({ type: 'SET_MANAGER', payload }),
});

const reducer = (state: Types.ReleaseState, action: Types.ReleaseAction) => {
  switch (action.type) {
    case 'SET_VERSION':
      return { ...state, version: action.payload };
    case 'SET_OS':
      return { ...state, os: action.payload };
    case 'SET_BITNESS':
      return { ...state, bitness: action.payload };
    case 'SET_PLATFORM':
      return { ...state, platform: action.payload };
    case 'SET_MANAGER':
      return { ...state, packageManager: action.payload };
    default:
      return state;
  }
};

export default reducer;
