import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import reducer, { releaseState, getActions } from '@/reducers/releaseReducer';

describe('releaseReducer', () => {
  it('should return the initial state', () => {
    const initialState = releaseState;
    const action = { type: 'UNKNOWN_ACTION' };
    assert.deepEqual(reducer(initialState, action), initialState);
  });

  it('should handle SET_VERSION action', () => {
    const initialState = releaseState;
    const action = { type: 'SET_VERSION', payload: 'v14.17.0' };
    const expectedState = { ...initialState, version: 'v14.17.0' };
    assert.deepEqual(reducer(initialState, action), expectedState);
  });

  it('should handle SET_OS action', () => {
    const initialState = releaseState;
    const action = { type: 'SET_OS', payload: 'Linux' };
    const expectedState = { ...initialState, os: 'Linux' };
    assert.deepEqual(reducer(initialState, action), expectedState);
  });

  it('should handle SET_PLATFORM action', () => {
    const initialState = releaseState;
    const action = { type: 'SET_PLATFORM', payload: 'arm64' };
    const expectedState = { ...initialState, platform: 'arm64' };
    assert.deepEqual(reducer(initialState, action), expectedState);
  });

  it('should handle SET_INSTALL_METHOD action', () => {
    const initialState = releaseState;
    const action = { type: 'SET_INSTALL_METHOD', payload: 'binary' };
    const expectedState = { ...initialState, installMethod: 'binary' };
    assert.deepEqual(reducer(initialState, action), expectedState);
  });

  it('should handle SET_MANAGER action', () => {
    const initialState = releaseState;
    const action = { type: 'SET_MANAGER', payload: 'Yarn' };
    const expectedState = { ...initialState, packageManager: 'Yarn' };
    assert.deepEqual(reducer(initialState, action), expectedState);
  });
});

describe('getActions', () => {
  it('should create actions correctly', t => {
    const dispatch = t.mock.fn();
    const actions = getActions(dispatch);

    actions.setVersion('v14.17.0');
    assert.deepEqual(dispatch.mock.calls.at(-1).arguments, [
      {
        type: 'SET_VERSION',
        payload: 'v14.17.0',
      },
    ]);

    actions.setOS('Linux');
    assert.deepEqual(dispatch.mock.calls.at(-1).arguments, [
      { type: 'SET_OS', payload: 'Linux' },
    ]);

    actions.setPlatform('arm64');
    assert.deepEqual(dispatch.mock.calls.at(-1).arguments, [
      {
        type: 'SET_PLATFORM',
        payload: 'arm64',
      },
    ]);

    actions.setInstallMethod('binary');
    assert.deepEqual(dispatch.mock.calls.at(-1).arguments, [
      {
        type: 'SET_INSTALL_METHOD',
        payload: 'binary',
      },
    ]);

    actions.setPackageManager('Yarn');
    assert.deepEqual(dispatch.mock.calls.at(-1).arguments, [
      {
        type: 'SET_MANAGER',
        payload: 'Yarn',
      },
    ]);
  });
});
