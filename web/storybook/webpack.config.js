const path = require('path');

module.exports = ({ config }) => {
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
