// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../App'
import router from '../router/index'
import axios from 'axios'
import EventBus from '../store/EventBus'
import GSwiper from '../components/GSwiper/GSwiper'
import GSlider from '../components/GSwiper/GSlide'
import PopUp from '../components/Popup/index'
import InputWrapper from '../components/InputWrapper/InputWrapper'
import Preload from '../components/Preload/Index'

Vue.component('g-swiper', GSwiper)
Vue.component('g-slider', GSlider)
Vue.component('input-wrapper', InputWrapper)
Vue.component('preload', Preload)

Vue.use(PopUp, {
  timeout: 8000
}, axios)

let assetsRoot = './'

/* eslint-disable-next-line */
let app = window.app || {
  url: path => path,
  asset: path => path
}

// 实际资源根路径按需修改
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'watch') {
  assetsRoot = app.asset('dist/')
}

/* eslint-disable-next-line */
__webpack_public_path__ = assetsRoot

// 样式文件一定要在 __webpack_public_path__ 赋值之后导入
require('@/assets/styles/share.scss')
require('../assets/styles/style.scss')

// 按需引入mock文件
if (process.env.NODE_ENV === 'development') {
  /* eslint-disable-next-line */
  import('@/mock/index.js')

  // dev模式下，引入normalize.css
  import('@/assets/styles/normalize.css')
}

Vue.prototype.$axios = axios
Vue.prototype.$app = app
Vue.prototype.$Bus = EventBus
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  components: { App },
  template: '<App/>'
})
