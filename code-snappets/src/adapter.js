import { log } from './utils/utils'

// 1  ary: 接受一个函数和参数个数作为参数，返回一个函数，
// 以指定个数的参数调用入参函数。忽略多余的参数。
const ary = (fn, n) => (...args) => fn(...args.slice(0, n))
const testAry = ary(Math.max, 4)
log(testAry(1, 2, 3, 4, 5, 6))

// 2 call:
const call = (key, ...args) => context => context[key](...args)
Promise.resolve([1, 2, 3, 4])
  .then(call('map', x => 2 * x))
  .then(log)

// 3 collectInto
const collectInto = fn => (...args) => fn(...args)
