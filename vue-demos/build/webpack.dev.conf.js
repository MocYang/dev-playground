'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const WebpackMd5Hash = require('webpack-md5-hash')
const SpritesmithPlugin = require('webpack-spritesmith')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const templateFunction = function (data) {
  let commonImport = '@import "../util.scss";'
  let shared = '.icon { background-image: url(I) }'
    .replace('I', data.sprites[0].image)

  const perSprite = data.sprites.map(function (sprite) {
    return '.icon-N { width: rem(W); height: rem(H); background-position: rem(X) rem(Y); background-size: rem(SW) rem(SH);}'
      .replace('N', sprite.name)
      .replace('W', sprite.width)
      .replace('H', sprite.height)
      .replace('X', sprite.offset_x)
      .replace('Y', sprite.offset_y)
      .replace('SW', sprite.total_width)
      .replace('SH', sprite.total_height)
  }).join('\n')

  return commonImport + '\n' + shared + '\n' + perSprite
}

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      filename: config.dev.htmlName,
      template: config.dev.htmlTemplate,
      chunks: 'all',
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),

    new WebpackMd5Hash(),

    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, '../src/assets/sprites'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, '../src/assets/images/sprites/sprites.png'),
        css: [
          [path.resolve(__dirname, '../src/assets/styles/sprites/sprite.scss'), {
            format: 'function_based_template'
          }]
        ]
      },
      customTemplates: {
        'function_based_template': templateFunction,
      },
      apiOptions: {
        cssImageRef: '../../images/sprites/sprites.png'
      }
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
