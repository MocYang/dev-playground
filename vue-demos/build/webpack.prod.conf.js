'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const ManifestPlugin = require('webpack-manifest-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const _mode_watch = process.env.NODE_ENV === 'watch'

const pathsToClean = [
  config.build.assetsRoot
]

const cleanOptions = {
  root: config.build.assetsRoot,
  // root: path.resolve(__dirname),
  verbose: false,
  watch: false,
  exclude: [],
  dry: false,
  beforeEmit: true,

  // allow the plugin to clean folders outside of the webpack root.
  // Default: false - don't allow clean folder outside of the webpack root
  allowExternal: true,
}

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

const baseConfigEntries = baseWebpackConfig.entry
const cssChunks = []

for (let key in baseConfigEntries) {
  if (Object.prototype.hasOwnProperty.call(baseConfigEntries, key)) {
    // 过滤掉不需要提取的chunk,如：_viewport,_vendor
    if (key.indexOf('_') === -1) {
      cssChunks.push({
        name: key,
        test: (m,c,entry = key) => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
        chunks: 'all',
        enforce: true
      })
    }
  }
}

const templateOutputs = []
const buildInput = config.build.template.input
const buildOutput = config.build.template.output

for (let i = 0, len = buildInput.length; i < len; i++) {
  const input = buildInput[i]
  const output = buildOutput[i]
  templateOutputs.push(new HtmlWebpackPlugin({
    filename: output,
    template: input,
    inject: false,
    hash: true,
    chunks: 'all',
    minify: false,
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }))
}

let plugins = [
  // http://vuejs.github.io/vue-loader/en/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': env
  }),

  new MiniCssExtractPlugin({
    filename: utils.assetsPath(`css/[name]${_mode_watch ? '': '.[contenthash:8]'}.css`),
    allChunks: true
  }),

  // extract css into its own file
  // new ExtractTextPlugin({
  //   filename: utils.assetsPath('css/[name].[hash:8].css'),
  //   // Setting the following option to `false` will not extract CSS from codesplit chunks.
  //   // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
  //   // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
  //   // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
  //   allChunks: true,
  //   disable: false
  // }),

  ...templateOutputs,

  // keep module.id stable when vendor modules does not change
  new webpack.HashedModuleIdsPlugin(),

  // new webpack.NamedModulesPlugin(),
  // new webpack.HotModuleReplacementPlugin(),

  // copy custom static assets
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }
  ]),

  new WebpackMd5Hash(),

  new CleanWebpackPlugin(pathsToClean, cleanOptions),

  new WebpackAssetsManifest({
    publicPath: true
  })
]

if (!_mode_watch) {
  plugins.push(
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? {safe: true, map: {inline: false}}
        : {safe: true}
    })
  )
}

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(`js/[name]${_mode_watch ? '' : '.[contenthash:8]'}.js`),
    chunkFilename: utils.assetsPath(`js/[name]${_mode_watch ? '': '.[contenthash:8]'}.js`),
    publicPath: config.build.assetsPublicPath
  },
  plugins,

  optimization: {
    splitChunks: {
      cacheGroups: {
        ...cssChunks
      }
    }
  },
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
