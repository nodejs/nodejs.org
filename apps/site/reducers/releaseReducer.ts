import type { Dispatch } from 'react';

import type * as Types from '@/types/release';

export const releaseState: Types.ReleaseState = {
  // The selected Node.js version to be downloaded
  version: '',
  // The initial LOADING state is used to render a skeleton loader
  // Until the User's OS is detected (or failed to be detected)
  os: 'LOADING',
  // The detected User Platform from a combination of Bitness and Architecture
  // We set the default value to `x64` as it is the most common platform for modern systems
  platform: 'x64',
  // The selected installation method when not choosing an installer or prebuilt binary
  installMethod: '',
  // The package manager field is always set by default to `NPM`
  // as that is the default package manager for the Node.js ecosystem
  // and the one mainly recommended by the project.
  packageManager: 'NPM',
};

export const getActions = (
  dispatch: Dispatch<Types.ReleaseAction>
): Types.ReleaseDispatchActions => ({
  setVersion: payload => dispatch({ type: 'SET_VERSION', payload }),
  setOS: payload => dispatch({ type: 'SET_OS', payload }),
  setPlatform: payload => dispatch({ type: 'SET_PLATFORM', payload }),
  setInstallMethod: payload =>
    dispatch({ type: 'SET_INSTALL_METHOD', payload }),
  setPackageManager: payload => dispatch({ type: 'SET_MANAGER', payload }),
});

const reducer = (
  state: Types.ReleaseState,
  action: Types.ReleaseAction
): Types.ReleaseState => {
  switch (action.type) {
    case 'SET_VERSION':
      return { ...state, version: action.payload };
    case 'SET_OS':
      return { ...state, os: action.payload };
    case 'SET_PLATFORM':
      return { ...state, platform: action.payload };
    case 'SET_INSTALL_METHOD':
      return { ...state, installMethod: action.payload };
    case 'SET_MANAGER':
      return { ...state, packageManager: action.payload };
    default:
      return state;
  }
};

export default reducer;
