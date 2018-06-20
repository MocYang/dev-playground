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
 * 3 对给定数组arr, 以size大小分割。
 * @param arr
 * @param size
 * @returns {any[]}
 */
const chunk = (arr, size) =>
  Array.from({length: Math.ceil(arr.length / size)}, (v, i) => {
    return arr.slice(i * size, (i + 1) * size)
  })
log('chunk: ', chunk([1, 2, 3, 4, 5], 2)) // [[1, 2], [3, 4], [5]]

/**
 * 4 移除数组中的假值，（false, null, 0, '', undefined, NaN）
 * @param arr
 * @returns {*}
 */
const compact = arr => arr.filter(Boolean)
log('compact: ', compact([1, 2, 0, '', undefined, , NaN, null, 2, 3])) // [1, 2, 3, 3]

/**
 * 5 对给定数组中的元素按fn分组，返回每个分组中元素的个数
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
log('countBy: ', countBy([1.22, 0.22, 3.21, 1.4], Math.floor)) // {0: 1, 1: 2, 3: 1}
log('countBy: ', countBy(['one', 'two', 'three'], 'length')) // {3: 2, 5: 1}

/**
 * 6 计算给定val在arr中出现的次数
 * @param arr
 * @param val
 * @returns {*}
 */
const countOccurrences = (arr, val) =>
  arr.reduce((acc, v) => (v === val ? ++acc : acc), 0)
log('countOccurrences: ', countOccurrences([1, 2, 3, 4, 5, 1], 1)) // 2

/**
 * 7 递归扁平化给定数组
 * @param arr
 * @returns {*[]}
 */
const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))
log('deepFlatten: ', deepFlatten([1, [2, 3], [[4], [5, 6]]])) // [1, 2, 3, 4, 5, 6]

/**
 * 8 返回给定数组a,b元素的交集
 * @param a
 * @param b
 * @returns {*}
 */
const intersection = (a, b) => {
  const s = new Set(b)
  return a.filter(x => s.has(x))
}
log('intersection: ', intersection([1, 2, 3, 11], [1, 2, 4, 5])) // [1, 2])

/**
 * 9 返回给定数组a,b元素的交集, 满足给定fn
 * @param a
 * @param b
 * @param fn
 * @returns {*}
 */
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(v => fn(v)))
  return a.filter(x => s.has(fn(x)))
}
log('intersectionBy: ',
  intersectionBy([{id: 1}, {id: 2}], [{id: 2}, {id: 4}], x => x.id))

/**
 * 10 返回所有元素的并集
 * @param arrs
 * @returns {*|any[]}
 */
const unionSet = (...arrs) =>
  arrs.reduce((acc, v) => Array.from(new Set(acc.concat(v))), [])
log('unionSet: ', unionSet([1, 2], [3, 4], [3, 1, 4, 11, 5])) // [1, 2, 3, 4, 11, 5]

/**
 * 11 返回所有元素的并集，满足条件fn
 * @param fn
 * @param arrs
 * @returns {*|any[]}
 */
const unionSetBy = (fn, ...arrs) =>
  arrs.reduce((acc, arr) => Array.from(new Set(acc.concat(arr.map(v => fn(v))))),
    [])
log('unionSetBy: ',
  unionSetBy(x => x.id,
    [{id: 2}, {id: 3}],
    [{id: 2}, {id: 4}, {id: 5}]))

/**
 * 12 返回a-b的差集(x 属于a, 但不属于b)
 * @param a
 * @param b
 * @returns {*}
 */
const difference = (a, b) => {
  const s = new Set(b)
  return a.filter(x => !s.has(x))
}
log('difference: ', difference([1, 2, 3], [2, 4])) // [1, 3]
log('difference: ',
  difference([1, 2, 3], [2, 4]).concat(difference([2, 4], [1, 2, 3]))) // [1, 3, 4]

/**
 * 13 返回a-b的差集(x 属于a, 但不属于b), 满足给定fn
 * @param a
 * @param b
 * @param fn
 * @returns {*}
 */
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(v => fn(v)))
  return a.filter(x => !s.has(fn(x)))
}
log('differenceBy: ',
  differenceBy([{id: 1}, {id: 2}, {id: 3}],
    [{id: 2}, {id: 4}],
    x => x.id))

/**
 * 14 返回a-b的差集(x 属于a, 但不属于b), 满足给定comp比较条件
 * @param a
 * @param b
 * @param comp
 * @returns {*}
 */
const differenceWith = (a, b, comp) =>
  a.filter(av => b.findIndex(bv => comp(av, bv)) === -1)
log('differenceWith: ',
  differenceWith([1.2, 1.4, 2.0, 3],
    [1.11, 1.22, 2.33],
    (a, b) => Math.round(a) === Math.round(b)))

/**
 * 15 从左移除arr中，n个元素
 * @param arr
 * @param n
 * @returns {*}
 */
const drop = (arr, n = 1) => arr.slice(n)
log('drop: ', drop([1, 2, 3, 4]))
log('drop: ', drop([1, 2, 3, 4], 1))
log('drop: ', drop([1, 2, 3, 4], 2))
log('drop: ', drop([1, 2, 3, 4], 3))
log('drop: ', drop([1, 2, 3, 4], 4))

/**
 * 16 从右移除arr中，n个元素
 * @param arr
 * @param n
 * @returns {*}
 */
const dropRight = (arr, n = 1) => arr.slice(0, -n)
log('dropRight: ', dropRight([1, 2, 3, 4]))
log('dropRight: ', dropRight([1, 2, 3, 4], 1))
log('dropRight: ', dropRight([1, 2, 3, 4], 2))
log('dropRight: ', dropRight([1, 2, 3, 4], 3))
log('dropRight: ', dropRight([1, 2, 3, 4], 4))

/**
 * 17 从右移除arr中的元素，直到fn(x)为true
 * @param arr
 * @param fn
 * @returns {*}
 */
const dropRightWhile = (arr, fn) => {
  while (arr.length > 0 && !fn(arr[arr.length - 1])) arr = arr.slice(0, -1)
  return arr
}
log('dropRightWhile: ', dropRightWhile([1, 2, 3, 4, 5, 6], x => x <= 4))

/**
 * 18 从左移除arr中的元素，直到fn(x)为true
 * @param arr
 * @param fn
 * @returns {*}
 */
const dropWhile = (arr, fn) => {
  while (arr.length > 0 && !fn(arr[0])) arr = arr.slice(1)
  return arr
}
log('dropWhile: ', dropWhile([1, 2, 3, 4, 5], x => x >= 3))

/**
 * 19 每隔nth取样
 * @param arr
 * @param nth
 * @returns {*}
 */
const everyNth = (arr, nth) => arr.filter((v, i) => i % nth === nth - 1)
log('everyNth: ', everyNth([1, 2, 3, 4, 5, 6, 7], 3))

/**
 * 20 去重，时间复杂度O(n*n)
 * @param arr
 * @returns {*}
 */
const filterNonUnique = arr =>
  arr.filter(x => arr.indexOf(x) === arr.lastIndexOf(x))
log('filterNonUnique: ', filterNonUnique([1, 2, 2, 3, 4, 5, 6, 5, 4, 2]))

/**
 * 21 数组扁平化depth深度
 * @param arr
 * @param depth
 * @returns {*}
 */
const flatten = (arr, depth = 1) =>
  arr.reduce((acc, v) =>
      acc.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    [])
log('flatten: ', flatten([1, [2], [3, 4], 5]))
log('flatten: ', flatten([1, [2, [3, [4, 5], 6], 7], 8], 2))

/**
 * 逆序遍历数组
 * @param arr
 * @param fn
 * @returns {*}
 */
const forEachRight = (arr, fn) =>
  arr
    .slice(0)
    .reverse()
    .forEach(fn)
log('forEachRight: ', forEachRight([1, 2, 3, 4], x => log(x)))

/**
 * 返回数组元素，除了最后一个
 * @param arr
 * @returns {*}
 */
const initial = (arr) => arr.slice(0, -1)
log('initial: ', initial([1, 2, 3, 4]))

/**
 * 初始化具有n个元素的数组，并填充初始值val
 * @param n
 * @param val
 * @returns {any[]}
 */
const initializeArrayWithValues  = (n, val) => Array(n).fill(val)
log('initializeArrayWithValues: ', initializeArrayWithValues(12, 'null'))

/**
 *
 * @param arr
 * @returns {*}
 */
const shuffle = ([...arr]) => {
  let m = arr.length
  while(m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}
log('shuffle: ', shuffle([1, 2, 3, 4, 5, 6, 7, 8]))
