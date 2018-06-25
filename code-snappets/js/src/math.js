import {
  log
} from './utils/utils'

/**
 * 判断两个数是否在误差范围内相等
 * @param a
 * @param b
 * @param epsilon
 * @returns {boolean}
 */
export const approximateEqual = (a, b, epsilon = 0.001) => Math.abs(a - b) < epsilon

/**
 * 求平均值
 * @param num
 * @returns {number}
 */
export const average = (...num) => [...num].reduce((acc, val) => acc += val, 0) / num.length

/**
 * 求平均值, 以给定的函数取值
 * @param arr
 * @param fn
 * @returns {number}
 */
export const averageBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc += val, 0) / arr.length

/**
 * 角度转弧度
 * @param deg
 * @returns {number}
 */
export const degreesToRads = (deg) => (deg * Math.PI) / 180.0

/**
 * 弧度转角度
 * @param rad
 * @returns {number}
 */
export const radsToDegree = (rad) => (180.0 * rad) / Math.PI

/**
 * 求两点之间的距离
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number}
 */
export const distance = (x1, y1, x2, y2) => Math.hypot(x1 - x2, y1 - y2)

/**
 * 求阶乘
 * @param n
 * @returns {number}
 */
export const factorial = (n) => {
  if (n < 0) {
    throw new Error('Negative number is not allowed.')
  }

  if (n <= 1) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}

/**
 *  判断第一个数是否能被第二个数整除
 * @param dividend
 * @param divisor
 * @returns {boolean}
 */
export const isDivisible = (dividend, divisor) => dividend % divisor === 0

/**
 * 判断是否是偶数
 * @param n
 * @returns {boolean}
 */
export const isEvent = (n) => n % 2 === 0

/**
 * 判断是否是素数
 * @param n
 * @returns {boolean}
 */
export const isPrime = (n) => {
  const upBoundary = Math.floor(Math.sqrt(n))
  for (let i = 2; i<= upBoundary; i++) {
    if (n % i === 0) {
      return false
    }
  }
  return n >= 2
}

/**
 * 返回给定范围内的n个随机值
 * @param min
 * @param max
 * @param n
 * @returns {number[]}
 */
export const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from({length: n}, () => Math.floor(Math.random() * (max - min + 1)) + min)

/**
 * 返回给定范围内的随机值
 * @param min
 * @param max
 * @returns {*}
 */
export const randomIntergerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

/**
 * 保留给定位数小数点
 * @param n
 * @param decimals
 * @returns {number}
 */
export const round = (n, decimals = 0) => {
  const num = Math.pow(10,decimals)
  return Math.floor(n * num) / num
}
