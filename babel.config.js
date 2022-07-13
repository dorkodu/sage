module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: '> 0.25%, not dead',
      },
    ],
  ],
  plugins: [
    '@babel/transform-runtime',
    'babel-plugin-annotate-pure-calls',
    'babel-plugin-dev-expression',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  babelrcRoots: ['packages/*'],
};
