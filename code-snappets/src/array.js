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
