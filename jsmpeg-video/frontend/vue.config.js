const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const packageConfig = require('./package')
const SentryCliPlugin = require('@sentry/webpack-plugin')

const __PRODUCTION__ = process.env.NODE_ENV === 'production'
const __WATCH__ = process.env.VUE_APP_MODE === 'watch'
const __DEV__ = process.env.NODE_ENV === 'development'
const __SENTRY__ = process.env.VUE_APP_MODE === 'sentry'
const __STATIC__ = process.env.VUE_APP_MODE === 'static'

const getOutputDir = () => {
  let url = 'dist/'
  if (__PRODUCTION__) {
    url = packageConfig.assets.root.build
  } else if (__WATCH__) {
    url = packageConfig.assets.root.watch
  }

  return url
}

const getBaseUrl = () => {
  let url = './'
  if (__PRODUCTION__) {
    url = packageConfig.assets.publicPath.build
  } else if (__WATCH__) {
    url = packageConfig.assets.publicPath.watch
  }

  return url
}

const configHTMLWebpackPlugin = (
  config,
  option = {
    template: '_assets.php',
    filename: '../config/_assets.php'
  },
  doNeedStatic
) => {
  // 输出静态文件html等
  if (doNeedStatic) {
    config.options.minify = true
    config.options.chunks = option.chunks
    config.options.inject = true
    config.options.hash = true
    config.options.template = option.template
    config.options.filename = path.resolve(`../public/`, option.filename)
  } else {
    config.options.minify = false
    config.options.chunks = 'all'
    config.options.inject = false
    config.options.hash = false
    config.options.template = option.template
    config.options.filename = path.resolve(option.filename)
  }

  return config
}

const installManifestPlugin = config => {
  config.plugins.push(
    new WebpackAssetsManifest({
      publicPath: true
    })
  )
}

const pages = {
  index: {
    entry: 'src/entry/main.js',
    template: 'public/index.html',
    filename: 'index.html'
  },
  // 另一个单独的入口
  // dev 下访问app：localhost:8080/app.html
  // weibo: {
  //   entry: 'src/entry/weibo.js',
  //   template: 'weibo.html',
  //   filename: 'weibo.html'
  // }
}

const cacheGroups = {
  // 只提取出一个通用vendor chunk
  vendors:
    {
      name: 'vendors',
      test: /[\\\/]node_modules[\\\/]/,
      priority: -10,
      chunks: 'all'
    },
  // common:
  //   {
  //     name: 'common',
  //     minChunks: 2,
  //     priority: -20,
  //     chunks: 'initial',
  //     reuseExistingChunk: true
  //   }
}

module.exports = {
  productionSourceMap: false,

  lintOnSave: false,

  // 所有打包的生成的静态资源的输入根路径
  outputDir: getOutputDir(),

  // 作用等同于publicPath
  baseUrl: getBaseUrl(),

  // 页面的入口
  pages: pages,

  css: {
    extract: true,
    sourceMap: !__PRODUCTION__
  },

  configureWebpack: config => {
    if (__PRODUCTION__) {
      console.log(`you are now under: production mode.`)

      // 默认输出_assets.php
      config.plugins = config.plugins.map(plugin => {
        if (plugin.constructor === HtmlWebpackPlugin) {
          let options = Object.assign({}, plugin.options)

          //  yarn build:static，输出index.html
          if (__STATIC__) {
            plugin = configHTMLWebpackPlugin(plugin, {
              template: options.template,
              filename: options.filename,
              chunks: ['vendors', options.chunks.slice(-1)[0]]
            }, true)

            // 其他模式输出_asset.php
          } else {
            plugin = configHTMLWebpackPlugin(plugin)
          }
        }
        return plugin
      })

      // static 模式下，额外生成_asset.php模板文件
      if (__STATIC__) {
        config.plugins.push(
          configHTMLWebpackPlugin(
            new HtmlWebpackPlugin()
          )
        )
      }

      installManifestPlugin(config)
      config.optimization.splitChunks.cacheGroups = cacheGroups

      if (__SENTRY__) {
        config.plugins.push(
          new SentryCliPlugin({
            include: getOutputDir(),
            ignoreFile: '.sentrycliignore',
            ignore: ['node_modules', 'webpack.config.js', 'flexible.js'],
            // configFile: 'sentry.properties',
            configFile: '.sentryclirc',
            validate: true
          })
        )
      }
    } else if (__WATCH__) {
      console.log(`you are now under: watch mode.`)

      // 修复cheap-module-eval-source-map不起作用的问题
      config.devtool = 'cheap-module-source-map'

      config.plugins = config.plugins.map(plugin => {
        if (plugin.constructor === HtmlWebpackPlugin) {
          plugin = configHTMLWebpackPlugin(plugin, {
            template: '_assets.php',
            filename: '../config/_assets_watch.php'
          })
        }
        return plugin
      })

      installManifestPlugin(config)

      config.optimization = {
        splitChunks: {
          cacheGroups
        }
      }
    } else if (__DEV__) {
      console.log(`you are now under: dev mode.`)

      // 修复cheap-module-eval-source-map不起作用的问题
      config.devtool = 'cheap-module-source-map'
    }

    // 处理createjs v1.x 中this为undefined的问题
    config.module.rules.push({
      test: require.resolve('./static/js/createjs.min'),
      loader: 'imports-loader?this=>window'
    })

    config.module.rules.push({
      test: /\.ts|\.mpg$/,
      loader: 'file-loader'
    })
  }
}
