module.exports = {
  displayName: 'electron',
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/electron', '<rootDir>/src/shared'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 }
  }
};
