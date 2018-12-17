import sentry from '../../sentry/index'

// 这一行一定要在引入App.vue之前import
import app from '../public-path'

import Vue from 'vue'
import App from '../App.vue'
import router from '../routes/router'
import axios from 'axios'
import EventBus from '../store/EventBus'
import GSwiper from '../components/GSwiper/GSwiper'
import GSlider from '../components/GSwiper/GSlide'
import PopUp from '../components/Popup/index'
import InputWrapper from '../components/InputWrapper/InputWrapper'
import Preload from '../components/Preload/Preload'

import '@/assets/styles/share.scss'
import '@/assets/styles/style.scss'

Vue.component('g-swiper', GSwiper)
Vue.component('g-slider', GSlider)
Vue.component('input-wrapper', InputWrapper)
Vue.component('preload', Preload)

Vue.use(PopUp, {
  timeout: 8000
}, axios)

Vue.prototype.$axios = axios
Vue.prototype.$app = app
Vue.prototype.$Bus = EventBus
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

if (app.__sentry__) {
  sentry.run()
}
