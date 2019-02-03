const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: { main: path.resolve('./src/index.tsx') },
  resolve: {
    alias: { '@': path.resolve('./src') },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true,
              camelCase: true,
              namedExport: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configFile: path.resolve(__dirname, 'tslint.json'),
          tsConfigFile: path.resolve(__dirname, 'tsconfig.json'),
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /\_\_tests\_\_/,
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.json'),
        },
      },
      { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },
    ],
  },

  output: {
    chunkFilename: 'bundle.js',
    filename: 'bundle.js',
    path: path.resolve(__dirname, './assets/js/'),
  },

  mode: 'development',
  plugins: [new UglifyJSPlugin()],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true,
    },
  },
}
