import { log } from './utils/utils'

// 1  ary: 接受一个函数和参数个数作为参数，返回一个函数，
// 以指定个数的参数调用入参函数。忽略多余的参数。
const ary = (fn, n) => (...args) => fn(...args.slice(0, n))
const testAry = ary(Math.max, 4)
// log(testAry(1, 2, 3, 4, 5, 6))

// 2 call:
const call = (key, ...args) => context => context[key](...args)
Promise.resolve([1, 2, 3, 4])
  .then(call('map', x => 2 * x))
  .then(log)

// 3 collectInto
const collectInto = fn => (...args) => fn(args)
const Pall = collectInto(Promise.all.bind(Promise))
let p1 = Promise.resolve(1)
let p2 = Promise.resolve(2)
let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3))
// Pall(p1, p2, p3).then(log)

// 4 over
const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args))
const minMax = over(Math.min, Math.max)
// log(minMax(1, 2, 3, 4, 5, 6))

// pipeAsyncFunctions
const pipeAsyncFunctions = (...fns) => args =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(args))
const testPipeAsyncFunctions = pipeAsyncFunctions(x => x + 1,
  x => x + 2,
  x => x + 3)
// (async () => {
//   log(await testPipeAsyncFunctions(5))
// })()

// 5 pipeFunctions
const pipeFunctions = (...fns) =>
  fns.reduce((p, n) => (...args) => n(p(...args)))
const add5 = x => x + 5
const multiple = (x, y) => x * y
const multippleAndAdd = pipeFunctions(multiple, add5)
log(multippleAndAdd(1, 5))

// 6 promisify
const promisify = fn => (...args) =>
  new Promise((resolve, reject) => {
    fn(...args, (err, result) => (err ? reject(err) : resolve(result)))
  })

// 7
const unary = fn => arg => fn(arg)
