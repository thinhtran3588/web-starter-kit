module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          '@app': './src',
          '@test': './__tests__',
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: ['babel-plugin-dynamic-import-node'],
    },
  },
};
