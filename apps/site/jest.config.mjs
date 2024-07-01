import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/*.test.mjs'],
  coverageReporters: ['json', 'json-summary'],
  reporters: ['default', 'jest-junit'],
  moduleNameMapper: {
    'next/router': '<rootDir>/components/__mocks__/next-router.mjs',
    'next-intl': '<rootDir>/components/__mocks__/next-intl.mjs',
    'github-slugger': '<rootDir>/components/__mocks__/github-slugger.mjs',
  },
};

export default createJestConfig(customJestConfig);
