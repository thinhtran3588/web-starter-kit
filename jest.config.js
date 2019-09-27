module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  collectCoverageFrom: [
    'src/**/*.[jt](s|sx)',
    'pages/**/*.[jt](s|sx)',
    '!pages/**/_document.[jt](s|sx)',
    '!pages/**/_app.[jt](s|sx)',
  ],
  resetMocks: true,
  resetModules: true,
  testRegex: '\\.(test|spec)\\.[jt](s|sx)?$',
};
