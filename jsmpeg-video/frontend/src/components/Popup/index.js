import PopupComponetn from './Popup'

class Popup {
  constructor (Vue, options = {}, axios) {
    this.hasShow = false
    this.level = 0
    this.timer = null
    this.timeout = options.timeout

    const PopupConstructor = Vue.extend(PopupComponetn)
    let instance = new PopupConstructor()

    if (options.slot) {
      const SlotConstructor = Vue.extend(options.slot)
      let slotInstance = new SlotConstructor()
      slotInstance.vm = slotInstance.$mount()
      instance.$slots.default = [slotInstance.vm._vnode]
    }

    instance.vm = instance.$mount()
    this.instance = instance

    if (axios) {
      this.mountAxiosInterceptors(axios)
    }
  }

  setTimeout () {
    const {timer, timeout} = this
    clearTimeout(timer)
    if (timeout !== 0) {
      this.timer = setTimeout(() => {
        this.hide()
      }, timeout || 10000)
    }
  }

  hide (level = 1) {
    if (this.hasShow && this.level === level) {
      clearTimeout(this.timer)
      this.hasShow = false
      document.body.removeChild(this.instance.vm.$el)
    }
  }

  show (level = 1) {
    if (!this.hasShow) {
      this.setTimeout()
      this.level = level
      this.hasShow = true
      document.body.appendChild(this.instance.vm.$el)
    }
  }

  mountAxiosInterceptors (axios) {
    axios.interceptors.request.use(config => {
      if (config.loading) {
        this.show(0)
      }
      return config
    }, error => {
      return Promise.reject(error)
    })

    axios.interceptors.response.use(response => {
      this.hide(0)
      return response
    }, error => {
      this.hide(0)
      return Promise.reject(error)
    })
  }
}

export default {
  install (Vue, options = {}, axios = null) {
    const popup = new Popup(Vue, options, axios)
    Vue.prototype.$popup = popup
  }
}
