import releaseReducer, { releaseState, getActions } from '@/reducers/releaseReducer';

describe('releaseReducer', () => {
  it('should return the initial state', () => {
    expect(releaseReducer(undefined, {})).toEqual(releaseState);
  });

  it('should handle SET_VERSION', () => {
    const action = { type: 'SET_VERSION', payload: 'v14.17.0' };
    const expectedState = { ...releaseState, version: 'v14.17.0' };
    expect(releaseReducer(releaseState, action)).toEqual(expectedState);
  });

  it('should handle SET_OS', () => {
    const action = { type: 'SET_OS', payload: 'WIN' };
    const expectedState = { ...releaseState, os: 'WIN' };
    expect(releaseReducer(releaseState, action)).toEqual(expectedState);
  });

  it('should handle SET_PLATFORM', () => {
    const action = { type: 'SET_PLATFORM', payload: 'x64' };
    const expectedState = { ...releaseState, platform: 'x64' };
    expect(releaseReducer(releaseState, action)).toEqual(expectedState);
  });

  it('should handle SET_INSTALL_METHOD', () => {
    const action = { type: 'SET_INSTALL_METHOD', payload: 'brew' };
    const expectedState = { ...releaseState, installMethod: 'brew' };
    expect(releaseReducer(releaseState, action)).toEqual(expectedState);
  });

  it('should handle SET_MANAGER', () => {
    const action = { type: 'SET_MANAGER', payload: 'yarn' };
    const expectedState = { ...releaseState, packageManager: 'yarn' };
    expect(releaseReducer(releaseState, action)).toEqual(expectedState);
  });
});

describe('getActions', () => {
  it('should create setVersion action', () => {
    const dispatch = jest.fn();
    const actions = getActions(dispatch);
    actions.setVersion('v14.17.0');
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_VERSION', payload: 'v14.17.0' });
  });

  it('should create setOS action', () => {
    const dispatch = jest.fn();
    const actions = getActions(dispatch);
    actions.setOS('WIN');
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_OS', payload: 'WIN' });
  });

  it('should create setPlatform action', () => {
    const dispatch = jest.fn();
    const actions = getActions(dispatch);
    actions.setPlatform('x64');
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_PLATFORM', payload: 'x64' });
  });

  it('should create setInstallMethod action', () => {
    const dispatch = jest.fn();
    const actions = getActions(dispatch);
    actions.setInstallMethod('brew');
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_INSTALL_METHOD', payload: 'brew' });
  });

  it('should create setPackageManager action', () => {
    const dispatch = jest.fn();
    const actions = getActions(dispatch);
    actions.setPackageManager('yarn');
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_MANAGER', payload: 'yarn' });
  });
});
