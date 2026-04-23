module.exports = {
  displayName: 'renderer',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/renderer'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.renderer.ts'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__tests__/helpers/styleMock.js',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__tests__/helpers/fileMock.js'
  },
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 }
  }
};
