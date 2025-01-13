import reducer, { releaseState, getActions } from '@/reducers/releaseReducer';

describe('releaseReducer', () => {
  it('should return the initial state', () => {
    const initialState = releaseState;
    const action = { type: 'UNKNOWN_ACTION' };
    expect(reducer(initialState, action)).toEqual(initialState);
  });

  it('should handle SET_VERSION action', () => {
    const initialState = releaseState;
    const action = { type: 'SET_VERSION', payload: 'v14.17.0' };
    const expectedState = { ...initialState, version: 'v14.17.0' };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_OS action', () => {
    const initialState = releaseState;
    const action = { type: 'SET_OS', payload: 'Linux' };
    const expectedState = { ...initialState, os: 'Linux' };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_PLATFORM action', () => {
    const initialState = releaseState;
    const action = { type: 'SET_PLATFORM', payload: 'arm64' };
    const expectedState = { ...initialState, platform: 'arm64' };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_INSTALL_METHOD action', () => {
    const initialState = releaseState;
    const action = { type: 'SET_INSTALL_METHOD', payload: 'binary' };
    const expectedState = { ...initialState, installMethod: 'binary' };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_MANAGER action', () => {
    const initialState = releaseState;
    const action = { type: 'SET_MANAGER', payload: 'Yarn' };
    const expectedState = { ...initialState, packageManager: 'Yarn' };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});

describe('getActions', () => {
  it('should create actions correctly', () => {
    const dispatch = jest.fn();
    const actions = getActions(dispatch);

    actions.setVersion('v14.17.0');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_VERSION',
      payload: 'v14.17.0',
    });

    actions.setOS('Linux');
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_OS', payload: 'Linux' });

    actions.setPlatform('arm64');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_PLATFORM',
      payload: 'arm64',
    });

    actions.setInstallMethod('binary');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_INSTALL_METHOD',
      payload: 'binary',
    });

    actions.setPackageManager('Yarn');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_MANAGER',
      payload: 'Yarn',
    });
  });
});
