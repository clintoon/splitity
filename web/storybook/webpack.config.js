const path = require('path');

module.exports = ({ config }) => {
  // modify storybook's file-loader rule to avoid conflicts with svgr
  const fileLoaderRule = config.module.rules.find(rule =>
    rule.test.test('.svg')
  );
  fileLoaderRule.exclude = '/';

  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'react-svg-loader',
      },
    ],
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
      },
    ],
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@web': path.resolve(__dirname, '../src/'),
      },
    },
  });

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
