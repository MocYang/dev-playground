const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/')
  },

  devtool: 'source-map',

  devServer: {
    hot: true,
    open: true,
    inline: true,
    noInfo: true,
    quiet: true,
    overlay: true,
    index: 'dist/index.html',
    openPage: 'dist/index.html'
  },

  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.json', '.jsx' ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },

      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },

  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: path.resolve(__dirname, 'public/index.html'),
      hash: true,
      chunks: 'all',
      minify: false
    })
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: 10,
          chunks: 'all'
        }
      }
    }
  }
}
