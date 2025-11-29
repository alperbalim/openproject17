/** Jest config for targeted unit tests (not replacing Karma). */
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/custom-elements/__tests__/**/*.jest.spec.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        diagnostics: false,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Ignore CSS from @primer/react to avoid parse errors in Jest
    '^.+\\.(css|scss)$': '<rootDir>/jest.css.stub.js',
    '^@primer/react$': '<rootDir>/src/test-stubs/primer-react.tsx',
    '^@primer/octicons-react$': '<rootDir>/src/test-stubs/octicons-react.tsx',
  },
};
