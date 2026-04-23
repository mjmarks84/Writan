module.exports = {
  projects: ['<rootDir>/jest.config.electron.js', '<rootDir>/jest.config.renderer.js'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/index.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/build/']
};
