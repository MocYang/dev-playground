/**
 * 节流函数
 * @param fn
 * @param wait
 * @returns {Function}
 */
export const throttle = (fn, wait = 0) => {
  let inThrottle = false
  let timer = null
  let lastTime = 0
  return function (e) {
    const self = this
    const args = arguments
    if (!inThrottle) {
      inThrottle = true
      lastTime = Date.now()
      fn.apply(self, args)
    } else {
      clearTimeout(timer)
      timer = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(self, args)
          lastTime = Date.now()
        }
      }, wait - (Date.now() - lastTime))
    }
  }
}