module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          '@app': './src',
        },
      },
    ],
  ],
  ignore: [/[/\\]core-js/, /@babel[/\\]runtime/],
};
