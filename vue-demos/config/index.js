'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const packageConfig = require('../package')

const inputs = []
const outputs = []
const packageInput = packageConfig.template.input
const packageOutput = packageConfig.template.output

function pushTemplates (input, output) {
  if (Object.prototype.toString.call(input) === '[object String]') {
    output.push(path.resolve(__dirname, '../', input))
  } else if (Object.prototype.toString.call(input) === '[object Array]') {
    for (let inputPath of input) {
      output.push(path.resolve(__dirname, '../', inputPath))
    }
  }
}

pushTemplates(packageInput, inputs)
pushTemplates(packageOutput, outputs)

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '',

    // 模板输出路径
    htmlName: 'index.html',

    // 模板输入路径
    htmlTemplate: 'index.html',

    proxyTable: {},

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Paths
    assetsRoot: path.resolve(__dirname, '../', packageConfig.template.assetsRoot),
    assetsSubDirectory: 'static',
    assetsPublicPath: 'dist/',

    // 模板输入和输出(默认输出PHP配置文件)
    // 注意，输入不能为.json文件
    template: {
      input: inputs,
      output: outputs
    },

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
