import {
  log
} from './utils/utils'

/**
 * 从左到右执行函数，上一个函数执行的结果作为下一个函数的参数传入
 * @param fns
 * @returns {*|(function(...[*]): *)}
 */
export const compose = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))

/**
 * 柯里化
 * @param fn
 * @param arity
 * @param args
 * @returns {any}
 */
export const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args)

/**
 * 函数去抖
 * @param fn
 * @param ms
 * @returns {Function}
 */
export const debounce = (fn, ms = 0) => {
  let timerId = null
  return function (...args) {
    clearTimeout(timerId)
    timerId = setTimeout(() => fn.apply(this, args), ms)
  }
}

/**
 * 延迟调用函数
 * @param fn
 * @param args
 * @returns {number}
 */
export const defer = (fn, ...args) => setTimeout(fn, 1, ...args)

/**
 * 延迟调用函数
 * @param fn
 * @param wait
 * @param args
 * @returns {number}
 */
export const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args)

/**
 * 确保函数只执行一次
 * @param fn
 * @returns {Function}
 */
export const once = (fn) => {
  let called = false
  return (...args) => {
    if (!called) {
      called = true
      return fn.apply(this, args)
    }
  }
}

/**
 *
 * @param ms
 * @returns {Promise<any>}
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

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
  return function () {
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
