/**
 * 覆盖vue.config.js中的baseUrl选项，使得在vue组件中import静态资源（图片，视频等），
 * 或者template中src使用的相对路径，可以正确的拼接上资源的路径前缀（app.asset()的返回值）
 */
import packageConfig from '../package'

// 去掉配置给vue.config.js baseUrl中的相对路径'./'
const resolveRelativePath = (path) => {
  if (path.startsWith('./')) {
    path = path.slice(2)
  }
  return path
}

/* eslint-disable-next-line */
let app = window.app || {
  url: path => path,
  asset: path => path
}

app.__prod__ = process.env.NODE_ENV === 'production'
app.__dev__ = process.env.NODE_ENV === 'development'
app.__watch__ = process.env.VUE_APP_MODE === 'watch'
app.__sentry__ = process.env.VUE_APP_MODE === 'sentry'

let assetsRoot = './'

// 实际资源根路径按需修改
if (app.__prod__ || app.__watch__) {
  assetsRoot = app.asset(app.__prod__
    ? resolveRelativePath(packageConfig.assets.publicPath.build)
    : resolveRelativePath(packageConfig.assets.publicPath.watch)
  )
}

app.__public_path__ = assetsRoot

/* eslint-disable-next-line */
__webpack_public_path__ = assetsRoot

export default app
