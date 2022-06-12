// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('./jest-base');

/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '^@root(.*)$': '<rootDir>/src$1',
    '^@common(.*)$': '<rootDir>/src/common$1',
    '^@features(.*)$': '<rootDir>/src/features$1',
    '^@processes(.*)$': '<rootDir>/src/processes$1',
    '^@store(.*)$': '<rootDir>/src/store$1',
  },
  rootDir: '.',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/*.test.ts',
    '!<rootDir>/src/**/__*__/*',
    '!<rootDir>/src/util/testing.ts',
  ],
  cacheDirectory: '<rootDir>/.cache/unit',
  setupFiles: ['<rootDir>/jest/globals.js', '<rootDir>/jest/storage.js'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/?!(@korus/leda)'],
};
