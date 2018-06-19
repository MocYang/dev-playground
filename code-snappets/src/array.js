import { log } from './utils/utils'

/**
 * 1 all 检测给定数组arr，中的每个元素，只有满足fn对每个数组元素都返回true，结果才是true
 * @param arr
 * @param fn
 * @returns {*|boolean}
 */
const all = (arr, fn = Boolean) => arr.every(fn)
log('all:', all([1, 2, 3, 4, 5], x => x > 2))

/**
 * 2 any 检测给定数组arr，中的每个元素，只有满足fn对数组中至少一个元素返回true，结果才是true
 * @param arr
 * @param fn
 * @returns {*|boolean}
 */
const any = (arr, fn = Boolean) => arr.some(fn)
log('any: ', any([1, 2, 3, 4, 5], x => x > 4))

/**
 * 对给定数组arr, 以size大小分割。
 * @param arr
 * @param size
 * @returns {any[]}
 */
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => {
    return arr.slice(i * size, (i + 1) * size)
  })
log(chunk([1, 2, 3, 4, 5], 2)) // [[1, 2], [3, 4], [5]]

/**
 * 移除数组中的假值，（false, null, 0, '', undefined, NaN）
 * @param arr
 * @returns {*}
 */
const compact = arr => arr.filter(Boolean)
log(compact([1, 2, 0, '', undefined, , NaN, null, 2, 3])) // [1, 2, 3, 3]

/**
 * 对给定数组中的元素按fn分组，返回每个分组中元素的个数
 * @param arr
 * @param fn
 * @returns {*}
 */
const countBy = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
    }, {})
log(countBy([1.22, 0.22, 3.21, 1.4], Math.floor)) // {0: 1, 1: 2, 3: 1}
log(countBy(['one', 'two', 'three'], 'length')) // {3: 2, 5: 1}

/**
 * 计算给定val在arr中出现的次数
 * @param arr
 * @param val
 * @returns {*}
 */
const countOccurrences = (arr, val) =>
  arr.reduce((acc, v) => (v === val ? ++acc : acc), 0)
log(countOccurrences([1, 2, 3, 4, 5, 1], 1)) // 2

/**
 * 递归扁平化给定数组
 * @param arr
 * @returns {*[]}
 */
const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))
log(deepFlatten([1, [2, 3], [[4], [5, 6]]])) // [1, 2, 3, 4, 5, 6]

/**
 * 返回给定数组a, b中相同的元素
 * @param a
 * @param b
 * @returns {*}
 */
const same = (a, b) => {
  const s = new Set(b)
  return a.filter(x => s.has(x))
}
log(same([1, 2, 3, 11], [1, 2, 4, 5])) // [1, 2])
