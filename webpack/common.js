const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getConfig = require('./config');

module.exports = {
  entry: [getConfig('appIndex')],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(eot|png|ttf|svg|woff|woff2)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
          'img-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@common': getConfig('appCommon'),
      '@styles': getConfig('appStyles'),
      '@features': getConfig('appFeatures'),
      '@layouts': getConfig('appLayouts'),
      '@mocks': getConfig('appMocks'),
      '@processes': getConfig('appProcesses'),
      '@pages': getConfig('appPages'),
      '@store': getConfig('appStore'),
      '@src': getConfig('appDir'),
      '@packageSrc': getConfig('appPackageJson'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
