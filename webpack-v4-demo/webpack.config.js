const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const pathsToClean = [
  'dist',
  'build'
]

const cleanOptions = {
  root: path.resolve(__dirname),
  verbose: false,
  watch: false,
  exclude: [],

  // allow the plugin to clean folders outside of the webpack root.
  // Default: false - don't allow clean folder outside of the webpack root
  allowExternal: false
}


function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'static': resolve('static'),
      'assets': resolve('src/assets')
    }
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash:8].css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: 'index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ]
}
