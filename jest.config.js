/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default',
  testEnvironment: 'node',
  injectGlobals: true,

  rootDir: 'src',
  coverageDirectory: './coverage',
  collectCoverageFrom: ['**/*.ts'],
  coverageThreshold: {
    global: {
      lines: 80
    }
  },

  moduleFileExtensions: ['js', 'ts', 'json'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': ['@swc/jest', { tsconfig: './jest.tsconfig.json' }]
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/../src/$1'
  }
};
