module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  collectCoverageFrom: ['src/**/*.[jt](s|sx)'],
  resetMocks: true,
  resetModules: true,
  testRegex: '\\.(test|spec)\\.[jt](s|sx)?$',
};
