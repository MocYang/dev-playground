import { log } from './utils/utils'

export const bottomVisible = () => {
  const docElem = document.documentElement
  const clientHeight = docElem.clientHeight
  const scrollHeight = docElem.scrollHeight
  return clientHeight + window.scrollY >= (scrollHeight || clientHeight)
}
log('bottomVisible: ', bottomVisible())

/**
 * 复制到剪贴板（需要事件触发，否则无效）
 * @param str
 */
export const copyToClipboard = str => {
  const doc = document
  const body = doc.body
  const el = doc.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  body.appendChild(el)
  const selected = doc.getSelection().rangeCount > 0 ? doc.getSelection().getRangeAt(0) : false
  el.select()
  doc.execCommand('copy')
  body.removeChild(el)
  if (selected) {
    doc.getSelection().removeAllRanges()
    doc.getSelection().addRange(selected)
  }
}

/**
 * 生成事件bus
 * @returns {{hub: any, emit(*, *=): void, on(*, *=): void, off(*, *): void}}
 */
export const createEventBus = () => ({
  bus: Object.create(null),
  emit (event, data) {
    (this.bus[event] || []).forEach(handler => handler(data))
  },
  on (event, handler) {
    if (!this.bus[event]) {
      this.bus[event] = []
    }
    this.bus[event].push(handler)
  },
  off (event, handler) {
    const i = (this.bus[event] || []).findIndex(h => h === handler)
    if (i > -1) {
      this.bus.splice(i, 1)
    }
  }
})

/**
 * 检测设备类型（桌面|手机）
 * @returns {string}
 */
export const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'desktop'

/**
 * 检测给定元素是否可见，默认完全不可见才返回true
 * @param el
 * @param partial 是否允许部分可见
 */
export const elmentIsVisibleInViewport = (el, partial) => {
  const {
    top,
    left,
    bottom,
    right
  } = el.getBoundingClientRect
  const {
    innerHeight,
    innerWidth
  } = window
  return partial
  ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
    ((left > 0 && left < innerWidth) || right > 0 && right < innerWidth)
  : top >= 0 && left >= 0 && top <= innerHeight && left <= innerWidth
}

/**
 * 获取元素当前滚动的距离
 * @param el
 * @returns {{x: any, y: any}}
 */
export const getScrollPosition = (el) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
})

/**
 * 获取给定元素的计算样式
 * @param el
 * @param rule
 * @returns {CSSStyleDeclaration}
 */
export const getStyle = (el, rule = '') => rule ? window.getComputedStyle(el)[rule] : window.getComputedStyle(el)

/**
 * 判断元素是否具有某个类名
 * @param el
 * @param className
 * @returns {boolean}
 */
export const hasClass = (el, className) => el.classList.contains(className)

/**
 * 监听el的变更，当变化发送时，调用callback
 * @param el
 * @param callback
 * @param options
 * @returns {MutationObserver}
 */
export const observeMutations = (el, callback, options) => {
  const observe = new MutationObserver(mutations => mutations.forEach(m => callback(m)))
  observe.observe(
    el,
    Object.assign({
      childList: true,
      attributes: true,
      attributeOldValue: true,
      characterData: true,
      characterDataOldValue: true,
      subtree: true
    }, options)
  )
  return observe
}

/**
 * css属性自动添加浏览器前缀
 * @param prop
 * @returns {*}
 */
export const prefix = (prop) => {
  const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1)
  const prefixes = ['', 'webkit', 'moz', 'ms', 'o']
  const i = prefixes.findIndex(prefix => typeof document.body.style[prefix ? prefix + capitalizedProp : prop] !== 'undefined')
  return i !== -1 ? (i === 0 ? prop : prefixes[i] + capitalizedProp) : null
}

/**
 * 回到顶部
 */
export const scrollToTop = () => {
  const top = document.documentElement.scrollTop || document.body.scrollTop
  if (top > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, top * (1 - 1 / 8))
  }
}

/**
 * element scroll into view
 * block: start - scroll to top of viewport,
 *         end  - scroll to bottom of viewport.
 *         not set - scroll to center of viewport.
 * @param element
 * @param block
 */
export const scrollIntoView = (element, block = '') => {
  const scrollOption = {
    behavior: 'smooth',
    inline: "nearest"
  }
  if (block) {
    scrollOption['block'] = block
  }
  if (element.nodeType === 1) {
    element.scrollIntoView(scrollOption)
  }
}
